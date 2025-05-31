import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../strapiIntegration';
import axios from 'axios';

export type SocialType = {
  documentId: number;
  link: string;
  platform: 'instagram' | 'spotify';
};

const getSocials = async (): Promise<{ data: SocialType[] }> => {
  const response = await axios.get(getApiUrl('/socials'));
  return response.data;
};

export const useGetSocials = () => {
  return useQuery({
    queryKey: ['socialsData'],
    queryFn: getSocials,
    select: (res) => res.data,
  });
};
