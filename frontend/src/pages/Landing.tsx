import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { appear } from '../animations';
import { NavBar } from '../components/nav';
import { Archive } from '../components/nav/Archive';
import { Back } from '../components/nav/Back';
import { Close } from '../components/nav/Close';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { Socials } from '../components/Socials';
import { Page, pages } from './pages';
import { PartyDetails } from './PartyDetails';
import { PartyHistory } from './PartyHistory';
import { isMobile } from 'react-device-detect';

const VerticalTitle = styled.h1`
  position: absolute;
  font-family: 'Bootzy';
  top: ${isMobile ? '25%' : '50%'};
  left: 0;
  font-size: 64px;
  margin-left: ${isMobile ? '12px' : '24px'};
  animation: ${appear} 1s ease-in-out;
  height: 40%;
  text-align: center;
  transform: translate(0, -50%);
  writing-mode: vertical-rl;
`;

const VerticalLocation = styled.h2`
  position: absolute;
  font-family: 'Bootzy';
  top: ${isMobile ? '25%' : '50%'};
  right: 0;
  font-size: 36px;
  margin-right: ${isMobile ? '12px' : '24px'};
  animation: ${appear} 2s ease-in-out;
  height: 40%;
  text-align: center;
  transform: translate(0, -50%);
  writing-mode: vertical-lr;
`;

const EPSILON = 1;

export const Landing = ({ isAtSplash }: { isAtSplash: boolean }) => {
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const [pageStack, setPageStack] = useState([pages.initial]);
  const [page, setPage] = useState(pages.splash);
  const start = new Vector3(0, 0, 0);
  const lookAtRef = useRef(start);
  const [doneTransitioning, setDoneTransitioning] = useState(false);

  useEffect(() => {
    if (!isAtSplash) {
      setPage(pages.initial);
    } else {
      setPage(pages.splash);
    }
  }, [isAtSplash]);

  const CameraController = () => {
    useFrame(({ camera }, delta) => {
      if (doneTransitioning && isAtSplash) {
        return;
      }
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
    [pageStack, page],
  );

  const goBack = useCallback(() => {
    const copiedStack = [...pageStack];
    copiedStack.pop();
    setPage(copiedStack[copiedStack.length - 1] || pages.initial);
    setPageStack(copiedStack);
  }, [pageStack]);

  return (
    <>
      <Canvas camera={{ position: [20, 50, 0] }}>
        <CameraController />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          autoRotate={isAtSplash}
          enableZoom={false}
          enablePan={page.id !== 'partyHistory'}
          enableRotate={page.id !== 'partyHistory'}
          autoRotateSpeed={0.6}
        />
        <primitive position={[0, 0, 0]} object={gltf.scene} />
        <NextPartyPoster moveTo={moveToPage} currentPage={page} />
        <Socials />
        {page.id === 'partyHistory' && (
          <PartyHistory doneTransitioning={doneTransitioning} />
        )}
        {page.id === 'partyDetails' && <PartyDetails />}
      </Canvas>
      {page.id === 'initial' && <VerticalTitle>ADR</VerticalTitle>}
      {page.id === 'initial' && <VerticalLocation>Garden</VerticalLocation>}
      {!isAtSplash && <NavBar currentPage={page} moveTo={moveToPage} />}
      {page.id !== 'splash' && (
        <>
          {page.id !== 'initial' && <Close moveTo={moveToPage} />}
          {page.id !== 'initial' && <Back goBack={goBack} />}
        </>
      )}
      {page.id === 'partyDetails' && <Archive moveTo={moveToPage} />}
    </>
  );
};
