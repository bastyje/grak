import { Polygon } from '../models/shapes/polygon';

export default function getPlaneFromPolygon(polygon: Polygon): number[] {
  let x1 = polygon.points[0].x;
  let y1 = polygon.points[0].y;
  let z1 = polygon.points[0].z;

  let x2 = polygon.points[1].x;
  let y2 = polygon.points[1].y;
  let z2 = polygon.points[1].z;

  let x3 = polygon.points[2].x;
  let y3 = polygon.points[2].y;
  let z3 = polygon.points[2].z;

  let ux = x2 - x1;
  let uy = y2 - y1;
  let uz = z2 - z1;
  let vx = x3 - x1;
  let vy = y3 - y1;
  let vz = z3 - z1;

  let a = uy * vz - uz * vy;
  let b = uz * vx - ux * vz;
  let c = ux * vy - uy * vx;
  let d = (-a * x1 - b * y1 - c * z1);
  return [a, b, c, d];
}