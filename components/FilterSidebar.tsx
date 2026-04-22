'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Filters = {
  brand?: string;
  wifi?: string;
  duplex?: string;
  colour?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};

const PRICE_MIN = 5000;
const PRICE_MAX = 25000;
const PRICE_STEP = 500;

export function FilterSidebar({ filters }: { filters: Filters }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [minVal, setMinVal] = useState<number>(() =>
    filters.minPrice ? parseInt(filters.minPrice) : PRICE_MIN
  );
  const [maxVal, setMaxVal] = useState<number>(() =>
    filters.maxPrice ? parseInt(filters.maxPrice) : PRICE_MAX
  );

  useEffect(() => {
    setMinVal(filters.minPrice ? parseInt(filters.minPrice) : PRICE_MIN);
    setMaxVal(filters.maxPrice ? parseInt(filters.maxPrice) : PRICE_MAX);
  }, [filters.minPrice, filters.maxPrice]);

  function pushParam(key: keyof Filters, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/browse?${params.toString()}`);
  }

  function applyPrice() {
    const params = new URLSearchParams(sp.toString());
    if (minVal !== PRICE_MIN) params.set('minPrice', String(minVal));
    else params.delete('minPrice');
    if (maxVal !== PRICE_MAX) params.set('maxPrice', String(maxVal));
    else params.delete('maxPrice');
    router.push(`/browse?${params.toString()}`);
  }

  function clearAll() {
    router.push('/browse');
  }

  return (
    <aside className="brut-card p-4 space-y-5 md:sticky md:top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-black">Filters</h3>
        <button
          onClick={clearAll}
          className="text-xs font-bold underline decoration-[2px] underline-offset-2"
        >
          Clear all
        </button>
      </div>

      {/* Price range slider */}
      <FilterGroup label="Price range">
        <div className="w-full px-0.5">
          <div className="flex justify-between text-xs font-extrabold mb-2">
            <span>₹{minVal.toLocaleString('en-IN')}</span>
            <span>₹{maxVal.toLocaleString('en-IN')}</span>
          </div>
          <DualRange
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            minVal={minVal}
            maxVal={maxVal}
            onMinChange={setMinVal}
            onMaxChange={setMaxVal}
            onRelease={applyPrice}
          />
          <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
            <span>₹{PRICE_MIN / 1000}k</span>
            <span>₹{PRICE_MAX / 1000}k</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup label="Brand">
        {['Canon', 'Epson', 'HP', 'Brother'].map((b) => (
          <Toggle
            key={b}
            active={filters.brand === b}
            onClick={() => pushParam('brand', filters.brand === b ? null : b)}
            label={b}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Type">
        {[
          ['ink-tank', 'Ink-Tank'],
          ['cartridge', 'Cartridge'],
          ['laser-mono', 'Laser B&W'],
        ].map(([val, label]) => (
          <Toggle
            key={val}
            active={filters.category === val}
            onClick={() => pushParam('category', filters.category === val ? null : val)}
            label={label}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Features">
        <Toggle
          active={filters.wifi === '1'}
          onClick={() => pushParam('wifi', filters.wifi === '1' ? null : '1')}
          label="Wi-Fi"
        />
        <Toggle
          active={filters.duplex === '1'}
          onClick={() => pushParam('duplex', filters.duplex === '1' ? null : '1')}
          label="Auto-Duplex"
        />
        <Toggle
          active={filters.colour === '1'}
          onClick={() => pushParam('colour', filters.colour === '1' ? null : '1')}
          label="Colour"
        />
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Toggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs font-bold border-[2px] rounded-md transition-all"
      style={{
        background: active ? 'var(--sun)' : 'var(--card)',
        borderColor: 'var(--ink)',
        boxShadow: active ? '3px 3px 0 var(--shadow)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function DualRange({
  min,
  max,
  step,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
  onRelease,
}: {
  min: number;
  max: number;
  step: number;
  minVal: number;
  maxVal: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
  onRelease: () => void;
}) {
  const leftPct = ((minVal - min) / (max - min)) * 100;
  const rightPct = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="relative py-4">
      <div className="range-track">
        <div
          className="range-fill"
          style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const v = Math.min(parseInt(e.target.value), maxVal - step);
          onMinChange(v);
        }}
        onMouseUp={onRelease}
        onTouchEnd={onRelease}
        className="range-input"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const v = Math.max(parseInt(e.target.value), minVal + step);
          onMaxChange(v);
        }}
        onMouseUp={onRelease}
        onTouchEnd={onRelease}
        className="range-input"
      />
    </div>
  );
}
