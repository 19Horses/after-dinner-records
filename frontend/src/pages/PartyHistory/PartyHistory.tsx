import { Html } from '@react-three/drei';
import { useState } from 'react';
import { PartyType } from '../../queries/useGetParties';
import { pages } from '../pages';
import { Party } from './Party';
import { Container } from './styles';

export const PartyHistoryContent = ({ parties }: { parties: PartyType[] }) => {
  const [openParty, setOpenParty] = useState<PartyType | null>(
    parties[parties.length - 1]
  );

  const onPartyOpen = (p: PartyType | null) => {
    setOpenParty(p);
  };

  return (
    <Html
      fullscreen
      position={pages.partyHistory.camera.lookAt}
      zIndexRange={[10, 10]}
    >
      <Container>
        {parties.map((project, i) => (
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
