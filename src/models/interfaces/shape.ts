import Line from '../shapes/line';
import { Polygon } from '../shapes/polygon';

export default interface Shape {
  lines: Line[];
  polygons: Polygon[];
}