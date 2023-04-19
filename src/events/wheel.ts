import Camera from '../models/camera';
import { Quantum } from './keyboard';

export default function wheel(e: WheelEvent, camera: Camera): void {
  if (e.deltaY > 0) camera.zoom(Quantum);
  else camera.zoom(-Quantum);
}