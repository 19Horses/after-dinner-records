import { styled } from 'styled-components';
import { PartyType } from '../../queries/useGetParties';
import {
  DateText,
  Description,
  Lineup,
  TicketLink,
} from '../PartyHistory/styles';

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0px;
  box-sizing: border-box;
  transition: all 0.4s ease-in-out;

  & > p {
    width: 50%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 30px;
    justify-content: auto;
    width: 100%;
    height: 45%;
  }
`;

export const Details = ({ party }: { party: PartyType }) => {
  return (
    <Container>
      <DateText>{party.date}</DateText>
      <Lineup>{party.lineup}</Lineup>
      <Description>{party.description}</Description>
      {party.ticketLink && (
        <TicketLink href={party.ticketLink} target="_blank" rel="noreferrer">
          Buy tickets &rarr;
        </TicketLink>
      )}
    </Container>
  );
};
