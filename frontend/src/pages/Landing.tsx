import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
// eslint-disable-next-line import/named
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { appear } from '../animations';
import { NextPartyPoster } from '../components/NextPartyPoster';
import { PartyType } from '../queries/useGetParties';
import { SocialType } from '../queries/useGetSocials';
import { Page, pages } from '.';
import { PartyDetails } from './PartyDetails';
import { PartyHistory } from './PartyHistory';
import { Socials } from './Socials';
import { Menu } from '../components/menu/new';

const VerticalTitle = styled.h1`
  position: absolute;
  font-family: 'Bootzy';
  top: 0;
  left: 0;
  font-size: 36px;
  margin: 24px;
  transition: all 0.3s ease-in-out;
  animation: ${appear} 0.3s ease-in-out;
  text-align: center;

  @media (max-width: 768px) {
    margin: 12px;
  }

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const VerticalLocation = styled.h1`
  position: absolute;
  font-family: 'Bootzy';
  top: 0;
  right: 0;
  font-size: 36px;
  margin: 24px;
  transition: all 0.3s ease-in-out;
  animation: ${appear} 0.3s ease-in-out;
  text-align: center;

  @media (max-width: 768px) {
    margin: 12px;
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
        <primitive
          onClick={() => {
            if (page.id === 'initial') {
              return moveToPage(pages.nextParty);
            }
          }}
          position={[0, 0, 0]}
          object={gltf.scene}
        />
        <NextPartyPoster
          nextParty={nextParty}
          moveTo={moveToPage}
          currentPage={page}
        />
        <Socials socials={socials} />
        {page.id === 'partyDetails' && (
          <PartyDetails
            doneTransitioning={doneTransitioning}
            party={nextParty}
          />
        )}
      </Canvas>
      {page.id === 'partyHistory' && (
        <PartyHistory doneTransitioning={doneTransitioning} />
      )}
      {page.id !== 'splash' && <Menu moveTo={moveToPage} currentPage={page} />}
      {page.id !== 'splash' && (
        <VerticalTitle onClick={() => moveToPage(pages.initial)}>
          ADR
        </VerticalTitle>
      )}
      {page.id !== 'splash' && <VerticalLocation>Garden</VerticalLocation>}
    </>
  );
};
