#!/usr/bin/env node

const PITC_BASE = "https://bill.pitc.com.pk";
const KE_BASE = "https://staging.ke.com.pk:24555/ReBrand";

const DISCOS = {
  lesco:   { path: "lescobill",   name: "LESCO — Lahore Electric Supply Company" },
  fesco:   { path: "fescobill",   name: "FESCO — Faisalabad Electric Supply Company" },
  iesco:   { path: "iescobill",   name: "IESCO — Islamabad Electric Supply Company" },
  mepco:   { path: "mepcobill",   name: "MEPCO — Multan Electric Power Company" },
  pesco:   { path: "pescobill",   name: "PESCO — Peshawar Electric Supply Company" },
  hesco:   { path: "hescobill",   name: "HESCO — Hyderabad Electric Supply Company" },
  sepco:   { path: "sepcobill",   name: "SEPCO — Sukkur Electric Power Company" },
  qesco:   { path: "qescobill",   name: "QESCO — Quetta Electric Supply Company" },
  gepco:   { path: "gepcobill",   name: "GEPCO — Gujranwala Electric Power Company" },
  tesco:   { path: "tescobill",   name: "TESCO — Tribal Areas Electric Supply Company" },
  hazeco:  { path: "hazecobill",  name: "HAZECO — Hazara Electric Power Company" },
};

function extractTokens(html) {
  const get = (name) => {
    const m = html.match(new RegExp(`name="${name}"[^>]*value="([^"]*)"`));
    return m ? m[1] : "";
  };
  return {
    viewstate: get("__VIEWSTATE"),
    viewstateGenerator: get("__VIEWSTATEGENERATOR"),
    eventValidation: get("__EVENTVALIDATION"),
    requestVerification: get("__RequestVerificationToken"),
  };
}

function extractCookies(resp) {
  const raw = resp.headers.getSetCookie?.() || [];
  return raw.map(c => c.split(";")[0]).join("; ");
}

function parseDiscoTable(html) {
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let tr;
  while ((tr = trRe.exec(html)) !== null) {
    const cells = [];
    const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let td;
    while ((td = tdRe.exec(tr[1])) !== null) {
      cells.push(td[1].replace(/<[^>]*>/g, "").trim());
    }
    if (cells.length >= 2) rows.push(cells);
  }
  return rows;
}

function parseBillFromRows(rows) {
  const bill = {};
  for (const cells of rows) {
    if (cells.length < 2) continue;
    const key = cells[0].toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const val = cells[1].trim();
    if (!key || !val) continue;
    if (key.includes("consumer") && key.includes("name")) bill.consumer_name = val;
    else if (key.includes("reference") && key.includes("no")) bill.reference_no = val;
    else if (key.includes("consumer") && key.includes("no")) bill.consumer_no = val;
    else if (key.includes("tariff")) bill.tariff = val;
    else if (key.includes("due date")) bill.due_date = val;
    else if (key.includes("payable within")) bill.payable_within_due_date = val;
    else if (key.includes("payable after")) bill.payable_after_due_date = val;
    else if (key.includes("billing month") || key.includes("bill month")) bill.billing_month = val;
    else if (key.includes("units consumed") || key.includes("unit consumed")) bill.units_consumed = val;
    else if (key.includes("arrears")) bill.arrears = val;
    else if (key.includes("current") && key.includes("charge")) bill.current_charges = val;
    else if (key.includes("status")) bill.status = val;
    else if (key.includes("address")) bill.address = val;
    else if (key.includes("connection date")) bill.connection_date = val;
    else if (key.includes("city") || key.includes("division")) bill.city_division = val;
    else if (key.includes("subdivision") || key.includes("sub division")) bill.subdivision = val;
    else bill[key.replace(/\s+/g, "_")] = val;
  }
  return bill;
}

