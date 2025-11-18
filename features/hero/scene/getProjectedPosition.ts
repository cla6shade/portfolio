import * as THREE from 'three';

interface PianoTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
}

interface CameraInfo {
  position: [number, number, number];
  fov: number;
}

interface ProjectedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getProjectedPosition(
  piano: PianoTransform,
  camera: CameraInfo,
  canvasWidth: number,
  canvasHeight: number,
): ProjectedRect {
  const tempCamera = new THREE.PerspectiveCamera(camera.fov, canvasWidth / canvasHeight, 0.1, 1000);
  tempCamera.position.set(...camera.position);
  tempCamera.lookAt(0, 0, 0);
  tempCamera.updateMatrixWorld();
  // tempCamera.updateProjectionMatrix();

  const [width, height, depth] = piano.size;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  const corners = [
    new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth),
    new THREE.Vector3(halfWidth, -halfHeight, -halfDepth),
    new THREE.Vector3(-halfWidth, halfHeight, -halfDepth),
    new THREE.Vector3(halfWidth, halfHeight, -halfDepth),
    new THREE.Vector3(-halfWidth, -halfHeight, halfDepth),
    new THREE.Vector3(halfWidth, -halfHeight, halfDepth),
    new THREE.Vector3(-halfWidth, halfHeight, halfDepth),
    new THREE.Vector3(halfWidth, halfHeight, halfDepth),
  ];

  const pianoMatrix = new THREE.Matrix4();
  pianoMatrix.makeRotationFromEuler(new THREE.Euler(...piano.rotation));
  pianoMatrix.setPosition(...piano.position);

  const projectedPoints = corners.map((corner) => {
    const worldPos = corner.clone().applyMatrix4(pianoMatrix);
    const ndcPos = worldPos.project(tempCamera);

    return {
      x: ((ndcPos.x + 1) / 2) * canvasWidth,
      y: ((-ndcPos.y + 1) / 2) * canvasHeight,
    };
  });

  const xs = projectedPoints.map((p) => p.x);
  const ys = projectedPoints.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
