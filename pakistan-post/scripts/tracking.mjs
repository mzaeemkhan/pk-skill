#!/usr/bin/env node

const PAKPOST_BASE = "https://ep.gov.pk/emtts/EPTrack_Live.aspx";
const TCS_BRIDGE = "https://www.tcsexpress.com/apibridge";

const SERVICES = {
  pakpost: { name: "Pakistan Post (EMTTS)", prefix: ["EP", "CP", "RP", "RR", "EG"] },
  tcs:     { name: "TCS Express",          prefix: ["W"] },
};

function detectService(id) {
  const up = id.toUpperCase();
  for (const [key, svc] of Object.entries(SERVICES)) {
    if (svc.prefix.some(p => up.startsWith(p))) return key;
  }
  return null;
}

function stripHtml(s) {
  return s.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

async function trackPakPost(id) {
  const url = `${PAKPOST_BASE}?ArticleIDz=${encodeURIComponent(id)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Pakistan Post HTTP ${res.status}`);
  const html = await res.text();

  const field = (labelId) => {
    const m = html.match(new RegExp(`id="${labelId}"[^>]*>([^<]*)<`));
    return m ? stripHtml(m[1]) : "";
  };

  const trackingNo = field("LblArticleTrackingNo");
  if (!trackingNo) {
    console.log(JSON.stringify({ error: "Not found or invalid tracking number", service: "pakpost", id }));
    return;
  }

  const origin = field("LblBookingOffice");
  const destination = field("LblDeliveryOffice");

  const events = [];
  const detailMatch = html.match(/id="TrackDetailDiv"[^>]*>([\s\S]*?)(?:<\/div>\s*<\/div>)/i);
  if (detailMatch) {
    const block = detailMatch[1];
    let currentDate = "";
    const dateRe = /<div[^>]*class=['"]date-heading['"][^>]*>([\s\S]*?)<\/div>/gi;
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;

    const parts = block.split(/(<div[^>]*class=['"]date-heading['"])/i);
    for (const part of parts) {
      const dm = part.match(/class=['"]date-heading['"][^>]*>([\s\S]*?)<\/div>/i);
      if (dm) {
        currentDate = stripHtml(dm[1]);
        continue;
      }
      let rm;
      const localRowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      while ((rm = localRowRe.exec(part)) !== null) {
        const cells = [];
        const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        let cm;
        while ((cm = tdRe.exec(rm[1])) !== null) cells.push(stripHtml(cm[1]));
        if (cells.length >= 2) {
          events.push({
            date: currentDate,
            time: cells[0] || "",
            location: cells[1] || "",
            status: cells[2] || "",
          });
        }
      }
    }
  }

  console.log(JSON.stringify({
    service: "pakpost",
    trackingNo,
    origin,
    destination,
    events,
  }, null, 2));
}

async function trackTCS(id) {
  const body = JSON.stringify({
    body: {
      url: "trackapinew",
      type: "GET",
      param: `consignee=${id}`,
      payload: {},
    },
  });

  const res = await fetch(TCS_BRIDGE, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" },
    body,
  });
  if (!res.ok) throw new Error(`TCS HTTP ${res.status}`);
  const data = await res.json();

  if (!data.isSuccess) {
    console.log(JSON.stringify({ error: data.message || "Tracking failed", service: "tcs", id }));
    return;
  }

  const rd = data.responseData || {};
  const info = rd.shipmentinfo?.[0] || {};
  const delivery = rd.deliveryinfo?.[0] || {};
  const checkpoints = (rd.checkpoints || []).map(cp => ({
    date: cp.datetime || "",
    location: cp.recievedby || "",
    status: cp.status || "",
  }));

  console.log(JSON.stringify({
    service: "tcs",
    trackingNo: info.consignmentno || id,
    origin: info.origincity || "",
    destination: info.destinationcity || "",
    status: info.status || "",
    weight: info.weight || "",
    pieces: info.pieces || "",
    deliveredTo: delivery.recievedby || "",
    deliveryDate: delivery.datetime || "",
    events: checkpoints,
    summary: rd.shipmentsummary || "",
  }, null, 2));
}

async function track(id, service) {
  if (!service) service = detectService(id);
  if (!service) {
    console.log(JSON.stringify({
      error: `Cannot detect courier for "${id}". Use --service pakpost|tcs`,
      hint: "Pakistan Post IDs start with EP/CP/RP/RR/EG, TCS IDs start with W",
    }));
    process.exit(1);
  }
  if (service === "pakpost") return trackPakPost(id);
  if (service === "tcs") return trackTCS(id);
  console.log(JSON.stringify({ error: `Unknown service: ${service}` }));
  process.exit(1);
}

function showServices() {
  console.log(JSON.stringify({
    supported: Object.entries(SERVICES).map(([k, v]) => ({
      key: k,
      name: v.name,
      prefixes: v.prefix,
    })),
    unsupported: [
      { name: "Leopards Courier", reason: "No public API, session-based tracking only" },
      { name: "CallCourier", reason: "JS-rendered, no public API" },
    ],
  }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === "services") {
  showServices();
} else if (cmd === "track") {
  let id = null, service = null;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--id" && args[i + 1]) { id = args[++i]; continue; }
    if (args[i] === "--service" && args[i + 1]) { service = args[++i]; continue; }
    if (!id) id = args[i];
  }
  if (!id) {
    console.error("Usage: tracking.mjs track --id <tracking_number> [--service pakpost|tcs]");
    process.exit(1);
  }
  track(id, service).catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: track, services");
  console.error("  track --id <number> [--service pakpost|tcs]");
  console.error("  services");
  process.exit(1);
}
