import { useQuery, gql } from '@apollo/client';

const NEXT_PARTY = gql`
  query GetNextParty($filters: PartyFiltersInput) {
    parties(filters: $filters) {
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

export const useGetNextParty = () => {
  return useQuery(NEXT_PARTY, {
    variables: {
      filters: {
        isNextParty: {
          eq: true,
        },
      },
    },
  });
};
