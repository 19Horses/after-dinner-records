import { useQuery } from '@tanstack/react-query';
import { getApiUrl } from '../strapiIntegration';
import axios from 'axios';

export type SocialType = {
  _id: number;
  link: string;
  platform: 'instagram' | 'spotify';
};

const query = `
  *[_type == 'social']{
  link,
  platform,
  _id
}
`;

const getSocials = async (): Promise<{ result: SocialType[] }> => {
  const response = await axios.get(getApiUrl(query));
  return response.data;
};

export const useGetSocials = () => {
  return useQuery({
    queryKey: ['socialsData'],
    queryFn: getSocials,
    select: (res) => res.result,
  });
};
