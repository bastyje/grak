import Camera from '../models/camera';
import Tab from '../enums/tab.enum';
import Cuboid from '../models/shapes/cuboid';
import { Point3D } from '../models/shapes/point';
import WorldSpace from '../models/world-space';
import registerEvents from './register-events';
import setSize from '../display/set-size';
import FilledCuboid from '../models/shapes/filled-cuboid';
import FilledRectangle from '../models/shapes/filled-rectangle';

export default function changeTab(canvas: HTMLCanvasElement, tab: Tab): void {
  const context = canvas.getContext('2d');

  if (context) {
    switch (tab) {
      case Tab.VirtualCamera:
        const world1 = new WorldSpace();
        world1.add(new Cuboid(new Point3D(110, 200, 300), 100, 100, 100));
        world1.add(new Cuboid(new Point3D(110, 200, 420), 100, 50, 100));
        world1.add(new Cuboid(new Point3D(-10, 200, 300), 100, 200, 100));
        world1.add(new Cuboid(new Point3D(-10, 200, 420), 100, 100, 100));

        const camera1 = new Camera(world1, context);
        setSize(canvas, camera1);
        // registerEvents(camera1, canvas);
        camera1.draw()
        break;
      case Tab.ObjectClipping:
        const world2 = new WorldSpace();
        const camera2 = new Camera(world2, context);

        world2.add(new FilledCuboid(new Point3D(110, 200, 300), 100, 100, 100, 'red', 'red'));
        world2.add(new FilledCuboid(new Point3D(110, 200, 420), 100, 50, 100, 'green', 'green'));
        world2.add(new FilledCuboid(new Point3D(-10, 200, 300), 100, 200, 100, 'blue', 'blue'));
        world2.add(new FilledCuboid(new Point3D(-10, 200, 420), 100, 100, 100));


        setSize(canvas, camera2);
        registerEvents(camera2, canvas);

        camera2.drawSurfaces();
        break;
      case Tab.SurfaceDisplay:
        break;
    }
  }
}