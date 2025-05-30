import { useQuery, gql } from '@apollo/client';

export type SocialType = {
  documentId: number;
  link: string;
  platform: 'instagram' | 'spotify';
};

const SOCIALS = gql`
  query Socials {
    socials {
      documentId
      link
      platform
    }
  }
`;

export const useGetSocials = () => {
  return useQuery(SOCIALS);
};
