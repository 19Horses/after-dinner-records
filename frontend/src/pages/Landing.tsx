import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useCallback, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavBar } from '../components/nav';
import { Back } from '../components/nav/Back';
import { CloseToHome } from '../components/nav/Close';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { Socials } from '../components/Socials';
import { Page, pages } from './pages';
import { PartyDetails } from './PartyDetails';
import { PartyHistory } from './PartyHistory';
import { Archive } from '../components/nav/Archive';

const EPSILON = 1;

export const Landing = () => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [pageStack, setPageStack] = useState([pages.initial]);
  const [page, setPage] = useState(pages.initial);
  const start = new Vector3(0, 0, 0);
  const lookAtRef = useRef(start);
  const [doneTransitioning, setDoneTransitioning] = useState(false);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      const targetLookAt = page.camera.lookAt;
      const targetPosition = page.camera.position;

      lookAtRef.current.lerp(targetLookAt, delta * 3);
      camera.lookAt(lookAtRef.current);
      camera.position.lerp(targetPosition, delta * 3);

      const positionDone = camera.position.distanceTo(targetPosition) < EPSILON;
      const lookAtDone = lookAtRef.current.distanceTo(targetLookAt) < EPSILON;

      if (positionDone && lookAtDone && !doneTransitioning) {
        setDoneTransitioning(true);
      }
    });

    return null;
  };

  const moveToPage = useCallback(
    (page: Page) => {
      console.log(page);
      setDoneTransitioning(false);
      setPage(page);
      setPageStack((prev) => [...prev, page]);
    },
    [pageStack, page]
  );

  const goBack = useCallback(() => {
    const copiedStack = [...pageStack];
    copiedStack.pop();
    setPage(copiedStack[copiedStack.length - 1] || pages.initial);
    setPageStack(copiedStack);
  }, [pageStack]);

  console.log(page);

  return (
    <>
      <Canvas camera={{ position: [20, 50, 0] }}>
        <CameraController />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} enablePan enableRotate />
        <primitive position={[0, 0, 0]} object={gltf.scene} />
        <NextPartyPoster moveTo={moveToPage} currentPage={page} />
        <Socials />
        {page.id === 'partyHistory' && (
          <PartyHistory doneTransitioning={doneTransitioning} />
        )}
        {page.id === 'partyDetails' && <PartyDetails />}
      </Canvas>
      <NavBar moveTo={moveToPage} />
      {page.id !== 'initial' && <CloseToHome moveTo={moveToPage} />}
      {page.id !== 'initial' && <Back goBack={goBack} />}
      {page.id === 'partyDetails' && <Archive moveTo={moveToPage} />}
    </>
  );
};
