'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { lookupPincode, type LocationInfo } from '@/lib/pincodes';

const DEFAULT: LocationInfo = {
  pincode: '560076',
  city: 'Bangalore',
  state: 'Karnataka',
  zone: 'metro',
  deliveryEta: 'Same-day or next-day',
};

type Ctx = {
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  setByPincode: (pincode: string) => LocationInfo | null;
  detectLocation: () => Promise<LocationInfo | null>;
  detecting: boolean;
};

const LocationContext = createContext<Ctx>({
  location: DEFAULT,
  setLocation: () => {},
  setByPincode: () => null,
  detectLocation: async () => null,
  detecting: false,
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<LocationInfo>(DEFAULT);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pp-location');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.pincode) setLocationState(parsed);
      } catch {}
    }
  }, []);

  function persist(loc: LocationInfo) {
    setLocationState(loc);
    localStorage.setItem('pp-location', JSON.stringify(loc));
  }

  function setByPincode(pincode: string): LocationInfo | null {
    const info = lookupPincode(pincode);
    if (info) persist(info);
    return info;
  }

  async function detectLocation(): Promise<LocationInfo | null> {
    if (!('geolocation' in navigator)) return null;
    setDetecting(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });

      const { latitude, longitude } = pos.coords;

      // Nominatim (OpenStreetMap) reverse geocoder — free, no key
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      if (!res.ok) throw new Error('Reverse geocode failed');
      const data = await res.json();
      const postcode: string | undefined = data?.address?.postcode;
      const city: string | undefined =
        data?.address?.city ?? data?.address?.town ?? data?.address?.village ?? data?.address?.state_district;
      const state: string | undefined = data?.address?.state;

      if (postcode && /^\d{6}$/.test(postcode)) {
        const info = lookupPincode(postcode) ?? {
          pincode: postcode,
          city: city ?? 'India',
          state: state ?? '',
          zone: 'tier-3' as const,
          deliveryEta: '3–7 days',
        };
        // Prefer precise city from geocoder if we have one
        if (city) info.city = city;
        if (state) info.state = state;
        persist(info);
        return info;
      }
      return null;
    } catch (e) {
      return null;
    } finally {
      setDetecting(false);
    }
  }

  return (
    <LocationContext.Provider
      value={{ location, setLocation: persist, setByPincode, detectLocation, detecting }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
