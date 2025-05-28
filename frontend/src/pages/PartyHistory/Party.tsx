import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Poster } from '../../components/Poster';
import { PartyType } from '../../queries/useGetParties';
import {
  CanvasForPartyPoster,
  Content,
  DateText,
  Description,
  Drawer,
  Lineup,
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
  const [isOpen, setIsOpen] = useState(
    openParty?.documentId === party.documentId
  );
  const [showContent, setShowContent] = useState(
    openParty?.documentId === party.documentId
  );

  useEffect(() => {
    if (!openParty && isOpen) {
      setShowContent(false);
      setIsOpen(false);
    }
    if (openParty) {
      if (openParty.documentId !== party.documentId && isOpen) {
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
          <CanvasForPartyPoster onClick={(e) => e.stopPropagation()}>
            <Poster src={party.poster.url} />
          </CanvasForPartyPoster>
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
