import { Point2D, Point3D } from './shapes/point';
import WorldSpace from './world-space';
import Line from './shapes/line';
import Axis from '../enums/axis.enum';
import Shape from './interfaces/shape';
import { Polygon } from './shapes/polygon';
import PaintersAlgorithm from '../algorithms/painters-algorithm';

export default class Camera {
  private _worldSpace: WorldSpace;
  private readonly _context: CanvasRenderingContext2D;
  private _zoom: number = 600;

  constructor(worldSpace: WorldSpace, context: CanvasRenderingContext2D) {
    this._worldSpace = worldSpace;
    this._context = context;
  }

  public draw(): void {
    // this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    this._worldSpace.objects.forEach(object => {
      object.lines.forEach(line => {
        this.drawLine(line, this._context);
      });
    });
  }

  public drawSurfaces(): void {
    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    this._context.lineWidth = 2;
    this._context.lineCap = 'round';

    let polygons: Polygon[] = [];
    [...this._worldSpace.objects].forEach(object => {
      polygons.push(...object.polygons);
    });

    polygons.sort((a, b) => PaintersAlgorithm.compare(a, b, this.project));
    polygons.reverse();
    polygons.forEach(polygon => {
      this._context.strokeStyle = polygon.strokeColor;
      this._context.fillStyle = polygon.fillColor;
      this._context.beginPath();
      polygon.points.forEach((point, index) => {
        const p = this.project(point);
        if (index === 0) {
          this._context.moveTo(p.x, p.y)
        } else {
          this._context.lineTo(p.x, p.y)
        }
      });
      this._context.closePath();
      this._context.stroke();
      this._context.fill();
    });
  }

  private drawLine(line: Line, context: CanvasRenderingContext2D): void {
    if (line.p1.z > 0 && line.p2.z > 0) {
      const p1 = this.project(line.p1);
      const p2 = this.project(line.p2);

      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = 'white'

      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.closePath();
      context.stroke();
    }
  }

  public translate(x: number, y: number, z: number): void {
    this._worldSpace.objects.forEach(object => {
      object.lines.forEach(line => {
        line.p1.translate(x, y, z);
        line.p2.translate(x, y, z);
      });
      object.polygons.forEach(polygon => {
        polygon.points.forEach(point => {
          point.translate(x, y, z);
        });
      });
    });
    this.draw();
    this.drawSurfaces();
  }

  public rotateX(angle: number): void {
    this.rotate(angle, Axis.X);
    this.draw();
    this.drawSurfaces();
  }

  public rotateY(angle: number): void {
    this.rotate(angle, Axis.Y)
    this.draw();
    this.drawSurfaces();
  }

  public rotateZ(angle: number): void {
    this.rotate(angle, Axis.Z)
    this.draw();
    this.drawSurfaces();
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
      object.polygons.forEach(polygon => {
        polygon.points.forEach(point => {
          switch (axis) {
            case Axis.X:
              point.rotateX(angle);
              point.rotateX(angle);
              break;
            case Axis.Y:
              point.rotateY(angle);
              point.rotateY(angle);
              break;
            case Axis.Z:
              point.rotateZ(angle);
              point.rotateZ(angle);
              break;
          }
        })
      });
    });
  }

  public zoom(angle: number): void {
    if (this._zoom + angle > 0) {
      this._zoom += angle;
      this.draw();
      this.drawSurfaces();
    }
  }

  public project = (point: Point3D): Point2D => new Point2D(
    (point.x * this._zoom / (point.z)) + this._context.canvas.width / 2,
    (point.y * this._zoom / (point.z)) +this._context.canvas.height / 2
  );

  private sortShapes(): Shape[] {
    return [...this._worldSpace.objects].sort((a: Shape, b: Shape): number => {
      
      return 0;
    });
  }
}