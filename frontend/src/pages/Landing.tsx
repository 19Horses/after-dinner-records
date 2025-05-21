import { OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { cameraPositions } from './cameraPositions';
import { NextPartyPoster } from '../components/NextPartyPoster';

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
        <NextPartyPoster />
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