async function fetchDiscoBill(disco, searchValue, searchBy = "refno", ruCode = "") {
  const info = DISCOS[disco.toLowerCase()];
  if (!info) throw new Error(`Unknown DISCO: ${disco}. Use: ${Object.keys(DISCOS).join(", ")}`);

  const url = `${PITC_BASE}/${info.path}`;

  const getResp = await fetch(url, { redirect: "follow" });
  if (!getResp.ok) throw new Error(`GET failed: HTTP ${getResp.status}`);
  const pageHtml = await getResp.text();
  const tokens = extractTokens(pageHtml);
  const cookies = extractCookies(getResp);

  const formData = new URLSearchParams();
  formData.append("__VIEWSTATE", tokens.viewstate);
  formData.append("__VIEWSTATEGENERATOR", tokens.viewstateGenerator);
  formData.append("__EVENTVALIDATION", tokens.eventValidation);
  formData.append("__RequestVerificationToken", tokens.requestVerification);
  formData.append("rbSearchByList", searchBy);
  formData.append("searchTextBox", searchValue);
  formData.append("ruCodeTextBox", ruCode);
  formData.append("btnSearch", "Search");

  const postResp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookies,
      "Referer": url,
    },
    body: formData.toString(),
    redirect: "follow",
  });

  if (!postResp.ok) throw new Error(`POST failed: HTTP ${postResp.status}`);
  const resultHtml = await postResp.text();

  const errorMatch = resultHtml.match(/id="ua"[^>]*>([\s\S]*?)<\/div>/i)
    || resultHtml.match(/class="[^"]*color-red[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (errorMatch) {
    const errorText = errorMatch[1].replace(/<[^>]*>/g, "").trim();
    if (errorText) throw new Error(errorText);
  }

  const rows = parseDiscoTable(resultHtml);
  const bill = parseBillFromRows(rows);

  if (Object.keys(bill).length === 0) {
    const rawText = resultHtml.replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, "\n")
      .split("\n").map(l => l.trim()).filter(Boolean);
    const dataLines = rawText.filter(l => l.includes(":") && l.length < 200);
    for (const line of dataLines) {
      const [k, ...rest] = line.split(":");
      const key = k.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "_");
      const val = rest.join(":").trim();
      if (key && val && key.length > 2 && key.length < 40) bill[key] = val;
    }
  }

  if (Object.keys(bill).length === 0) throw new Error("No bill data returned. Check your reference/customer number.");

  return {
    provider: info.name,
    search_by: searchBy === "refno" ? "Reference No" : "Customer ID",
    search_value: searchValue,
    ...bill,
    source: url,
  };
}

function extractAllHiddenFields(html, formId) {
  let section = html;
  if (formId) {
    const idx = html.indexOf(`id="${formId}"`);
    if (idx >= 0) {
      const end = html.indexOf("</form>", idx);
      section = html.substring(idx, end > idx ? end : undefined);
    }
  }
  const fields = {};
  const re = /<input[^>]*type=["']hidden["'][^>]*>/gi;
  let m;
  while ((m = re.exec(section)) !== null) {
    const name = m[0].match(/name=["']([^"']*)/)?.[1];
    const value = m[0].match(/value=["']([^"']*)/)?.[1] ?? "";
    if (name) fields[name] = value;
  }
  return fields;
}

async function fetchKEBill(accountNumber, consumerNumber = "") {
  const url = `${KE_BASE}/DuplicateBill.aspx`;

  const getResp = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!getResp.ok) throw new Error(`GET failed: HTTP ${getResp.status}`);
  const pageHtml = await getResp.text();
  const cookies = extractCookies(getResp);

  const captchaMatch = pageHtml.match(/id="lblCaptcha"[^>]*>([^<]+)</);
  if (!captchaMatch) throw new Error("Could not extract captcha from page");
  const captchaText = captchaMatch[1].trim();

  const hiddenFields = extractAllHiddenFields(pageHtml, "form1");

  const formData = new URLSearchParams();
  formData.append("__EVENTTARGET", "btnViewBill");
  formData.append("__EVENTARGUMENT", "");
  for (const [k, v] of Object.entries(hiddenFields)) {
    if (k === "__EVENTTARGET" || k === "__EVENTARGUMENT") continue;
    formData.append(k, v);
  }
  formData.append("txtAccNo", accountNumber);
  formData.append("txtConNo", consumerNumber);
  formData.append("txtimgcode", captchaText);

  const postResp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookies,
      "Referer": url,
      "User-Agent": "Mozilla/5.0",
    },
    body: formData.toString(),
    redirect: "follow",
  });

  if (!postResp.ok) throw new Error(`POST failed: HTTP ${postResp.status}`);
  const resultHtml = await postResp.text();

  const msgMatch = resultHtml.match(/id="lblmsg"[^>]*>([\s\S]*?)<\/span>/i);
  if (msgMatch) {
    const msg = msgMatch[1].replace(/<[^>]*>/g, "").trim();
    if (msg) throw new Error(msg);
  }

  const rows = parseDiscoTable(resultHtml);
  const bill = parseBillFromRows(rows);

  // KE renders bill data in labeled spans within upg-row divs
  const upgRe = /<span class="upg-lbl">([\s\S]*?)<\/span>\s*<span class="upg-val"[^>]*>(?:<span[^>]*>)?([\s\S]*?)(?:<\/span>)?<\/span>/gi;
  let um;
  while ((um = upgRe.exec(resultHtml)) !== null) {
    const key = um[1].replace(/<[^>]*>/g, "").trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "_");
    const val = um[2].replace(/<[^>]*>/g, "").trim();
    if (key && val && !bill[key]) bill[key] = val;
  }

  // Also extract labeled spans (Label4=account, Label5=amount, etc.)
  const labelMap = { Label4: "account_number_confirmed", Label5: "bill_amount", Label7: "total_payable" };
  for (const [id, key] of Object.entries(labelMap)) {
    const m = resultHtml.match(new RegExp(`id="${id}"[^>]*>([\\s\\S]*?)<\\/span>`, "i"));
    if (m) {
      const val = m[1].replace(/<[^>]*>/g, "").trim();
      if (val && val !== "0" && val !== "0.00" && !bill[key]) bill[key] = val;
    }
  }

  if (Object.keys(bill).length === 0 && resultHtml.length < 100) {
    throw new Error("Empty response from K-Electric. The server may be temporarily unavailable.");
  }

  return {
    provider: "K-Electric — Karachi Electric Supply",
    account_number: accountNumber,
    consumer_number: consumerNumber || undefined,
    ...bill,
    source: "https://ke.com.pk/bills-e-payments/",
  };
}

