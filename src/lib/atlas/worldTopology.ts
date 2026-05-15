import type { FeatureCollection } from 'geojson';
import { feature } from 'topojson-client';
// 110m world topology (~100KB). Build-time JSON import; bundled into output.
import worldAtlas from 'world-atlas/countries-110m.json';

let cached: FeatureCollection | null = null;

// Returns the country polygons as GeoJSON. Memoized for the lifetime of the
// build worker so repeated calls during SSR don't re-run the conversion.
export function getLandFeatures(): FeatureCollection {
  if (cached) return cached;
  // world-atlas ships data only with no bundled types — cast through unknown.
  const topo = worldAtlas as unknown as Parameters<typeof feature>[0];
  cached = feature(topo, topo.objects.countries) as FeatureCollection;
  return cached;
}
