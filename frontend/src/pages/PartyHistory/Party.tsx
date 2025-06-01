import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PartyType } from '../../queries/useGetParties';
import {
  Content,
  DateText,
  Description,
  Drawer,
  Lineup,
  PartyImage,
  TicketLink,
} from './styles';

export const Party = ({
  index,
  party,
  onOpen,
  openParty,
}: {
  index: number;
  party: PartyType;
  onOpen: (p: PartyType | null) => void;
  openParty: PartyType | null;
}) => {
  const [isOpen, setIsOpen] = useState(openParty?._id === party._id);
  const [showContent, setShowContent] = useState(openParty?._id === party._id);

  useEffect(() => {
    if (!openParty && isOpen) {
      setShowContent(false);
      setIsOpen(false);
    }
    if (openParty) {
      if (openParty._id !== party._id && isOpen) {
        setShowContent(false);
        setIsOpen(false);
      }
    }
  }, [openParty]);

  return (
    <Drawer
      $delay={index * 0.1}
      $isOpen={isOpen}
      onClick={() => {
        onOpen(isOpen ? null : party);
        const nextOpenState = !isOpen;
        if (nextOpenState) {
          setTimeout(() => {
            setShowContent(true);
          }, 300);
        } else {
          setShowContent(false);
        }

        return setIsOpen(nextOpenState);
      }}
    >
      {!showContent && (
        <DateText $vertical={isMobile ? false : true}>{party.date}</DateText>
      )}
      {showContent && (
        <Content>
          <PartyImage src={party.poster.asset.url} alt="Party poster" />
          <DateText>{party.date}</DateText>
          <Lineup>{party.lineup}</Lineup>
          <Description>{party.description}</Description>
          {party.ticketLink && (
            <TicketLink
              onClick={(e) => e.stopPropagation()}
              href={party.ticketLink}
              target="_blank"
              rel="noreferrer"
            >
              Buy tickets &rarr;
            </TicketLink>
          )}
        </Content>
      )}
    </Drawer>
  );
};
