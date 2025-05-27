import { Html } from '@react-three/drei';
import { styled } from 'styled-components';
import { parties } from '../PartyHistory/parties';
import {
  DateText,
  Description,
  Lineup,
  TicketLink,
} from '../PartyHistory/styles';
import { Archive } from '../../components/nav/Archive';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const PartyDetails = () => {
  const party = parties.sort(
    (a, b) => +new Date(a.date) - +new Date(b.date),
  )[0];
  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <Wrapper>
        <Container>
          <DateText>{party.date}</DateText>
          <Lineup>{party.lineup}</Lineup>
          <Description>{party.description}</Description>
          {party.ticketLink && (
            <TicketLink
              onClick={(e) => e.stopPropagation()}
              href={party.ticketLink}
              target="_blank"
              rel="noreferrer"
            >
              Buy tickets &rarr;
            </TicketLink>
          )}
        </Container>
      </Wrapper>
    </Html>
  );
};
