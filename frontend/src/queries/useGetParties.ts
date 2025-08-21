import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../sanityIntegration';
import axios from 'axios';
import { useTexture } from '@react-three/drei';

export type PartyType = {
  _id: number;
  date: string;
  description: string;
  poster: {
    asset: {
      url: string;
    };
  };
  lineup: string;
  ticketLink: string;
};

const query = `
  *[_type == 'party']{
  _id,
  date,
  description,
  lineup,
  poster {
    asset -> {
      url
    }
  },
  ticketLink
} | order(date asc)
`;

function preloadTextures(urls: string[]) {
  urls.forEach((url) => useTexture.preload(url));
}

const getParties = async (): Promise<{ result: PartyType[] }> => {
  const response = await axios.get(getApiUrl(query));
  const parties = response.data.result;
  const posterUrls = parties.map((party: PartyType) => party.poster.asset.url);
  preloadTextures(posterUrls);
  return response.data;
};

export const useGetParties = () => {
  return useQuery({
    queryKey: ['partiesData'],
    queryFn: getParties,
    select: (res) => res.result,
  });
};
