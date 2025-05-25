import nextPartyImg from '../../assets/next-party.png';

export const parties: PartyType[] = [
  {
    id: 1,
    date: '2025-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 2,
    date: '2024-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 3,
    date: '2023-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 4,
    date: '2022-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 5,
    date: '2022-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 6,
    date: '2022-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 7,
    date: '2022-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
  },
  {
    id: 8,
    date: '2022-12-03',
    description: 'The fifth installment of ADR.',
    img: nextPartyImg,
    lineup: 'black party, someone else',
    ticketLink: 'https://google.com',
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
