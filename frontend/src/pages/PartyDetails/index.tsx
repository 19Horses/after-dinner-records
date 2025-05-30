import { Html } from '@react-three/drei';
import { styled } from 'styled-components';
import {
  DateText,
  Description,
  Lineup,
  TicketLink,
} from '../PartyHistory/styles';
import { isMobile } from 'react-device-detect';
import { PartyType } from '../../queries/useGetParties';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: ${isMobile ? 'column' : 'row'};
`;

const Container = styled.div`
  width: ${isMobile ? '80%' : '50%'};
  height: ${isMobile ? '45%' : '100%'};
  display: flex;
  justify-content: ${isMobile ? 'auto' : 'center'};
  flex-direction: column;

  & > p {
    width: 60%;
  }
`;

export const PartyDetails = ({ party }: { party: PartyType }) => {
  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <Wrapper>
        <Container>
          <DateText>{party.date}</DateText>
          <Lineup>{party.lineup}</Lineup>
          <Description>{party.description}</Description>
          {party.ticketLink && (
            <TicketLink
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
