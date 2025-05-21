import { OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const cameraPositions = {
  initial: {
    lookAt: new Vector3(0, 0, 0),
    position: new Vector3(15, 1, 2),
  },
  nextParty: {
    lookAt: new Vector3(-3.6, 0, 8.5),
    position: new Vector3(-2, 0, 6.5),
  },
};

export const Landing = () => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [doneTransitioning, setDoneTransitioning] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(cameraPositions.initial);
  const lookAtRef = useRef(cameraPositions.initial.lookAt);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = cameraPosition.lookAt;
      const targetPosition = cameraPosition.position;

      lookAtRef.current.lerp(targetLookAt, delta * 3);
      camera.lookAt(lookAtRef.current);

      if (doneTransitioning) {
        return;
      }
      camera.position.lerp(targetPosition, delta * 3);

      if (camera.position.distanceTo(targetPosition) < 0.05) {
        setDoneTransitioning(true);
      }
    });
    return null;
  };

  return (
    <>
      <Canvas camera={{ position: [-20, -20, -20] }}>
        <CameraController />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          enableZoom={false}
          // minPolarAngle={0}
          // maxPolarAngle={Math.PI / 2}
          // minAzimuthAngle={-Math.PI / 4}
          // maxAzimuthAngle={Math.PI / 4}
          enablePan={doneTransitioning}
          enableRotate={doneTransitioning}
        />
        <primitive position={[0, 0, 0]} object={gltf.scene} />
        <Sphere args={[1, 16, 16]} position={[0, 0, 0]} />
        <Sphere args={[1, 16, 16]} position={[-2, 0, 7]} />
      </Canvas>
      <button
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
        onClick={() => {
          setDoneTransitioning(false);
          setCameraPosition(cameraPositions.nextParty);
        }}
      >
        Next party
      </button>
    </>
  );
};
