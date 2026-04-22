import { NextResponse } from 'next/server';

// Served at /assetlinks (and rewritten from /.well-known/assetlinks.json via next.config.js).
// Android App Links verification for the FindPrinter TWA (package app.findprinter.in).
const PAYLOAD = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'app.findprinter.in',
      sha256_cert_fingerprints: [
        'B6:20:5E:35:14:14:7E:DB:A4:AC:AA:C0:7E:DF:99:19:13:41:32:B6:36:16:C2:B0:40:09:C3:91:FA:97:E8:91',
      ],
    },
  },
];

export function GET() {
  return NextResponse.json(PAYLOAD, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json',
    },
  });
}
