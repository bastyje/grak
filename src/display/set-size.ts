import Camera from '../models/camera';

const setSize = (canvas: HTMLCanvasElement, camera: Camera) => {
  const domRect = (document.getElementById('main') as HTMLElement).getBoundingClientRect();
  canvas.width = domRect.width;
  canvas.height = domRect.height;
  camera.draw();
};

export default setSize;