import { Html } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PartyType } from '../../queries/useGetParties';
import { pages } from '../pages';
import { Party } from './Party';
import { Container } from './styles';

export const PartyHistoryContent = ({ parties }: { parties: PartyType[] }) => {
  const sortedParties = [...parties].reverse();
  const [openParty, setOpenParty] = useState<PartyType | null>(
    sortedParties[sortedParties.length - 1]
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
