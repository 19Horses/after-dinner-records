import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import spotifyImg from '../assets/spotify-logo.png';
import { pages } from '../pages/pages';

export const Socials = () => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, spotifyImg);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={pages.socials.camera.lookAt}
      ref={meshRef}
    >
      <circleGeometry args={[0.3, 128]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
