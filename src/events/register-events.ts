import Camera from '../models/camera';
import { keydown } from './keyboard';
import wheel from './wheel';
import { mousedown, mousemove, mouseup } from './drag';
import setSize from '../display/set-size';

export default function registerEvents(camera: Camera, canvas: HTMLCanvasElement): void {
  document.addEventListener('keydown', e => keydown(e, camera));
  document.addEventListener('wheel', e => wheel(e, camera));
  document.addEventListener('mousedown', _ => mousedown());
  document.addEventListener('mouseup', _ => mouseup());
  document.addEventListener('mousemove', (e) => mousemove(e, camera));
  window.addEventListener('resize', _ => setSize(canvas, camera));
  document.getElementById('virtual-camera')?.addEventListener('click', _ => {});
  document.getElementById('object-clipping')?.addEventListener('click', _ => {});
  document.getElementById('surface-display')?.addEventListener('click', _ => {});
}