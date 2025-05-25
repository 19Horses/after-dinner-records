import { Vector3 } from 'three';

export type CameraPosition = {
  lookAt: Vector3;
  position: Vector3;
};

export const cameraPositions = {
  initial: {
    lookAt: new Vector3(0, 0, 0),
    position: new Vector3(15, 1, 2),
  },
  nextParty: {
    lookAt: new Vector3(-3.6, 0, 8.5),
    position: new Vector3(-1.4, 0, 7.5),
  },
  partyHistory: {
    lookAt: new Vector3(-3, 10, 6),
    position: new Vector3(-2, 10, 4),
  },
  socials: {
    lookAt: new Vector3(-1, 0, 10.5),
    position: new Vector3(-1, 0, 8),
  },
};
