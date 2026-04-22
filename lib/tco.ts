import type { Printer } from './printers';

export type TCOInput = {
  monthlyPages: number;
  colourPercent: number;
  years?: number;
};

export type TCOResult = {
  printerCost: number;
  inkCostPerYear: number;
  paperCostPerYear: number;
  miscPerYear: number;
  yearOneTotal: number;
  threeYearTotal: number;
  costPerPageEffective: number;
};

export function calculateTCO(printer: Printer, input: TCOInput): TCOResult {
  const years = input.years ?? 1;
  const pagesPerYear = input.monthlyPages * 12;
  const colourPages = Math.round(pagesPerYear * (input.colourPercent / 100));
  const bwPages = pagesPerYear - colourPages;

  const inkCostPerYear =
    bwPages * printer.ink.blackPerPage + colourPages * printer.ink.colourPerPage;
  const paperCostPerYear = Math.ceil(pagesPerYear / 500) * 280;
  const miscPerYear = 300;

  const yearOneTotal =
    printer.mrp + inkCostPerYear + paperCostPerYear + miscPerYear;
  const threeYearTotal =
    printer.mrp + (inkCostPerYear + paperCostPerYear + miscPerYear) * 3;

  const costPerPageEffective =
    pagesPerYear > 0 ? inkCostPerYear / pagesPerYear : 0;

  return {
    printerCost: printer.mrp,
    inkCostPerYear: Math.round(inkCostPerYear),
    paperCostPerYear,
    miscPerYear,
    yearOneTotal: Math.round(yearOneTotal),
    threeYearTotal: Math.round(threeYearTotal),
    costPerPageEffective: parseFloat(costPerPageEffective.toFixed(3)),
  };
}

export function formatInr(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
