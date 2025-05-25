import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import nextPartyImg from '../assets/next-party.png';
import { CameraPosition, cameraPositions } from '../pages/cameraPositions';

const positionToMoveTo = cameraPositions.partyHistory.lookAt;

export const NextPartyPoster = ({
  moveTo,
}: {
  moveTo: (newCamera: CameraPosition) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const texture = useLoader(THREE.TextureLoader, nextPartyImg);
  const meshRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const meshPosition = useRef<THREE.Vector3>(
    new THREE.Vector3(...cameraPositions.nextParty.lookAt)
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;

      if (isMoving) {
        meshRef.current.position.lerp(
          new THREE.Vector3(...positionToMoveTo),
          0.05
        );

        if (
          meshRef.current.position.distanceTo(
            new THREE.Vector3(...positionToMoveTo)
          ) < 0.01
        ) {
          setIsMoving(false);
        }
      }
    }
  });

  const handleClick = () => {
    setIsMoving(true);
    moveTo(cameraPositions.partyHistory);
  };

  return (
    <mesh
      ref={meshRef}
      position={meshPosition.current}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <planeGeometry args={[1.3, 1.3]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
