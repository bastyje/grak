import { Polygon } from './polygon';
import { Point3D } from './point';

export default class FilledRectangle extends Polygon {
  constructor(startingPoint: Point3D, width: number, height: number) {
    const points = new Array<Point3D>(4);
    points.push(new Point3D(startingPoint.x, startingPoint.y, startingPoint.z));
    points.push(new Point3D(startingPoint.x + width, startingPoint.y, startingPoint.z));
    points.push(new Point3D(startingPoint.x + width, startingPoint.y + height, startingPoint.z));
    points.push(new Point3D(startingPoint.x, startingPoint.y + height, startingPoint.z));

    super(points);
  }
}