import { Point3D } from '../models/shapes/point';

export default function pvmult(point: Point3D, vector: number[]): number {
  return vector[0] * point.x + vector[1] * point.y + vector[2] * point.z + vector[3];
}