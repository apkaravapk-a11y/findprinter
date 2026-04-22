// Minimal India pincode → {city, state, zone} map for common metros + tier-2.
// First 3 digits of an Indian pincode map to a postal zone; we use that as a fallback.

export type LocationInfo = {
  pincode: string;
  city: string;
  state: string;
  zone: 'metro' | 'tier-2' | 'tier-3';
  deliveryEta: string; // Amazon/Flipkart ETA description
};

const cityByPrefix: Record<string, { city: string; state: string; zone: 'metro' | 'tier-2' | 'tier-3' }> = {
  '110': { city: 'Delhi', state: 'Delhi', zone: 'metro' },
  '111': { city: 'Delhi', state: 'Delhi', zone: 'metro' },
  '112': { city: 'Delhi NCR', state: 'Delhi', zone: 'metro' },
  '122': { city: 'Gurugram', state: 'Haryana', zone: 'metro' },
  '201': { city: 'Noida', state: 'Uttar Pradesh', zone: 'metro' },
  '400': { city: 'Mumbai', state: 'Maharashtra', zone: 'metro' },
  '401': { city: 'Mumbai', state: 'Maharashtra', zone: 'metro' },
  '411': { city: 'Pune', state: 'Maharashtra', zone: 'metro' },
  '500': { city: 'Hyderabad', state: 'Telangana', zone: 'metro' },
  '501': { city: 'Hyderabad', state: 'Telangana', zone: 'metro' },
  '560': { city: 'Bangalore', state: 'Karnataka', zone: 'metro' },
  '600': { city: 'Chennai', state: 'Tamil Nadu', zone: 'metro' },
  '700': { city: 'Kolkata', state: 'West Bengal', zone: 'metro' },
  '380': { city: 'Ahmedabad', state: 'Gujarat', zone: 'metro' },
  '302': { city: 'Jaipur', state: 'Rajasthan', zone: 'tier-2' },
  '226': { city: 'Lucknow', state: 'Uttar Pradesh', zone: 'tier-2' },
  '160': { city: 'Chandigarh', state: 'Chandigarh', zone: 'tier-2' },
  '641': { city: 'Coimbatore', state: 'Tamil Nadu', zone: 'tier-2' },
  '695': { city: 'Thiruvananthapuram', state: 'Kerala', zone: 'tier-2' },
  '682': { city: 'Kochi', state: 'Kerala', zone: 'tier-2' },
  '751': { city: 'Bhubaneswar', state: 'Odisha', zone: 'tier-2' },
  '800': { city: 'Patna', state: 'Bihar', zone: 'tier-2' },
  '781': { city: 'Guwahati', state: 'Assam', zone: 'tier-2' },
};

export function lookupPincode(pincode: string): LocationInfo | null {
  const clean = pincode.replace(/\s/g, '');
  if (!/^\d{6}$/.test(clean)) return null;
  const prefix = clean.slice(0, 3);
  const hit = cityByPrefix[prefix];
  if (hit) {
    return {
      pincode: clean,
      ...hit,
      deliveryEta:
        hit.zone === 'metro'
          ? 'Same-day or next-day'
          : hit.zone === 'tier-2'
            ? '2–3 days'
            : '3–5 days',
    };
  }
  return {
    pincode: clean,
    city: 'India',
    state: '',
    zone: 'tier-3',
    deliveryEta: '3–7 days',
  };
}

export const presetLocations: LocationInfo[] = [
  { pincode: '560076', city: 'Bangalore', state: 'Karnataka', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '110001', city: 'Delhi', state: 'Delhi', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '500001', city: 'Hyderabad', state: 'Telangana', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '700001', city: 'Kolkata', state: 'West Bengal', zone: 'metro', deliveryEta: 'Same-day or next-day' },
  { pincode: '411001', city: 'Pune', state: 'Maharashtra', zone: 'metro', deliveryEta: 'Same-day or next-day' },
];
