import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Social = ({ src, link }: { src: string; link: string }) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, src);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh) {
      const targetScale = hovered
        ? new THREE.Vector3(1.2, 1.2, 1.2)
        : new THREE.Vector3(1.1, 1.1, 1.1);
      mesh.scale.lerp(targetScale, 0.1);

      if (!hovered) {
        mesh.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      }
    }
  });

  return (
    <mesh
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      ref={meshRef}
      onClick={() => window.open(link)}
    >
      <circleGeometry args={[0.2, 128]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
