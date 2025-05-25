import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useCallback, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavBar } from '../components/Footer';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { Socials } from '../components/Socials';
import { Page, pages } from './pages';
import { PartyHistory } from './PartyHistory';

export const Landing = () => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [page, setPage] = useState(pages.initial);
  const [isAtStart, setIsAtStart] = useState(true);
  const lookAtRef = useRef(new Vector3(0, 0, 0));

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = page.camera.lookAt;
      const targetPosition = page.camera.position;

      lookAtRef.current.lerp(targetLookAt, delta * 3);
      camera.lookAt(lookAtRef.current);

      camera.position.lerp(targetPosition, delta * 3);
    });
    return null;
  };

  const moveToPage = useCallback((page: Page) => {
    if (isAtStart) setIsAtStart(false);
    setPage(page);
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
        <NextPartyPoster moveTo={moveToPage} />
        <Socials />
        {page.id === 'partyHistory' && <PartyHistory />}
      </Canvas>
      <NavBar moveTo={moveToPage} />
    </>
  );
};
