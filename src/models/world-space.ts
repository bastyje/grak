import Shape from './interfaces/shape';

export default class WorldSpace {
  private _objects: Shape[] = [];

  public get objects(): Shape[] {
    return this._objects;
  }

  public add(object: Shape): void {
    this._objects.push(object);
  }
}