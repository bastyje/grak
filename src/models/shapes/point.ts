import toRadians from '../../math/to-radians';

export class Point2D {
  private readonly _x: number;
  private readonly _y: number;

  public get y(): number { return this._y; }
  public get x(): number { return this._x; }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}

export class Point3D {
  private _x: number;
  private _y: number;
  private _z: number;

  private _angleX: number = 0;
  private _angleY: number = 0;
  private _angleZ: number = 0;

  private _realX: number;
  private _realY: number;
  private _realZ: number;


  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get z(): number { return this._z; }

  constructor(x: number, y: number, z: number) {
    this._x = this._realX = x;
    this._y = this._realY = y;
    this._z = this._realZ = z;
  }

  public translate(x: number, y: number, z: number): void {
    this._x += x;
    this._y += y;
    this._z += z;
    this._realX = this._x;
    this._realY = this._y;
    this._realZ = this._z;
  }

  public rotateX(angle: number): void {
    this._angleX += angle;
    angle = toRadians(this._angleX);
    this._y = this._realY * Math.cos(angle) - this._realZ * Math.sin(angle);
    this._z = this._realY * Math.sin(angle) + this._realZ * Math.cos(angle);
  };

  public rotateY(angle: number): void {
    this._angleY += angle;
    angle = toRadians(this._angleY);
    this._x = this._realX * Math.cos(angle) + this._realZ * Math.sin(angle);
    this._z = this._realZ * Math.cos(angle) - this._realX * Math.sin(angle);
  };

  public rotateZ(angle: number): void {
    this._angleZ += angle;
    angle = toRadians(this._angleZ);
    this._x = this._realX * Math.cos(angle) - this._realY * Math.sin(angle);
    this._y = this._realX * Math.sin(angle) + this._realY * Math.cos(angle);
  };
}