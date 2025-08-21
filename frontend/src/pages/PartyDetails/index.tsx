import { Html } from '@react-three/drei';
import { useState } from 'react';
import { styled } from 'styled-components';
import { PartyType } from '../../queries/useGetParties';
import { Details } from './Details';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  transition: all 0.4s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  cursor: pointer;
  font-size: 48px;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const LeftArrow = styled(Arrow)`
  left: 24px;
`;

const RightArrow = styled(Arrow)`
  right: 24px;
`;

export const PartyDetails = ({
  nextParty,
  doneTransitioning,
  parties,
  updatePoster,
}: {
  nextParty: PartyType;
  parties: PartyType[];
  doneTransitioning: boolean;
  updatePoster: (url: string) => void;
}) => {
  const [currentParty, setCurrentParty] = useState<PartyType>(nextParty);

  const currentIndex = parties.findIndex(
    (party) => party._id === currentParty._id
  );

  const moveToPreviousParty = () => {
    const previousParty = parties[currentIndex - 1];
    setCurrentParty(previousParty);
    updatePoster(previousParty.poster.asset.url);
  };

  const moveToNextParty = () => {
    const nextParty = parties[currentIndex + 1];
    setCurrentParty(nextParty);
    updatePoster(nextParty.poster.asset.url);
  };
  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <Wrapper>
        {currentIndex > 0 && (
          <LeftArrow onClick={() => moveToPreviousParty()}>&larr;</LeftArrow>
        )}
        {doneTransitioning && <Details party={currentParty} />}
        {currentIndex < parties.length - 1 && (
          <RightArrow onClick={() => moveToNextParty()}>&rarr;</RightArrow>
        )}
      </Wrapper>
    </Html>
  );
};
