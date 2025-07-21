import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { Page, pages } from '../pages/pages';
import { PartyType } from '../queries/useGetParties';

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
    if (currentPage.id !== 'partyDetails') {
      setMoving(true);
      setIsAtTarget(false);
      setMovingToTarget(false);
    } else if (currentPage.id === 'partyDetails' && !isAtTarget) {
      setMoving(false);
      setMovingToTarget(true);
    }
  }, [currentPage]);

  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, nextParty.poster.asset.url);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const targetScale =
      hovered && currentPage.id === 'nextParty'
        ? new THREE.Vector3(1.4, 1.4, 1.4)
        : new THREE.Vector3(1.2, 1.2, 1.2);
    mesh.scale.lerp(targetScale, 0.1);

    if (hovered && currentPage.id === 'nextParty') {
      const targetRotation = new THREE.Euler(0, 4, 0);
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        targetRotation.x,
        0.1
      );
      mesh.rotation.y = THREE.MathUtils.lerp(
        mesh.rotation.y,
        targetRotation.y,
        0.1
      );
      mesh.rotation.z = THREE.MathUtils.lerp(
        mesh.rotation.z,
        targetRotation.z,
        0.1
      );

      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      mesh.rotation.y = THREE.MathUtils.lerp(
        mesh.rotation.y,
        mouseX * 0.3,
        0.1
      );
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        -mouseY * 0.2,
        0.1
      );
    } else if (!hovered && currentPage.id !== 'partyDetails') {
      mesh.rotation.y = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    } else {
      mesh.rotation.y += delta * 0.5;
    }

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
