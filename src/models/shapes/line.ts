import { Point3D } from './point';

export default class Line {
  private _p1: Point3D;
  private _p2: Point3D;

  public get p2(): Point3D {
    return this._p2;
  }
  public get p1(): Point3D {
    return this._p1;
  }

  constructor(p1: Point3D, p2: Point3D) {
    this._p1 = p1;
    this._p2 = p2;
  }
}