import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Landing = () => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [isZoomedOut, setIsZoomedOut] = useState(true);
  const [doneTransitioning, setDoneTransitioning] = useState(false);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = isZoomedOut
        ? new Vector3(0, 0, 0)
        : new Vector3(0, 1, 0);
      camera.lookAt(targetLookAt);

      if (doneTransitioning) {
        return;
      }
      const targetPosition = isZoomedOut
        ? new Vector3(10, 10, 10)
        : new Vector3(1, 1, 2);

      camera.position.lerp(targetPosition, delta * 3);
      if (camera.position.distanceTo(targetPosition) < 0.05) {
        setDoneTransitioning(true);
      }
    });
    return null;
  };

  return (
    <Canvas camera={{ position: [-20, -20, -20] }}>
      <CameraController />
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        enablePan={doneTransitioning}
        enableRotate={doneTransitioning}
      />
      <primitive position={[0, 0, 0]} object={gltf.scene} />
    </Canvas>
  );
};
