import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import nextPartyImg from '../assets/next-party.png';
import { Page, pages } from '../pages/pages';

export const NextPartyPoster = ({
  moveTo,
}: {
  moveTo: (newCamera: Page) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, nextPartyImg);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const meshPosition = useRef<THREE.Vector3>(
    new THREE.Vector3(...pages.nextParty.camera.lookAt)
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = () => {
    moveTo(pages.partyHistory);
  };

  return (
    <mesh
      ref={meshRef}
      position={meshPosition.current}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
