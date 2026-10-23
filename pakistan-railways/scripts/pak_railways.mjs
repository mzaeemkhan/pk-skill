#!/usr/bin/env node

const BASE = "https://pakrail.gov.pk/Map.aspx";

const MAJOR_STATIONS = {
  lahore: "LHR", karachi: "KC", "karachi city": "KYC", islamabad: "MGLA",
  rawalpindi: "RWP", faisalabad: "FSLD", multan: "MUL", peshawar: "PSC",
  quetta: "QTA", hyderabad: "HDR", sukkur: "SUK", bahawalpur: "BWPR",
  sialkot: "SLK", gujranwala: "GRW", gujrat: "GRT", sahiwal: "SWAL",
  "rahim yar khan": "RYK", khanewal: "KWL", rohri: "ROH", larkana: "LRK",
  nawabshah: "NWS", jhelum: "JMR", "lahore cantt": "LRC", nowshera: "NSR",
  sargodha: "SRQ", okara: "OKR", "toba tek singh": "TTSG",
  "dera ghazi khan": "DGK", jacobabad: "JCD", havelian: "HVN",
};

async function post(endpoint, body) {
  const resp = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
  const data = await resp.json();
  return data.d;
}

function resolveStation(input) {
  const lower = input.toLowerCase().trim();
  if (MAJOR_STATIONS[lower]) return MAJOR_STATIONS[lower];
  const upper = input.toUpperCase().trim();
  if (upper.length <= 5) return upper;
  for (const [name, code] of Object.entries(MAJOR_STATIONS)) {
    if (name.includes(lower)) return code;
  }
  return upper;
}

function cleanTime(raw) {
  if (!raw) return null;
  const match = raw.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : raw;
}

async function searchRoute(from, to) {
  const fromCode = resolveStation(from);
  const toCode = resolveStation(to);
  const trains = await post("getRouteWiseTrain", {
    fromStationCode: fromCode,
    toStationCode: toCode,
  });
  return {
    query: { from: fromCode, to: toCode },
    count: trains.length,
    trains: trains
      .filter((t) => !t.Train_Name.includes("TEST"))
      .map((t) => ({
        train_id: t.TrainId,
        train_code: t.Train_Code,
        train_name: t.Train_Name.replace(/\(.*\)$/, "").trim(),
        from_station: t.frmStationName,
        to_station: t.toStationName,
        departure: cleanTime(t.frmStationDeparture),
        arrival: cleanTime(t.toStationArrival),
      })),
    source: "https://pakrail.gov.pk/Map.aspx",
  };
}

async function getSchedule(trainId, date) {
  const dateStr = date || new Date().toLocaleDateString("en-US");
  const stops = await post("getScheduleByTrain", {
    train_id: String(trainId),
    date: dateStr,
  });
  return {
    train_id: trainId,
    date: dateStr,
    stop_count: stops.length,
    stops: stops.map((s) => ({
      station_code: s.Station_Code?.trim(),
      station_name: s.Station_Name,
      arrival: s.Arrival,
      departure: s.Departure,
      stay_time: s.StayTime,
      day: s.Day_Add,
      lat: s.Latitude,
      lng: s.Longitude,
    })),
    source: "https://pakrail.gov.pk/Map.aspx",
  };
}

async function getFares(trainId) {
  const fares = await post("getTrainFarebyStations", {
    train_id: String(trainId),
  });
  return {
    train_id: trainId,
    fare_count: fares.length,
    fares: fares.map((f) => ({
      from: f.From_Station,
      to: f.To_Station,
      economy: f.Economy || null,
      ac_business: f.ACBussiness || null,
      ac_sleeper: f.ACSleeper || null,
      ac_lower: f.ACLower || null,
      parlour: f.Parlour || null,
    })),
    source: "https://pakrail.gov.pk/Map.aspx",
  };
}

async function getTrainsByType(trainType) {
  const trains = await post("getTypeWiseTrain", { trainType });
  return {
    type: trainType,
    count: trains.length,
    trains: trains.map((t) => ({
      train_id: t.TrainId,
      train_code: t.Train_Code,
      train_name: t.Train_Name,
    })),
  };
}

async function stationTrains(stationCode) {
  const code = resolveStation(stationCode);
  const trains = await post("getStationWiseRoute", { stationCode: code });
  return {
    station: code,
    count: trains.length,
    trains: trains.map((t) => ({
      train_id: t.TrainId,
      train_code: t.Train_Code,
      train_name: t.Train_Name,
    })),
  };
}

function printStations() {
  const sorted = Object.entries(MAJOR_STATIONS).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  console.log(JSON.stringify({ count: sorted.length, stations: sorted.map(([name, code]) => ({ name, code })) }, null, 2));
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  node pak_railways.mjs search --from <station> --to <station>
  node pak_railways.mjs schedule --id <train_id> [--date MM/DD/YYYY]
  node pak_railways.mjs fares --id <train_id>
  node pak_railways.mjs station --code <station_code_or_name>
  node pak_railways.mjs type --type <Express|Mail|Passenger|RailCar|Freight>
  node pak_railways.mjs stations`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  try {
    let result;
    switch (cmd) {
      case "search":
        result = await searchRoute(getArg("--from"), getArg("--to"));
        break;
      case "schedule":
        result = await getSchedule(getArg("--id"), getArg("--date"));
        break;
      case "fares":
        result = await getFares(getArg("--id"));
        break;
      case "station":
        result = await stationTrains(getArg("--code"));
        break;
      case "type":
        result = await getTrainsByType(getArg("--type"));
        break;
      case "stations":
        printStations();
        return;
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
