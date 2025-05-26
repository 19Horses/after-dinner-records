import { Vector3 } from 'three';

export type CameraPosition = {
  lookAt: Vector3;
  position: Vector3;
};

export type Page = {
  id: string;
  name: string;
  camera: CameraPosition;
};

export const pages: { [key: string]: Page } = {
  initial: {
    id: 'initial',
    name: 'Home',
    camera: {
      lookAt: new Vector3(0, 0, 5),
      position: new Vector3(8, 12, 5),
    },
  },
  nextParty: {
    id: 'nextParty',
    name: 'Next Party',
    camera: {
      lookAt: new Vector3(-3.6, 0, 8.5),
      position: new Vector3(-1.4, 0, 7.5),
    },
  },
  partyHistory: {
    id: 'partyHistory',
    name: 'History',
    camera: {
      lookAt: new Vector3(-3, 10, 6),
      position: new Vector3(-2, 10, 4),
    },
  },
  socials: {
    id: 'socials',
    name: 'Socials',
    camera: {
      lookAt: new Vector3(-1, 0, 10.5),
      position: new Vector3(-1, 0, 8),
    },
  },
};
