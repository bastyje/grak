import Shape from '../interfaces/shape';
import Line from './line';
import { Polygon } from './polygon';
import { Point3D } from './point';

export default class FilledCuboid implements Shape {
  private _polygons: Polygon[];
  private readonly OFFSET: number = 1;

  public get lines(): Line[] {
    return [];
  }

  public get polygons(): Polygon[] {
    return this._polygons;
  }

  constructor(point: Point3D, x: number, y: number, z: number, fillColor: string = '#969696', strokeColor: string = '#969696') {
    this._polygons = [
      // front wall
      new Polygon([
        new Point3D(point.x, point.y, point.z - this.OFFSET),
        new Point3D(point.x - x, point.y, point.z - this.OFFSET),
        new Point3D(point.x - x, point.y - y, point.z - this.OFFSET),
        new Point3D(point.x, point.y - y, point.z - this.OFFSET)
      ], strokeColor, fillColor),
      // rear wall
      new Polygon([
        new Point3D(point.x, point.y, point.z + z + this.OFFSET),
        new Point3D(point.x - x, point.y, point.z + z + this.OFFSET),
        new Point3D(point.x - x, point.y - y, point.z + z + this.OFFSET),
        new Point3D(point.x, point.y - y, point.z + z + this.OFFSET)
      ], strokeColor, fillColor),
      // right wall
      new Polygon([
        new Point3D(point.x + this.OFFSET, point.y, point.z),
        new Point3D(point.x + this.OFFSET, point.y, point.z + z),
        new Point3D(point.x + this.OFFSET, point.y - y, point.z + z),
        new Point3D(point.x + this.OFFSET, point.y - y, point.z)
      ], strokeColor, fillColor),
      // left wall
      new Polygon([
        new Point3D(point.x - x - this.OFFSET, point.y, point.z),
        new Point3D(point.x - x - this.OFFSET, point.y, point.z + z),
        new Point3D(point.x - x - this.OFFSET, point.y - y, point.z + z),
        new Point3D(point.x - x - this.OFFSET, point.y - y, point.z)
      ], strokeColor, fillColor),
      // top wall
      new Polygon([
        new Point3D(point.x, point.y + this.OFFSET, point.z),
        new Point3D(point.x - x, point.y + this.OFFSET, point.z),
        new Point3D(point.x - x, point.y + this.OFFSET, point.z + z),
        new Point3D(point.x, point.y + this.OFFSET, point.z + z)
      ], strokeColor, fillColor),
      // bottom wall
      new Polygon([
        new Point3D(point.x, point.y - y - this.OFFSET, point.z),
        new Point3D(point.x - x, point.y - y - this.OFFSET, point.z),
        new Point3D(point.x - x, point.y - y - this.OFFSET, point.z + z),
        new Point3D(point.x, point.y - y - this.OFFSET, point.z + z)
      ], strokeColor, fillColor)
    ];
  }
}