#!/usr/bin/env node

// Roman to Urdu character mapping — common Pakistani romanization
const ROMAN_TO_URDU = {
  // multi-char first (greedy match order matters)
  kh: "خ", gh: "غ", sh: "ش", ch: "چ", th: "تھ", dh: "دھ",
  bh: "بھ", ph: "پھ", jh: "جھ", rh: "ڑھ", nh: "نھ", lh: "لھ",
  aa: "آ", ee: "ای", oo: "او", ai: "ائ", au: "او",
  tt: "ٹ", dd: "ڈ", rr: "ڑ",
  // single chars — most common Urdu equivalent
  a: "ا", b: "ب", c: "ک", d: "د", e: "ے", f: "ف",
  g: "گ", h: "ہ", i: "ی", j: "ج", k: "ک", l: "ل",
  m: "م", n: "ن", o: "و", p: "پ", q: "ق", r: "ر",
  s: "س", t: "ت", u: "و", v: "و", w: "و", x: "کس",
  y: "ی", z: "ز",
};

// Sort keys longest first for greedy matching
const ROMAN_KEYS = Object.keys(ROMAN_TO_URDU).sort((a, b) => b.length - a.length);

function romanToUrdu(text) {
  let result = "";
  let i = 0;
  const lower = text.toLowerCase();
  while (i < lower.length) {
    let matched = false;
    for (const key of ROMAN_KEYS) {
      if (lower.startsWith(key, i)) {
        result += ROMAN_TO_URDU[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (lower[i] === " ") result += " ";
      else if (/[0-9]/.test(lower[i])) result += numToUrdu(lower[i]);
      else if (/[.,!?;:\-]/.test(lower[i])) result += lower[i];
      else result += lower[i];
      i++;
    }
  }
  return result;
}

const URDU_NUMERALS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function numToUrdu(digit) {
  return URDU_NUMERALS[parseInt(digit)] || digit;
}

// Number to Urdu words
const UNITS = ["", "ایک", "دو", "تین", "چار", "پانچ", "چھ", "سات", "آٹھ", "نو"];
const TENS = ["", "دس", "بیس", "تیس", "چالیس", "پچاس", "ساٹھ", "ستر", "اسی", "نوے"];
const TEENS = ["دس", "گیارہ", "بارہ", "تیرہ", "چودہ", "پندرہ", "سولہ", "سترہ", "اٹھارہ", "انیس"];
const SCALES = { 100: "سو", 1000: "ہزار", 100000: "لاکھ", 10000000: "کروڑ", 1000000000: "ارب" };

function numberToUrduWords(num) {
  if (num === 0) return "صفر";
  if (num < 0) return "منفی " + numberToUrduWords(-num);

  let result = "";
  const scales = [1000000000, 10000000, 100000, 1000, 100];

  for (const scale of scales) {
    const count = Math.floor(num / scale);
    if (count > 0) {
      if (result) result += " ";
      if (count > 1) result += numberToUrduWords(count) + " ";
      result += SCALES[scale];
      num %= scale;
    }
  }

  if (num >= 20) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    if (result) result += " ";
    result += TENS[ten];
    if (unit > 0) result += " " + UNITS[unit];
  } else if (num >= 10) {
    if (result) result += " ";
    result += TEENS[num - 10];
  } else if (num > 0) {
    if (result) result += " ";
    result += UNITS[num];
  }

  return result;
}

function wordCount(text) {
  const urduWords = text.match(/[؀-ۿﭐ-﷿ﹰ-﻿]+/g) || [];
  const latinWords = text.match(/[a-zA-Z]+/g) || [];
  const numbers = text.match(/[0-9۰-۹]+/g) || [];
  return {
    total: urduWords.length + latinWords.length + numbers.length,
    urdu: urduWords.length,
    latin: latinWords.length,
    numbers: numbers.length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
  };
}

function numberToUrduNumerals(num) {
  return String(num).split("").map(d => /[0-9]/.test(d) ? URDU_NUMERALS[parseInt(d)] : d).join("");
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}

if (cmd === "transliterate") {
  const text = getFlag("text", args.slice(1).join(" "));
  if (!text) { console.error("Usage: urdu.mjs transliterate --text 'pakistan zindabad'"); process.exit(1); }
  console.log(JSON.stringify({ input: text, urdu: romanToUrdu(text) }, null, 2));
} else if (cmd === "wordcount") {
  const text = getFlag("text", args.slice(1).join(" "));
  if (!text) { console.error("Usage: urdu.mjs wordcount --text 'some text'"); process.exit(1); }
  console.log(JSON.stringify({ text: text.substring(0, 100) + (text.length > 100 ? "..." : ""), ...wordCount(text) }, null, 2));
} else if (cmd === "number") {
  const num = getFlag("value", args[1]);
  if (num === undefined) { console.error("Usage: urdu.mjs number --value 12345"); process.exit(1); }
  const n = parseInt(num);
  if (isNaN(n)) { console.error("Invalid number"); process.exit(1); }
  console.log(JSON.stringify({
    number: n,
    urduWords: numberToUrduWords(n),
    urduNumerals: numberToUrduNumerals(n),
  }, null, 2));
} else if (cmd === "numerals") {
  const num = getFlag("value", args[1]);
  if (!num) { console.error("Usage: urdu.mjs numerals --value 2026"); process.exit(1); }
  console.log(JSON.stringify({ input: num, urdu: numberToUrduNumerals(parseInt(num)) }, null, 2));
} else {
  console.error("Commands: transliterate, wordcount, number, numerals");
  console.error("  transliterate --text 'pakistan zindabad'");
  console.error("  wordcount --text 'some urdu or english text'");
  console.error("  number --value 12345");
  console.error("  numerals --value 2026");
  process.exit(1);
}
