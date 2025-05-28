import { useQuery, gql } from '@apollo/client';

export type PartyType = {
  documentId: number;
  date: string;
  description: string;
  poster: {
    url: string;
  };
  lineup: string;
  ticketLink: string;
  isNextParty: boolean;
};

const PARTIES = gql`
  query GetParties {
    parties {
      date
      description
      documentId
      isNextParty
      lineup
      poster {
        url
      }
      ticketLink
    }
  }
`;

export const useGetParties = () => {
  return useQuery(PARTIES);
};
