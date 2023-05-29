import changeTab from './events/change-tab';
import Tab from './enums/tab.enum';


const canvas = document.getElementById('root') as HTMLCanvasElement;
if (canvas) {
  changeTab(canvas, Tab.VirtualCamera);

  (document.getElementById('virtual-camera') as HTMLButtonElement).addEventListener('click', () => {
    changeTab(canvas, Tab.VirtualCamera);
  });

  (document.getElementById('object-clipping') as HTMLButtonElement).addEventListener('click', () => {
    changeTab(canvas, Tab.ObjectClipping);
  });

  (document.getElementById('surface-display') as HTMLButtonElement).addEventListener('click', () => {
    changeTab(canvas, Tab.SurfaceDisplay);
  });
}