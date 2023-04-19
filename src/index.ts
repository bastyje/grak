import WorldSpace from './models/world-space';
import Camera from './models/camera';
import { Point3D } from './models/shapes/point';
import registerEvents from './events/register-events';
import Cuboid from './models/shapes/cuboid';
import setSize from './display/set-size';



const canvas = document.getElementById('root') as HTMLCanvasElement;
if (canvas) {

  const context = canvas.getContext('2d');
  if (context) {
    const world = new WorldSpace();
    const camera = new Camera(world, context);

    setSize(canvas, camera);
    registerEvents(camera, canvas);

    world.add(new Cuboid(new Point3D(110, 200, 300), 100, 100, 100));
    world.add(new Cuboid(new Point3D(110, 200, 420), 100, 50, 100));
    world.add(new Cuboid(new Point3D(-10, 200, 300), 100, 200, 100));
    world.add(new Cuboid(new Point3D(-10, 200, 420), 100, 100, 100));

    camera.draw()
  }
}