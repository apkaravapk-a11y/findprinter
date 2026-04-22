'use client';

import { useLocation } from './LocationProvider';

export function LocationDeliveryBlock() {
  const { location } = useLocation();
  return (
    <div className="brut-card p-4" style={{ background: 'var(--ash)' }}>
      <div className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
        Delivery to {location.city}
      </div>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span style={{ color: 'var(--muted)' }}>Pincode</span>
          <span className="font-extrabold">{location.pincode}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--muted)' }}>State</span>
          <span className="font-extrabold">{location.state || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--muted)' }}>ETA</span>
          <span className="font-extrabold">{location.deliveryEta}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--muted)' }}>Zone</span>
          <span className="font-extrabold capitalize">{location.zone}</span>
        </div>
      </div>
      <div className="text-[11px] mt-3" style={{ color: 'var(--muted)' }}>
        Tip: Amazon/Flipkart ETAs may vary. Click 📍 in the nav to change location.
      </div>
    </div>
  );
}
