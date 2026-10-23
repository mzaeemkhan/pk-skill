#!/usr/bin/env node

const PROXY = "https://bookme.pk/proxy/bookme";

const COMMON_CITIES = {
  lahore: "1", rawalpindi: "2", islamabad: "2", "rawalpindi / islamabad": "2",
  multan: "4", bahawalpur: "6", sadiqabad: "8", peshawar: "9",
  sahiwal: "11", sargodha: "12", karachi: "18", faisalabad: "20",
  abbottabad: "21", sialkot: "22", gujrat: "23", "dera ghazi khan": "24",
  "rahim yar khan": "25", mardan: "27", swat: "28", mingora: "28",
  hyderabad: "30", sukkur: "31", quetta: "32", muzaffarabad: "33",
  mansehra: "34", "toba tek singh": "35", okara: "36", jhang: "37",
  chiniot: "38", khanewal: "39", vehari: "40", lodhran: "41",
  gujranwala: "42", "mandi bahauddin": "43", jhelum: "44",
};

function resolveCity(input) {
  const lower = input.toLowerCase().trim();
  if (COMMON_CITIES[lower]) return { id: COMMON_CITIES[lower], name: input };
  for (const [name, id] of Object.entries(COMMON_CITIES)) {
    if (name.includes(lower) || lower.includes(name)) return { id, name };
  }
  if (/^\d+$/.test(input)) return { id: input, name: input };
  return null;
}

async function fetchJSON(url, opts = {}) {
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...opts,
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
  return resp.json();
}

async function getOperators() {
  const res = await fetchJSON(`${PROXY}/api/buses`);
  return res.data || res;
}

async function getCities() {
  const res = await fetchJSON(`${PROXY}/api/v2/buses/cities?api_key=`);
  return Array.isArray(res) ? res : res.data || [];
}

function findOperatorRoutes(operators, fromCommon, toCommon) {
  const routes = [];
  for (const op of operators) {
    for (const dep of op.departure || []) {
      if (String(dep.origin_common_id) !== fromCommon) continue;
      for (const dest of dep.destionation || dep.destination || []) {
        if (String(dest.destination_common_id) !== toCommon) continue;
        routes.push({
          service_id: op.service_id,
          service_name: op.service_name,
          origin_city_id: dep.origin_city_id,
          destination_city_id: dest.destination_city_id,
          origin_name: dep.origin_city_name,
          destination_name: dest.destination_city_name,
        });
      }
    }
  }
  return routes;
}

async function getBusTimes(serviceId, originId, destId, date, currency = "PKR") {
  const res = await fetchJSON(`${PROXY}/REST/API/bus_times`, {
    method: "POST",
    body: JSON.stringify({
      api_key: "",
      service_id: String(serviceId),
      origin_city_id: String(originId),
      destination_city_id: String(destId),
      date,
      Currency: currency,
    }),
  });
  return res.times || [];
}

async function search(from, to, date, currency) {
  const fromCity = resolveCity(from);
  const toCity = resolveCity(to);
  if (!fromCity) throw new Error(`Unknown city: ${from}`);
  if (!toCity) throw new Error(`Unknown city: ${to}`);

  const operators = await getOperators();
  const routes = findOperatorRoutes(operators, fromCity.id, toCity.id);

  if (routes.length === 0) {
    return { query: { from: fromCity, to: toCity, date }, count: 0, buses: [], source: "https://bookme.pk" };
  }

  const results = await Promise.allSettled(
    routes.map((r) => getBusTimes(r.service_id, r.origin_city_id, r.destination_city_id, date, currency))
  );

  const buses = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      for (const t of r.value) {
        buses.push({
          service: t.service_name,
          bus_type: t.bustype || t.busname,
          departure: t.time,
          arrival: t.arrtime,
          duration: t.duration,
          fare: t.fare,
          currency: t.currency || "PKR",
          available_seats: t.available_seats,
          total_seats: t.seats,
          from_terminal: t.departure_city_name,
          to_terminal: t.arrival_city_name,
          time_slot: t.time_slot,
          rating: t.rating,
          date: t.departureDate || date,
          // ponytail: keeping IDs for seat lookup if needed later
          _ids: { time_id: t.time_id, route_id: t.route_id, schedule_id: t.schedule_id, service_id: t.service_id },
        });
      }
    }
  }

  buses.sort((a, b) => (a.departure || "").localeCompare(b.departure || ""));

  return {
    query: { from: fromCity.name, to: toCity.name, date, common_ids: { from: fromCity.id, to: toCity.id } },
    count: buses.length,
    operators_checked: routes.length,
    buses,
    source: "https://bookme.pk",
  };
}

async function listOperators() {
  const ops = await getOperators();
  const list = ops.map((o) => ({
    service_id: o.service_id,
    name: o.service_name,
    routes: (o.departure || []).reduce((n, d) => n + (d.destionation || d.destination || []).length, 0),
  }));
  return { count: list.length, operators: list };
}

async function listCities() {
  const cities = await getCities();
  return {
    count: cities.length,
    cities: cities.map((c) => ({
      id: c.origin_city_id,
      name: c.origin_city_name,
      code: c.origin_short,
      destinations: (c.destinations || []).length,
    })),
  };
}

async function listRoutes(cityName) {
  const city = resolveCity(cityName);
  if (!city) throw new Error(`Unknown city: ${cityName}`);
  const cities = await getCities();
  const match = cities.find((c) => String(c.origin_city_id) === city.id);
  if (!match) throw new Error(`City ID ${city.id} not in route list`);
  return {
    city: match.origin_city_name,
    code: match.origin_short,
    destinations: (match.destinations || []).map((d) => ({
      id: d.destination_city_id,
      name: d.destination_city_name,
      code: d.destination_short,
    })),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  node bookme.mjs search --from <city> --to <city> --date YYYY-MM-DD [--currency PKR]
  node bookme.mjs operators
  node bookme.mjs cities
  node bookme.mjs routes --city <city>`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  try {
    let result;
    switch (cmd) {
      case "search": {
        const from = getArg("--from");
        const to = getArg("--to");
        const date = getArg("--date") || new Date().toISOString().slice(0, 10);
        const currency = getArg("--currency") || "PKR";
        if (!from || !to) throw new Error("--from and --to required");
        result = await search(from, to, date, currency);
        break;
      }
      case "operators":
        result = await listOperators();
        break;
      case "cities":
        result = await listCities();
        break;
      case "routes":
        result = await listRoutes(getArg("--city"));
        break;
      default:
        console.error(`Unknown command: ${cmd}`);
        process.exit(1);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
