import Shape from '../interfaces/shape';
import Line from './line';
import { Point3D } from './point';
import { Polygon } from './polygon';

export default class Cuboid implements Shape {
  private readonly _lines: Line[];

  public get polygons(): Polygon[] {
    return [];
  }

  public get lines(): Line[] {
    return this._lines;
  }

  constructor(point: Point3D, x: number, y: number, z: number) {
    this._lines = [
      // front wall
      new Line(new Point3D(point.x, point.y, point.z), new Point3D(point.x - x, point.y, point.z)),
      new Line(new Point3D(point.x, point.y, point.z), new Point3D(point.x, point.y - y, point.z)),
      new Line(new Point3D(point.x - x, point.y, point.z), new Point3D(point.x - x, point.y - y, point.z)),
      new Line(new Point3D(point.x, point.y - y, point.z), new Point3D(point.x - x, point.y - y, point.z)),

      // rear wall
      new Line(new Point3D(point.x, point.y, point.z + z), new Point3D(point.x - x, point.y, point.z + z)),
      new Line(new Point3D(point.x, point.y, point.z + z), new Point3D(point.x, point.y - y, point.z + z)),
      new Line(new Point3D(point.x - x, point.y, point.z + z), new Point3D(point.x - x, point.y - y, point.z + z)),
      new Line(new Point3D(point.x, point.y - y, point.z + z), new Point3D(point.x - x, point.y - y, point.z + z)),

      // left wall
      new Line(new Point3D(point.x, point.y, point.z), new Point3D(point.x, point.y, point.z + z)),
      new Line(new Point3D(point.x, point.y - y, point.z), new Point3D(point.x, point.y - y, point.z + z)),

      // right wall
      new Line(new Point3D(point.x - x, point.y, point.z), new Point3D(point.x - x, point.y, point.z + z)),
      new Line(new Point3D(point.x - x, point.y - y, point.z), new Point3D(point.x - x, point.y - y, point.z + z)),
    ];
  }
}