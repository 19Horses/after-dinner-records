import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { appear } from '../../animations';
import { Page, pages } from '../../pages';

// have nav on left and right
// hover effect
// click and they move to next page

const VerticalNav = styled.h1`
  position: absolute;
  top: 50%;
  font-size: 28px;

  transition: all 0.3s ease-in-out;
  animation: ${appear} 0.3s ease-in-out;
  text-align: center;
  transform: translate(0, -50%);
  writing-mode: vertical-rl;

  &:hover {
    color: red;
    cursor: pointer;
  }

  &::selection {
    background-color: black;
    color: white;
  }

  @media (max-width: 768px) {
    top: 75%;
  }
`;

const LeftNav = styled(VerticalNav)`
  left: 0;
  margin-left: 24px;

  @media (max-width: 768px) {
    margin-left: 12px;
  }
`;

const RightNav = styled(VerticalNav)`
  right: 0;
  margin-right: 24px;
  transform: translate(0, -50%) rotateX(180deg) scaleX(-1);

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

export const Menu = ({
  moveTo,
  currentPage,
}: {
  moveTo: (page: Page) => void;
  currentPage: Page;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Home');
  const [hoveredOn, setHoveredOn] = useState<string | null>(null);
  const [closeHovered, setCloseHovered] = useState(false);

  const items = useMemo(() => {
    return [
      { name: 'Next Party', onClick: () => moveTo(pages.nextParty) },
      { name: 'Party Details', onClick: () => moveTo(pages.partyDetails) },
      { name: 'Archive', onClick: () => moveTo(pages.partyHistory) },
      { name: 'Socials', onClick: () => moveTo(pages.socials) },
      { name: 'Home', onClick: () => moveTo(pages.initial) },
    ];
  }, [moveTo]);

  useEffect(() => {
    if (currentPage.id === 'initial') {
      setCurrentLocation('Home');
    } else if (currentPage.id === 'nextParty') {
      setCurrentLocation('Next Party');
    } else if (currentPage.id === 'partyDetails') {
      setCurrentLocation('Party Details');
    }
  }, [currentPage]);

  return (
    <>
      <LeftNav>Socials</LeftNav>
      <RightNav>Next Party</RightNav>
    </>
  );
};
