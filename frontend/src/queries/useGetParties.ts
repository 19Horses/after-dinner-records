import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../strapiIntegration';
import axios from 'axios';

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

const getParties = async (): Promise<{ data: PartyType[] }> => {
  const response = await axios.get(getApiUrl('/parties?populate=*'));
  return response.data;
};

export const useGetParties = () => {
  return useQuery({
    queryKey: ['partiesData'],
    queryFn: getParties,
    select: (res) =>
      res.data.sort((a, b) => +new Date(a.date) - +new Date(b.date)),
  });
};
