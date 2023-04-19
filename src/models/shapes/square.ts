import { Point3D } from './point';
import Shape from '../interfaces/shape';
import Line from './line';

export default class Rectangle implements Shape {
  private readonly _lines: Line[];

  public get lines(): Line[] {
    return this._lines;
  }
  constructor(point: Point3D, x: number, y: number) {
    this._lines = [
      new Line(new Point3D(point.x, point.y, point.z), new Point3D(point.x + x, point.y, point.z)),
      new Line(new Point3D(point.x, point.y, point.z), new Point3D(point.x, point.y + y, point.z)),
      new Line(new Point3D(point.x + x, point.y, point.z), new Point3D(point.x + x, point.y + y, point.z)),
      new Line(new Point3D(point.x, point.y + y, point.z), new Point3D(point.x + x, point.y + y, point.z)),
    ];
  }
}