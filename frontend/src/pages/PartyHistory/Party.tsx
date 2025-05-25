import { useEffect, useState } from 'react';
import { Poster } from '../../components/Poster';
import { PartyType } from './parties';
import {
  CanvasForPartyPoster,
  Content,
  Date,
  Description,
  Drawer,
  Lineup,
  TicketLink,
} from './styles';

export const Party = ({
  party,
  onOpen,
  openParty,
}: {
  party: PartyType;
  onOpen: (p: PartyType | null) => void;
  openParty: PartyType | null;
}) => {
  const [isOpen, setIsOpen] = useState(openParty?.id === party.id);
  const [showContent, setShowContent] = useState(openParty?.id === party.id);

  useEffect(() => {
    if (!openParty && isOpen) {
      setShowContent(false);
      setIsOpen(false);
    }
    if (openParty) {
      if (openParty.id !== party.id && isOpen) {
        setShowContent(false);
        setIsOpen(false);
      }
    }
  }, [openParty]);

  return (
    <Drawer
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
      {!showContent && <Date $vertical={true}>{party.date}</Date>}
      {showContent && (
        <Content>
          <CanvasForPartyPoster onClick={(e) => e.stopPropagation()}>
            <Poster />
          </CanvasForPartyPoster>
          <Date>{party.date}</Date>
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
