import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useCallback, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavBar } from '../components/Footer';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { CameraPosition, cameraPositions } from './cameraPositions';
import { Socials } from '../components/Socials';
import { Vector3 } from 'three';

export const Landing = () => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [cameraPosition, setCameraPosition] = useState(cameraPositions.initial);
  const [isAtStart, setIsAtStart] = useState(true);
  const lookAtRef = useRef(new Vector3(0, 0, 0));

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = cameraPosition.lookAt;
      const targetPosition = cameraPosition.position;

      lookAtRef.current.lerp(targetLookAt, delta * 3);
      camera.lookAt(lookAtRef.current);

      camera.position.lerp(targetPosition, delta * 3);
    });
    return null;
  };

  const moveTo = useCallback((newCamera: CameraPosition) => {
    if (isAtStart) setIsAtStart(false);
    setCameraPosition(newCamera);
  }, []);

  return (
    <>
      <Canvas camera={{ position: [-20, -20, -20] }}>
        <CameraController />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={isAtStart}
          enableRotate={isAtStart}
        />
        <primitive position={[0, 0, 0]} object={gltf.scene} />
        <NextPartyPoster />
        <Socials />
      </Canvas>
      <NavBar moveTo={moveTo} />
    </>
  );
};
