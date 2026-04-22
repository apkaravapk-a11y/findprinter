'use client';

import { useState } from 'react';
import { useLocation } from './LocationProvider';
import { presetLocations, lookupPincode } from '@/lib/pincodes';

export function LocationBadge() {
  const { location } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border-[2px] rounded-lg text-xs font-bold hover:shadow-brutSm transition-all"
        style={{ background: 'var(--card)', borderColor: 'var(--ink)' }}
        title="Change delivery location"
      >
        <span>📍</span>
        <span className="hidden sm:inline">{location.city}</span>
        <span className="hidden md:inline font-normal" style={{ color: 'var(--muted)' }}>
          · {location.pincode}
        </span>
      </button>

      {open && <LocationModal onClose={() => setOpen(false)} />}
    </>
  );
}

function LocationModal({ onClose }: { onClose: () => void }) {
  const { location, setLocation, setByPincode, detectLocation, detecting } = useLocation();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submitPincode() {
    setError(null);
    const clean = input.replace(/\s/g, '');
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    const info = setByPincode(clean);
    if (!info) {
      setError('Pincode not recognised. Please try another.');
      return;
    }
    onClose();
  }

  async function handleDetect() {
    const result = await detectLocation();
    if (result) {
      onClose();
    } else {
      setError('Could not detect location. Please enter pincode manually.');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="brut-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-xl font-black">📍 Delivery location</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Affects delivery ETAs, service-centre info, and regional deals.
            </p>
          </div>
          <button onClick={onClose} className="text-2xl font-black" aria-label="Close">
            ×
          </button>
        </div>

        <div className="brut-card-sm p-3" style={{ background: 'var(--sun)' }}>
          <div className="text-[10px] font-extrabold uppercase tracking-widest">Current</div>
          <div className="font-black">
            {location.city}, {location.state || 'India'} — {location.pincode}
          </div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Delivery: {location.deliveryEta} · Zone: {location.zone}
          </div>
        </div>

        {/* Auto-detect */}
        <div className="mt-4">
          <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            Detect automatically
          </div>
          <button
            onClick={handleDetect}
            disabled={detecting}
            className="brut-btn w-full !py-3"
          >
            {detecting ? '🔄 Detecting…' : '📡 Use my precise location'}
          </button>
          <div className="text-[11px] mt-1" style={{ color: 'var(--muted)' }}>
            Uses browser geolocation + OpenStreetMap. Your location stays on this device.
          </div>
        </div>

        {/* Manual pincode */}
        <div className="mt-4">
          <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            Or enter a pincode
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="\d{6}"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^\d]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submitPincode()}
              placeholder="e.g. 560076"
              className="brut-input flex-1"
            />
            <button onClick={submitPincode} className="brut-btn !px-4">
              Set
            </button>
          </div>
          {error && (
            <div className="text-xs mt-2 font-bold" style={{ color: '#dc2626' }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="mt-5">
          <div className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            Or pick a metro
          </div>
          <div className="grid grid-cols-2 gap-2">
            {presetLocations.map((p) => (
              <button
                key={p.pincode}
                onClick={() => {
                  setLocation(p);
                  onClose();
                }}
                className="text-left p-2 border-[2px] rounded-md text-sm hover:shadow-brutSm transition-all"
                style={{
                  background: p.pincode === location.pincode ? 'var(--sun)' : 'var(--card)',
                  borderColor: 'var(--ink)',
                }}
              >
                <div className="font-extrabold">{p.city}</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                  {p.pincode} · {p.deliveryEta}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
