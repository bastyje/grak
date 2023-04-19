import Key from "../enums/key.enum";
import Camera from '../models/camera';

export let Quantum: number = 10;
export let QuantumAngle: number = 5;

export function keydown(e: KeyboardEvent, camera: Camera): void {
  switch (e.code) {
    case Key.W:
      camera.rotateX(-QuantumAngle);
      break;
    case Key.S:
      camera.rotateX(QuantumAngle);
      break;
    case Key.D:
      camera.rotateY(-QuantumAngle);
      break;
    case Key.A:
      camera.rotateY(QuantumAngle);
      break;
    case Key.E:
      camera.rotateZ(-QuantumAngle);
      break;
    case Key.Q:
      camera.rotateZ(QuantumAngle);
      break;
    case Key.ArrowDown:
      camera.translate(0, -Quantum, 0);
      break;
    case Key.ArrowUp:
      camera.translate(0, Quantum, 0);
      break;
    case Key.ArrowRight:
      camera.translate(-Quantum, 0, 0);
      break;
    case Key.ArrowLeft:
      camera.translate(Quantum, 0, 0);
      break;
    case Key.X:
      camera.translate(0, 0, Quantum);
      break;
    case Key.Z:
      camera.translate(0, 0, -Quantum);
      break;
    case Key.Ctrl:
      if (Quantum === 1) Quantum = 10;
      else Quantum = 1;
      break;
  }
}