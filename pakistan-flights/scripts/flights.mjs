#!/usr/bin/env node

const SKY_API = "https://api.bookmesky.com";
const TOKEN_URL = "https://bookme.pk/internal/sky-token";

const PK_AIRPORTS = {
  islamabad: "ISB", isb: "ISB", rawalpindi: "ISB",
  karachi: "KHI", khi: "KHI",
  lahore: "LHE", lhe: "LHE",
  peshawar: "PEW", pew: "PEW",
  quetta: "UET", uet: "UET",
  multan: "MUX", mux: "MUX",
  faisalabad: "LYP", lyp: "LYP",
  sialkot: "SKT", skt: "SKT",
  gwadar: "GWD", gwd: "GWD",
  turbat: "TUK", tuk: "TUK",
  "dera ismail khan": "DSK", dsk: "DSK",
  "rahim yar khan": "RYK", ryk: "RYK",
  bahawalpur: "BHV", bhv: "BHV",
  sukkur: "SKZ", skz: "SKZ",
  nawabshah: "WNS", wns: "WNS",
  zhob: "PZH", pzh: "PZH",
  chitral: "CJL", cjl: "CJL",
  gilgit: "GIL", gil: "GIL",
  skardu: "KDU", kdu: "KDU",
  muzaffarabad: "MFG", mfg: "MFG",
  saidu: "SDT", sdt: "SDT", swat: "SDT",
  dalbandin: "DBA", dba: "DBA",
  panjgur: "PJG", pjg: "PJG",
  dubai: "DXB", dxb: "DXB",
  "abu dhabi": "AUH", auh: "AUH",
  sharjah: "SHJ", shj: "SHJ",
  jeddah: "JED", jed: "JED",
  riyadh: "RUH", ruh: "RUH",
  dammam: "DMM", dmm: "DMM",
  medina: "MED", med: "MED",
  muscat: "MCT", mct: "MCT",
  doha: "DOH", doh: "DOH",
  bahrain: "BAH", bah: "BAH",
  london: "LHR", lhr: "LHR",
  manchester: "MAN", man: "MAN",
  toronto: "YYZ", yyz: "YYZ",
  kuala: "KUL", kul: "KUL", "kuala lumpur": "KUL",
  istanbul: "IST", ist: "IST",
  bangkok: "BKK", bkk: "BKK",
  beijing: "PEK", pek: "PEK",
};

function resolveIATA(input) {
  const lower = input.toLowerCase().trim();
  if (PK_AIRPORTS[lower]) return PK_AIRPORTS[lower];
  if (/^[A-Z]{3}$/i.test(input)) return input.toUpperCase();
  for (const [name, code] of Object.entries(PK_AIRPORTS)) {
    if (name.includes(lower) || lower.includes(name)) return code;
  }
  return null;
}

let _token = null;
let _tokenExpiry = 0;

async function getToken() {
  if (_token && Date.now() < _tokenExpiry) return _token;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();
  _token = data.token;
  _tokenExpiry = Date.now() + 50 * 60 * 1000; // 50 min
  return _token;
}

async function skyFetch(path, opts = {}) {
  const token = await getToken();
  const url = `${SKY_API}${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...opts,
  });
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    return { _notFound: true, message: err.message || "Not found" };
  }
  if (res.status === 410) {
    const err = await res.json().catch(() => ({}));
    return { _unavailable: true, message: err.message || "Unavailable" };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text.substring(0, 200)}`);
  }
  return res.json();
}

async function getProviders(fromIATA, toIATA) {
  const data = await skyFetch("/air/api/content-providers", {
    method: "POST",
    body: JSON.stringify({
      Locations: [
        { IATA: fromIATA, Type: "airport" },
        { IATA: toIATA, Type: "airport" },
      ],
      TravelClass: "economy",
    }),
  });
  return Array.isArray(data) ? data.map((d) => d.ContentProvider) : [];
}

async function searchProvider(fromIATA, toIATA, provider, date, travelClass, currency, travelers) {
  return skyFetch("/air/api/search", {
    method: "POST",
    body: JSON.stringify({
      Locations: [
        { IATA: fromIATA, Type: "airport" },
        { IATA: toIATA, Type: "airport" },
      ],
      ContentProvider: provider,
      Currency: currency,
      TripType: "one_way",
      TravelingDates: [date],
      Travelers: travelers,
      TravelClass: travelClass,
    }),
  });
}

