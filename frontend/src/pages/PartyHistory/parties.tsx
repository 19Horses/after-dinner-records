import nextPartyImg from '../../assets/next-party.png';

export const parties: PartyType[] = [
  {
    id: 1,
    date: '2025-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.come',
  },
  {
    id: 2,
    date: '2025-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.come',
  },
  {
    id: 3,
    date: '2025-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.come',
  },
  {
    id: 4,
    date: '2025-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.come',
  },
];

export type PartyType = {
  id: number;
  date: string;
  description: string;
  img: string;
  lineup: string;
  ticketLink: string;
};
