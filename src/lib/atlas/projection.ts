import {
  geoGraticule,
  geoNaturalEarth1,
  geoPath,
  type GeoPath,
  type GeoProjection,
  type GeoSphere,
} from 'd3-geo';
import type { MultiLineString } from 'geojson';

export const ATLAS_WIDTH = 680;
export const ATLAS_HEIGHT = 320;

const SPHERE: GeoSphere = { type: 'Sphere' };

export function makeProjection(
  width: number = ATLAS_WIDTH,
  height: number = ATLAS_HEIGHT,
): GeoProjection {
  return geoNaturalEarth1().fitSize([width, height], SPHERE);
}

export function makePathGenerator(projection: GeoProjection): GeoPath {
  return geoPath(projection);
}

// 30° spacing per docs/atlas-design.md §6 "Map → Graticule".
export function getGraticule(): MultiLineString {
  return geoGraticule().step([30, 30])() as MultiLineString;
}
