import { Polygon, Polygon2D } from '../models/shapes/polygon';
import { Point2D, Point3D } from '../models/shapes/point';
import pvmult from '../math/pvmult';
import getPlaneFromPolygon from '../math/get-plane-from-polygon';

export default class PaintersAlgorithm {
  private static COMPARE_SMALLER = 1;
  private static COMPARE_BIGGER = -1;

  public static compare(polygon1: Polygon, polygon2: Polygon, projectionFunction: (point: Point3D) => Point2D, secondRun: boolean = false): number {
    if (this.excludeBoundInterference(polygon1.project(projectionFunction), polygon2.project(projectionFunction))) {
      console.log(`excludeBoundInterference ${secondRun}`);
      return secondRun ? this.COMPARE_BIGGER : this.COMPARE_SMALLER;
    }
    if (this.excludeInterference(polygon1.project(projectionFunction), polygon2.project(projectionFunction))) {
      console.log(`excludeInterference ${secondRun}`);
      return secondRun ? this.COMPARE_BIGGER : this.COMPARE_SMALLER;
    }
    if (this.areAllPointsOnOppositeSide(polygon1, polygon2)) {
      console.log(`areAllPointsOnOppositeSide ${secondRun}`);
      return secondRun ? this.COMPARE_BIGGER : this.COMPARE_SMALLER;
    }
    if (this.areAllPointsOnObserverSide(polygon2, polygon1)) {
      console.log(`areAllPointsOnObserverSide ${secondRun}`);
      return secondRun ? this.COMPARE_BIGGER : this.COMPARE_SMALLER;
    }
    if (secondRun) console.log('nothing');
    return secondRun ? this.COMPARE_BIGGER : this.compare(polygon2, polygon1, projectionFunction, true);
  }

  public static excludeBoundInterference(polygon1: Polygon2D, polygon2: Polygon2D): boolean {
    return !this.intersect(this.getBounds(polygon1), this.getBounds(polygon2));
  }

  public static excludeInterference(polygon1: Polygon2D, polygon2: Polygon2D): boolean {
    return !this.intersect(polygon1, polygon2);
  }

  public static areAllPointsOnOppositeSide(polygon1: Polygon, polygon2: Polygon): boolean {
    const plane = getPlaneFromPolygon(polygon1);
    return polygon2.points.every(point => this.isPointOnOppositeSide(point, plane));
  }

  public static isPointOnOppositeSide(point: Point3D, plane: number[]): boolean {
    return pvmult(point, plane) * pvmult(new Point3D(0, 0, 0), plane) >= 0;
  }

  public static areAllPointsOnObserverSide(polygon1: Polygon, polygon2: Polygon): boolean {
    const plane = getPlaneFromPolygon(polygon1);
    return polygon2.points.every(point => this.isPointOnObserverSide(point, plane));
  }

  public static isPointOnObserverSide(point: Point3D, plane: number[]): boolean {
    return pvmult(point, plane) * pvmult(new Point3D(0, 0, 0), plane) < 0;
  }

  private static intersect(polygon1: Polygon2D, polygon2: Polygon2D): boolean {
    return polygon2.points.some(point => polygon1.contains(point))
      || polygon1.points.some(point => polygon2.contains(point));
  }

  private static getBounds(polygon: Polygon2D): Polygon2D {
    let left = Number.MAX_VALUE;
    let top = Number.MIN_VALUE;
    let right = Number.MIN_VALUE;
    let bottom = Number.MAX_VALUE;

    for (let point of polygon.points) {
      left = Math.min(left, point.x);
      top = Math.max(top, point.y);
      right = Math.max(right, point.x);
      bottom = Math.min(bottom, point.y);
    }
    return new Polygon2D([
      new Point2D(left, top),
      new Point2D(right, top),
      new Point2D(right, bottom),
      new Point2D(left, bottom)
    ]);
  }
}
