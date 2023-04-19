import { Point2D, Point3D } from './shapes/point';
import WorldSpace from './world-space';
import Line from './shapes/line';
import Axis from '../enums/axis.enum';

export default class Camera {
  private _worldSpace: WorldSpace;
  private readonly _context: CanvasRenderingContext2D;
  private _zoom: number = 600;

  constructor(worldSpace: WorldSpace, context: CanvasRenderingContext2D) {
    this._worldSpace = worldSpace;
    this._context = context;
  }

  public draw(): void {
    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    this._worldSpace.objects.forEach(object => {
      object.lines.forEach(line => {
        this.drawLine(line, this._context);
      });
    });
  }

  private drawLine(line: Line, context: CanvasRenderingContext2D): void {
    if (line.p1.z > 0 && line.p2.z > 0) {
      const p1 = this.project(line.p1);
      const p2 = this.project(line.p2);

      console.log(line.p1, line.p2);

      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = 'white'

      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.stroke();
    }
  }

  public translate(x: number, y: number, z: number): void {
    this._worldSpace.objects.forEach(object => {
      object.lines.forEach(line => {
        line.p1.translate(x, y, z);
        line.p2.translate(x, y, z);
      });
    });
    this.draw();
  }

  public rotateX(angle: number): void {
    this.rotate(angle, Axis.X);
    this.draw();
  }

  public rotateY(angle: number): void {
    this.rotate(angle, Axis.Y)
    this.draw();
  }

  public rotateZ(angle: number): void {
    this.rotate(angle, Axis.Z)
    this.draw();
  }

  private rotate(angle: number, axis: Axis): void {
    this._worldSpace.objects.forEach(object => {
      object.lines.forEach(line => {
        switch (axis) {
          case Axis.X:
            line.p1.rotateX(angle);
            line.p2.rotateX(angle);
            break;
          case Axis.Y:
            line.p1.rotateY(angle);
            line.p2.rotateY(angle);
            break;
          case Axis.Z:
            line.p1.rotateZ(angle);
            line.p2.rotateZ(angle);
            break;
        }
      });
    });
  }

  public zoom(angle: number): void {
    if (this._zoom + angle > 0) {
      this._zoom += angle;
      this.draw();
    }
  }

  private project = (point: Point3D): Point2D => new Point2D(
      (point.x * this._zoom / (point.z)) + this._context.canvas.width / 2,
      (point.y * this._zoom / (point.z)) +this._context.canvas.height / 2
  );
}