// Logic-level verification. Run: node scripts/verify.mjs
// Tests TCO math, quiz engine, and Amazon scraper against known inputs.
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { execSync } from 'child_process';

let pass = 0, fail = 0;
const t = (name, got, expected) => {
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log(`${ok ? '✓' : '✗'} ${name}`);
  if (!ok) {
    console.log(`   expected: ${JSON.stringify(expected)}`);
    console.log(`   got:      ${JSON.stringify(got)}`);
    fail++;
  } else pass++;
};

// TCO smoke — via compiled JS (dev server has .next available)
// We replicate the tco function inline for a pure unit test:
function calculateTCO(printer, input) {
  const years = input.years ?? 1;
  const pagesPerYear = input.monthlyPages * 12;
  const colourPages = Math.round(pagesPerYear * (input.colourPercent / 100));
  const bwPages = pagesPerYear - colourPages;
  const inkCostPerYear =
    bwPages * printer.ink.blackPerPage + colourPages * printer.ink.colourPerPage;
  const paperCostPerYear = Math.ceil(pagesPerYear / 500) * 280;
  const miscPerYear = 300;
  const yearOneTotal = printer.mrp + inkCostPerYear + paperCostPerYear + miscPerYear;
  return {
    yearOneTotal: Math.round(yearOneTotal),
    inkCostPerYear: Math.round(inkCostPerYear),
  };
}

const g3770 = { mrp: 15990, ink: { blackPerPage: 0.13, colourPerPage: 0.25 } };
const g3020 = { mrp: 11099, ink: { blackPerPage: 0.08, colourPerPage: 0.21 } };
const e4570 = { mrp: 10495, ink: { blackPerPage: 1.80, colourPerPage: 4.50 } };

// Canon G3770 at 100 pages/mo, 70% colour = Year 1 ≈ ₹17,387 per the Learn page
const r1 = calculateTCO(g3770, { monthlyPages: 100, colourPercent: 70, years: 1 });
t('G3770 TCO year1 ≈ 17387', r1.yearOneTotal, 17387);

// Canon G3020 at 100 pages/mo, 70% colour
const r2 = calculateTCO(g3020, { monthlyPages: 100, colourPercent: 70, years: 1 });
t('G3020 TCO year1 ≈ 12444', r2.yearOneTotal, 12444);

// Cartridge E4570 at 100 pages/mo, 70% colour — should be > ₹16,000
const r3 = calculateTCO(e4570, { monthlyPages: 100, colourPercent: 70, years: 1 });
console.log(`  (E4570 year1 computed: ₹${r3.yearOneTotal})`);
t('E4570 TCO year1 > G3770 (cartridge trap)', r3.yearOneTotal > r1.yearOneTotal, true);

// Scraper smoke — hit the live dev route
let amazonPrice = null;
try {
  const raw = execSync('curl -s --max-time 25 http://localhost:3001/api/prices/B0BY92Z97S').toString();
  const json = JSON.parse(raw);
  amazonPrice = json?.prices?.amazon?.price;
  console.log(`  (Amazon scraper returned: ₹${amazonPrice ?? 'null'})`);
} catch (e) {
  console.log(`  (scraper error: ${e.message})`);
}
t('Amazon scraper returns a sensible INR price', amazonPrice !== null && amazonPrice > 5000 && amazonPrice < 50000, true);

console.log('');
console.log(`RESULT: ${pass} pass, ${fail} fail`);
process.exit(fail === 0 ? 0 : 1);
