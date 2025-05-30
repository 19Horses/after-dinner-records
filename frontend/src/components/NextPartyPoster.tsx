import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { Page, pages } from '../pages/pages';
import { PartyType } from '../queries/useGetParties';
import { getImageDownloadUrl } from '../strapiIntegration';

const TARGET = isMobile
  ? new THREE.Vector3(
      pages.partyDetails.camera.lookAt.x,
      pages.partyDetails.camera.lookAt.y + 0.5,
      pages.partyDetails.camera.lookAt.z + 0.5
    )
  : new THREE.Vector3(
      pages.partyDetails.camera.lookAt.x + 1,
      pages.partyDetails.camera.lookAt.y,
      pages.partyDetails.camera.lookAt.z + 0.5
    );
export const NextPartyPoster = ({
  currentPage,
  moveTo,
  nextParty,
}: {
  currentPage: Page;
  moveTo: (newCamera: Page) => void;
  nextParty: PartyType;
}) => {
  const [hovered, setHovered] = useState(false);
  const [movingToTarget, setMovingToTarget] = useState(false);
  const [moving, setMoving] = useState(false);
  const [targetPosition] = useState(TARGET);
  const [isAtTarget, setIsAtTarget] = useState(false);

  const meshPosition = useRef<THREE.Vector3>(
    new THREE.Vector3(...pages.nextParty.camera.lookAt)
  );

  useEffect(() => {
    if (currentPage.id !== 'partyDetails' && isAtTarget) {
      setMoving(true);
      setIsAtTarget(false);
    } else if (currentPage.id === 'partyDetails' && !isAtTarget) {
      setMovingToTarget(true);
    }
  }, [currentPage]);

  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const url = useMemo(
    () => getImageDownloadUrl(nextParty.poster.url),
    [nextParty.poster.url]
  );

  const texture = useLoader(THREE.TextureLoader, url);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += delta * 0.5;

      if (movingToTarget) {
        const current = mesh.position;
        current.lerp(targetPosition, delta * 3);

        if (current.distanceTo(targetPosition) < 0.01) {
          mesh.position.copy(targetPosition);
          setMovingToTarget(false);
          setIsAtTarget(true);
        }
      }

      if (moving) {
        const current = mesh.position;
        const initialPos = meshPosition.current;
        current.lerp(initialPos, delta * 3);

        if (current.distanceTo(initialPos) < 0.01) {
          mesh.position.copy(initialPos);
          setMoving(false);
        }
      }
    }
  });

  const handleClick = () => {
    if (!moving && meshRef.current) {
      setMovingToTarget(true);
    }
    moveTo(pages.partyDetails);
  };

  return (
    <mesh
      ref={meshRef}
      position={meshPosition.current}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <planeGeometry args={[0.8, 1.2]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