function printProviders() {
  console.log(JSON.stringify({
    electricity_discos: Object.entries(DISCOS).map(([k, v]) => ({
      code: k,
      name: v.name,
      platform: "PITC (bill.pitc.com.pk)",
      search_by: ["14-digit Reference No", "Customer ID"],
      captcha: false,
    })),
    ke: {
      code: "ke",
      name: "K-Electric — Karachi Electric Supply",
      platform: "staging.ke.com.pk",
      search_by: ["13-digit Account Number", "8-digit Consumer Number (optional)"],
      captcha: "text (auto-solved)",
    },
    unavailable: {
      sngpl: "SNGPL — blocked by image CAPTCHA on bill.sngpl.com.pk",
      ssgc: "SSGC — blocked by Google reCAPTCHA v2 on viewbill.ssgc.com.pk",
    },
  }, null, 2));
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  bills.mjs check --provider <disco|ke> --ref <number> [--by refno|appno] [--ru R|U]
  bills.mjs providers

Providers: ${Object.keys(DISCOS).join(", ")}, ke
  --ref     Reference No (DISCOs, 14 digits) or Account No (KE, 13 digits)
  --by      refno (default) or appno (Customer ID) — DISCOs only
  --ru      R (Rural) or U (Urban, default) — DISCOs only
  --consumer  Consumer Number (KE only, 8 digits, optional)`);
    return;
  }

  if (cmd === "providers") {
    printProviders();
    return;
  }

  if (cmd === "check") {
    const flag = (name) => {
      const i = args.indexOf(name);
      return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
    };

    const provider = (flag("--provider") || "").toLowerCase();
    const ref = flag("--ref");
    const by = flag("--by") || "refno";
    const ru = flag("--ru") || "";
    const consumer = flag("--consumer") || "";

    if (!provider) { console.error("Error: --provider required"); process.exit(1); }
    if (!ref) { console.error("Error: --ref required"); process.exit(1); }

    try {
      let result;
      if (provider === "ke") {
        result = await fetchKEBill(ref, consumer);
      } else if (DISCOS[provider]) {
        result = await fetchDiscoBill(provider, ref, by, ru);
      } else {
        console.error(`Unknown provider: ${provider}. Use: ${Object.keys(DISCOS).join(", ")}, ke`);
        process.exit(1);
      }
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      console.error(JSON.stringify({ error: e.message }, null, 2));
      process.exit(1);
    }
    return;
  }

  console.error(`Unknown command: ${cmd}. Use: check, providers, help`);
  process.exit(1);
}

main();
