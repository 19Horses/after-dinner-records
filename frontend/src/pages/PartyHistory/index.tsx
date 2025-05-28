import { Html } from '@react-three/drei';
import { useState } from 'react';
import { pages } from '../pages';
import { Party } from './Party';
import { parties, PartyType } from './parties';
import { Container } from './styles';
import { isMobile } from 'react-device-detect';

export const PartyHistory = ({
  doneTransitioning,
}: {
  doneTransitioning: boolean;
}) => {
  const sortedParties = parties.sort((a, b) => {
    if (!isMobile) {
      return +new Date(a.date) - +new Date(b.date);
    } else {
      return +new Date(b.date) - +new Date(a.date);
    }
  });
  const [openParty, setOpenParty] = useState<PartyType | null>(
    sortedParties[isMobile ? 0 : sortedParties.length - 1]
  );

  const onPartyOpen = (p: PartyType | null) => {
    setOpenParty(p);
  };

  if (!doneTransitioning) {
    return null;
  }

  return (
    <Html
      fullscreen
      position={pages.partyHistory.camera.lookAt}
      zIndexRange={[10, 10]}
    >
      <Container>
        {sortedParties.map((project, i) => (
          <Party
            key={i}
            index={i}
            party={project}
            openParty={openParty}
            onOpen={onPartyOpen}
          />
        ))}
      </Container>
    </Html>
  );
};
