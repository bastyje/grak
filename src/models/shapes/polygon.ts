import { Point2D, Point3D } from './point';
import pvmult from '../../math/pvmult';
import getPlaneFromPolygon from '../../math/get-plane-from-polygon';

export class Polygon2D {
  private readonly _points: Point2D[];

  public get points(): Point2D[] {
    return this._points;
  }

  constructor(points: Point2D[]) {
    this._points = points;
  }

  public contains(point: Point2D): boolean {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;

    for (let point of this._points) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }

    return (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY);
  }
}

export class Polygon {
  private readonly _points: Point3D[];
  private readonly _strokeColor: string;
  private readonly _fillColor: string;

  public get points(): Point3D[] {
    return this._points;
  }

  public get strokeColor(): string {
    return this._strokeColor;
  }

  public get fillColor(): string {
    return this._fillColor;
  }

  constructor(points: Point3D[], strokeColor: string = '#969696', fillColor: string = '#969696') {
    this._points = points;
    this._strokeColor = strokeColor;
    this._fillColor = fillColor;
  }

  public project(projectionFunction: (point: Point3D) => Point2D): Polygon2D {
    return new Polygon2D(this._points.map(point => projectionFunction(point)));
  }

  public static compare(p1: Polygon, p2: Polygon): number {
    let allFurther = true;
    for (const pt1 of p1._points) {
      for (const pt2 of p2._points) {
        if (pt1.z < pt2.z) allFurther = false;
      }
    }
    if (allFurther) return 1;

    allFurther = true;
    for (const pt1 of p1._points) {
      for (const pt2 of p2._points) {
        if (pt1.z > pt2.z) allFurther = false;
      }
    }
    if (allFurther) return -1;

    if (p1._points.some(point => !Polygon.isPointVisible(p2, point))) return -1;
    if (p2._points.some(point => !Polygon.isPointVisible(p1, point))) return 1;
    return 1;
  }

  private static isPointVisible(polygon: Polygon, point: Point3D): boolean {
    let plane = getPlaneFromPolygon(polygon);
    return pvmult(point, plane) * pvmult(new Point3D(0, 0, 0), plane) <= 0;
  }
}