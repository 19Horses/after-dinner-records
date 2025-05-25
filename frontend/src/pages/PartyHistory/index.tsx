import { Html } from '@react-three/drei';
import { useState } from 'react';
import { pages } from '../pages';
import { Party } from './Party';
import { parties, PartyType } from './parties';
import { Container } from './styles';

export const PartyHistory = ({
  doneTransitioning,
}: {
  doneTransitioning: boolean;
}) => {
  console.log(doneTransitioning);
  const sortedParties = parties.sort(
    (a, b) => +new Date(a.date) - +new Date(b.date)
  );
  const [openParty, setOpenParty] = useState<PartyType | null>(
    sortedParties[sortedParties.length - 1]
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
      zIndexRange={[0, 0]}
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
