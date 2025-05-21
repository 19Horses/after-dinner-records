import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import nextPartyImg from '../assets/next-party.png';
import { cameraPositions } from '../pages/cameraPositions';

export const NextPartyPoster = () => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, nextPartyImg);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={cameraPositions.nextParty.lookAt}
      ref={meshRef}
    >
      <planeGeometry args={[1.3, 1.3]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
