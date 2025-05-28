import { ThreeEvent, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Poster = ({ src }: { src: string }) => {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? 'crosshair' : 'auto';
  }, [hovered]);

  const url = useMemo(() => `${import.meta.env.VITE_STRAPI_URL}${src}`, [src]);

  const texture = useLoader(THREE.TextureLoader, url);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  const [triggerSpin, setTriggerSpin] = useState(false);
  const velocity = useRef(0);
  const damping = 0.98;
  const swaySpeed = 0.3;
  const swayAmplitude = 0.3;
  const clock = useRef(new THREE.Clock());

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = clock.current.getElapsedTime();

    if (triggerSpin) {
      mesh.rotation.y += velocity.current;
      velocity.current *= damping;

      if (Math.abs(velocity.current) < 0.001) {
        setTriggerSpin(false);
        velocity.current = 0;
      }
    } else {
      mesh.rotation.y = Math.sin(time * swaySpeed) * swayAmplitude;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const meshWorldPos = new THREE.Vector3();
    mesh.getWorldPosition(meshWorldPos);

    const clickX = e.point.x;
    const direction = clickX < meshWorldPos.x ? -1 : 1;

    velocity.current = 0.5 * direction;
    setTriggerSpin(true);
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
      scale={[3, 3, 3]}
    >
      <planeGeometry args={[1.3, 1.3]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
