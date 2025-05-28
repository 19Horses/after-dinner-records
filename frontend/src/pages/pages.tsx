import { isMobile } from 'react-device-detect';
import { Vector3 } from 'three';

export type CameraPosition = {
  lookAt: Vector3;
  position: Vector3;
};

export type Page = {
  id: string;
  camera: CameraPosition;
};

export const pages: { [key: string]: Page } = {
  splash: {
    id: 'splash',
    camera: {
      lookAt: new Vector3(0, 0, 0),
      position: isMobile ? new Vector3(30, 18, 0) : new Vector3(20, 15, 0),
    },
  },
  initial: {
    id: 'initial',
    camera: {
      lookAt: new Vector3(0, 0, 0),
      position: isMobile ? new Vector3(18, 16, 0) : new Vector3(12, 8, 0),
    },
  },
  nextParty: {
    id: 'nextParty',
    camera: {
      lookAt: new Vector3(-3.6, 0, 8.5),
      position: new Vector3(-1.4, 0, 7.5),
    },
  },
  partyHistory: {
    id: 'partyHistory',
    camera: {
      lookAt: new Vector3(-3, 10, 6),
      position: new Vector3(-2, 10, 4),
    },
  },
  partyDetails: {
    id: 'partyDetails',
    camera: {
      lookAt: isMobile ? new Vector3(3, 10, 5.2) : new Vector3(3, 10, 5),
      position: new Vector3(3, 10, 3.4),
    },
  },
  socials: {
    id: 'socials',
    camera: {
      lookAt: new Vector3(-1, 0, 10.5),
      position: new Vector3(-1, 0, 8),
    },
  },
};
