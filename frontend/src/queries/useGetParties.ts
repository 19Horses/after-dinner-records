import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../strapiIntegration';
import axios from 'axios';

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

const getParties = async (): Promise<{ result: PartyType[] }> => {
  const response = await axios.get(getApiUrl(query));
  return response.data;
};

export const useGetParties = () => {
  return useQuery({
    queryKey: ['partiesData'],
    queryFn: getParties,
    select: (res) => res.result,
  });
};
