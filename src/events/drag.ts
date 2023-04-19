import Camera from '../models/camera';

let down = false;

export function mousedown(): void {
  down = true;
}

export function mouseup(): void {
  down = false;
}

export function mousemove(e: MouseEvent, camera: Camera): void {
  // if (down) camera.rotate(e.movementX * 10, e.movementY * 10, 0);
}