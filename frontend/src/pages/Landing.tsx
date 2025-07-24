import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
// eslint-disable-next-line import/named
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { appear } from '../animations';
import { Menu } from '../components/menu';
import { Archive } from '../components/nav/Archive';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { PartyType } from '../queries/useGetParties';
import { SocialType } from '../queries/useGetSocials';
import { Page, pages } from './pages';
import { PartyDetails } from './PartyDetails';
import { PartyHistory } from './PartyHistory';
import { Socials } from './Socials';

const VerticalTitle = styled.h1`
  position: absolute;
  font-family: 'Bootzy';
  top: 50%;
  left: 0;
  font-size: 64px;
  margin-left: 24px;
  transition: all 0.5s ease-in-out;
  animation: ${appear} 1s ease-in-out;
  height: 40%;
  text-align: center;
  transform: translate(0, -50%);
  writing-mode: vertical-rl;

  @media (max-width: 768px) {
    top: 25%;
    margin-left: 12px;
  }
`;

const VerticalLocation = styled.h2`
  position: absolute;
  font-family: 'Bootzy';
  top: 50%;
  right: 0;
  font-size: 36px;
  margin-right: 24px;
  transition: all 0.5s ease-in-out;
  animation: ${appear} 2s ease-in-out;
  height: 40%;
  text-align: center;
  transform: translate(0, -50%) rotateX(180deg) scaleX(-1);
  writing-mode: vertical-lr;

  @media (max-width: 768px) {
    top: 25%;
    margin-right: 12px;
  }
`;

const EPSILON = 1;

export const Landing = ({
  isAtSplash,
  gltf,
  nextParty,
  socials,
}: {
  isAtSplash: boolean;
  gltf: GLTF;
  nextParty: PartyType;
  socials: SocialType[];
}) => {
  const [page, setPage] = useState(pages.splash);
  const lookAtRef = useRef(pages.splash.camera.lookAt);
  const [doneTransitioning, setDoneTransitioning] = useState(false);

  useEffect(() => {
    if (!isAtSplash) {
      setPage(pages.initial);
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
      setDoneTransitioning(false);
      setPage(page);
    },
    [page]
  );

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
          autoRotateSpeed={0.9}
        />
        <primitive position={[0, 0, 0]} object={gltf.scene} />
        <NextPartyPoster
          nextParty={nextParty}
          moveTo={moveToPage}
          currentPage={page}
        />
        <Socials socials={socials} />
        {page.id === 'partyHistory' && (
          <PartyHistory doneTransitioning={doneTransitioning} />
        )}
        {page.id === 'partyDetails' && <PartyDetails party={nextParty} />}
      </Canvas>
      {page.id === 'initial' && <VerticalTitle>ADR</VerticalTitle>}
      {page.id === 'initial' && <VerticalLocation>Garden</VerticalLocation>}
      {page.id !== 'splash' && <Menu moveTo={moveToPage} />}
      {page.id === 'partyDetails' && <Archive moveTo={moveToPage} />}
    </>
  );
};
