import { useEffect, useMemo, useState } from 'react';
import { Blur, CurrentLocation, List, ListItem, MenuButton } from './styles';
import { Page, pages } from '../../pages/pages';

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
      <Blur $show={showMenu} $closeHovered={closeHovered}>
        {showMenu && (
          <List>
            {items.map((item, index) => (
              <ListItem
                onPointerOver={() => setHoveredOn(item.name)}
                onPointerLeave={() => setHoveredOn(null)}
                key={item.name}
                $delay={index * 0.1}
                $hoveredOn={!hoveredOn || hoveredOn === item.name}
                $closeHovered={closeHovered}
                onClick={() => {
                  setShowMenu(false);
                  item.onClick();
                  setCurrentLocation(item.name);
                  setHoveredOn(null);
                }}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        )}
      </Blur>
      <MenuButton
        $show={!showMenu}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {'-> Menu'}
      </MenuButton>
      <MenuButton
        onPointerOver={() => setCloseHovered(true)}
        onPointerLeave={() => setCloseHovered(false)}
        $show={showMenu}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        x close
      </MenuButton>
      <CurrentLocation $show={!showMenu}>@ {currentLocation}</CurrentLocation>
    </>
  );
};
