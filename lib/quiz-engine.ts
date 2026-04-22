import { printers, type Printer } from './printers';
import { calculateTCO } from './tco';

export type QuizAnswers = {
  monthlyPages: 'under20' | '20to100' | '100to300' | '300plus';
  colour: 'none' | 'occasional' | 'half' | 'mostly';
  duplexNeed: 'never' | 'sometimes' | 'weekly';
  budget: number;
  priority: 'photo' | 'text' | 'balanced';
  connectivity: 'wifi-required' | 'wifi-nice' | 'usb-ok';
  scanner: 'required' | 'nice-to-have' | 'not-needed';
  mainDevice: 'phone' | 'laptop' | 'mix';
  photoSize: 'a4-only' | 'a4-plus-4x6' | 'photos-priority';
  brandPref: 'canon' | 'epson' | 'hp' | 'brother' | 'no-preference';
};

export type QuizMatch = {
  printer: Printer;
  score: number;
  reasons: string[];
};

const volumeMap = {
  under20: 15,
  '20to100': 60,
  '100to300': 200,
  '300plus': 500,
} as const;

const colourMap = {
  none: 0,
  occasional: 20,
  half: 50,
  mostly: 80,
} as const;

export function rankPrinters(answers: QuizAnswers): QuizMatch[] {
  const monthlyPages = volumeMap[answers.monthlyPages];
  const colourPercent = colourMap[answers.colour];

  const scored = printers.map((p): QuizMatch => {
    let score = 100;
    const reasons: string[] = [];

    // Hard constraint: budget +15% headroom
    if (p.mrp > answers.budget * 1.15) {
      score -= 40;
      reasons.push(`Over budget by ${Math.round(((p.mrp / answers.budget) - 1) * 100)}%`);
    } else if (p.mrp <= answers.budget) {
      score += 10;
      reasons.push(`Within budget (₹${p.mrp.toLocaleString('en-IN')})`);
    }

    // Colour
    if (colourPercent > 0 && !p.features.colour) {
      score -= 50;
      reasons.push('No colour output (you want colour)');
    }
    if (colourPercent === 0 && p.category === 'laser-mono') {
      score += 15;
      reasons.push('B&W laser matches text-only usage');
    }

    // Duplex
    if (answers.duplexNeed === 'weekly' && !p.features.autoDuplex) {
      score -= 25;
      reasons.push("No auto-duplex — you'll flip weekly stacks manually");
    }
    if (answers.duplexNeed === 'weekly' && p.features.autoDuplex) {
      score += 15;
      reasons.push('Auto-duplex saves time on weekly stacks');
    }

    // Connectivity
    if (answers.connectivity === 'wifi-required' && !p.features.wifi) {
      score -= 35;
      reasons.push('No Wi-Fi (you need wireless)');
    }
    if (answers.connectivity === 'wifi-nice' && !p.features.wifi) {
      score -= 10;
    }

    // Scanner / ADF
    if (answers.scanner === 'required' && !p.features.adf) {
      score -= 15;
      reasons.push('No ADF — manual page-by-page scanning');
    }

    // Main device
    if (answers.mainDevice === 'phone' && !p.features.wifi) {
      score -= 25;
      reasons.push('Phone-first needs Wi-Fi');
    }

    // Photo priority / size
    if (answers.photoSize === 'photos-priority' && !p.features.borderless) {
      score -= 10;
      reasons.push('No borderless — photos will have white frame');
    }

    // TCO over 3 years (lower is better)
    const tco = calculateTCO(p, { monthlyPages, colourPercent, years: 3 });
    score -= Math.round((tco.threeYearTotal - p.mrp) / 500);

    // Volume vs tech
    if (monthlyPages >= 100 && p.category === 'cartridge') {
      score -= 35;
      reasons.push('Cartridge ink is ruinously expensive at your volume');
    }
    if (monthlyPages >= 100 && p.category === 'ink-tank') {
      score += 10;
      reasons.push('Ink-tank refills stay cheap at your volume');
    }
    if (monthlyPages < 20 && p.category === 'ink-tank') {
      score -= 5;
      reasons.push('Ink-tank overkill for this low volume (clog risk)');
    }

    // Priority
    if (answers.priority === 'photo' && p.features.colour && p.category === 'ink-tank') {
      if (p.brand === 'Canon' || p.brand === 'Epson') {
        score += 10;
        reasons.push(`${p.brand} dye ink = vibrant photos`);
      }
    }
    if (answers.priority === 'text') {
      if (p.brand === 'HP') {
        score += 12;
        reasons.push('HP pigment black = sharper text');
      }
      if (p.category === 'laser-mono' || p.category === 'laser-colour') {
        score += 15;
        reasons.push('Laser = sharpest text');
      }
    }

    // Brand preference
    if (answers.brandPref !== 'no-preference') {
      const prefBrand = answers.brandPref.charAt(0).toUpperCase() + answers.brandPref.slice(1);
      if (p.brand === prefBrand) {
        score += 20;
        reasons.push(`Matches brand preference (${prefBrand})`);
      } else {
        score -= 8;
      }
    }

    // Editorial signal
    if (p.verdict === 'top-pick') score += 5;
    if (p.verdict === 'value-pick') score += 3;
    if (p.verdict === 'avoid') score -= 20;

    return { printer: p, score, reasons: reasons.slice(0, 4) };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