function extractFlights(data, provider) {
  if (data._notFound || data._unavailable) return [];
  const itineraries = data.Itineraries || [];
  return itineraries.map((it) => {
    const flight = it.Flights?.[0];
    const seg = flight?.Segments?.[0];
    const lowestFare = it.LowestFare?.[0];
    const fare = lowestFare?.PassengerFares?.[0];
    const policies = lowestFare?.Policies || [];
    const baggage = flight?.BaggageInfo;

    return {
      airline: it.MarketingCarrier?.name,
      airline_iata: it.MarketingCarrier?.iata,
      flight_number: seg?.FlightNumber,
      from: seg?.From?.iata,
      from_airport: seg?.From?.name,
      from_city: seg?.From?.city?.name,
      to: seg?.To?.iata,
      to_airport: seg?.To?.name,
      to_city: seg?.To?.city?.name,
      departure: seg?.DepartureAt,
      arrival: seg?.ArrivalAt,
      duration_min: seg?.FlightTime,
      stops: flight?.LayoversCount || 0,
      aircraft: seg?.Plane ? [seg.Plane.Manufacturer, seg.Plane.Model].filter(Boolean).join(" ") || null : null,
      travel_class: data.TravelClass,
      fare: fare
        ? {
            base: fare.ChargedBasePrice,
            taxes: fare.ChargedTaxes,
            fees: fare.ChargedFees,
            service_charges: fare.ChargedServiceCharges,
            total: fare.ChargedTotalPrice,
            currency: fare.ChargedCurrency,
          }
        : null,
      fare_class: lowestFare?.Name || lowestFare?.Class,
      baggage: baggage?.Allowance
        ? { pieces: baggage.Allowance.Pieces, weight_kg: baggage.Allowance.Weight }
        : null,
      refund_policy: policies.find((p) => p.Type === "refund")?.Description,
      exchange_policy: policies.find((p) => p.Type === "exchange")?.Description,
      provider,
      _ref: it.RefID,
    };
  });
}

async function search(from, to, date, currency = "PKR", travelClass = "economy", adults = 1, children = 0, infants = 0) {
  const fromIATA = resolveIATA(from);
  const toIATA = resolveIATA(to);
  if (!fromIATA) throw new Error(`Unknown airport/city: ${from}. Use IATA code (e.g. LHE) or city name.`);
  if (!toIATA) throw new Error(`Unknown airport/city: ${to}. Use IATA code or city name.`);

  const travelers = [
    { Type: "adult", Count: adults },
    { Type: "child", Count: children },
    { Type: "infant", Count: infants },
  ];

  const providers = await getProviders(fromIATA, toIATA);
  if (providers.length === 0) {
    return {
      query: { from: fromIATA, to: toIATA, date, class: travelClass },
      count: 0,
      flights: [],
      source: "https://bookme.pk",
    };
  }

  const results = await Promise.allSettled(
    providers.map((p) => searchProvider(fromIATA, toIATA, p, date, travelClass, currency, travelers))
  );

  const flights = [];
  const errors = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      flights.push(...extractFlights(r.value, providers[i]));
    } else {
      errors.push({ provider: providers[i], error: r.reason?.message });
    }
  }

  flights.sort((a, b) => (a.departure || "").localeCompare(b.departure || ""));

  return {
    query: { from: fromIATA, to: toIATA, date, class: travelClass, currency },
    count: flights.length,
    providers_checked: providers.length,
    flights,
    ...(errors.length > 0 ? { errors } : {}),
    source: "https://bookme.pk",
  };
}

async function searchAirports(query) {
  const data = await skyFetch(`/air/api/airports?query=${encodeURIComponent(query)}`);
  if (!Array.isArray(data)) return { count: 0, airports: [] };
  const airports = data.map((a) => ({
    code: a.Code,
    name: a.Name,
    city: a.CityName,
    country: a.CountryName,
    type: a.Type,
  }));
  return { count: airports.length, airports };
}

async function popularAirports() {
  const data = await skyFetch("/air/api/airports/popular");
  const airports = (Array.isArray(data) ? data : [data]).map((a) => ({
    code: a.Code,
    name: a.Name,
    city: a.CityName,
    country: a.CountryName,
  }));
  return { count: airports.length, airports };
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  node flights.mjs search --from <city/IATA> --to <city/IATA> --date YYYY-MM-DD [--currency PKR] [--class economy]
  node flights.mjs airports --query <name>
  node flights.mjs popular`);
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
        const travelClass = getArg("--class") || "economy";
        if (!from || !to) throw new Error("--from and --to required");
        result = await search(from, to, date, currency, travelClass);
        break;
      }
      case "airports": {
        const query = getArg("--query");
        if (!query) throw new Error("--query required");
        result = await searchAirports(query);
        break;
      }
      case "popular":
        result = await popularAirports();
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
