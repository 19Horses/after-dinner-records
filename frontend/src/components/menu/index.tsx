import { useMemo, useState } from 'react';
import { Blur, CurrentLocation, List, ListItem, MenuButton } from './styles';
import { Page, pages } from '../../pages/pages';

export const Menu = ({ moveTo }: { moveTo: (page: Page) => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Home');

  const items = useMemo(() => {
    return [
      { name: 'Next Party', onClick: () => moveTo(pages.nextParty) },
      { name: 'Party Details', onClick: () => moveTo(pages.partyDetails) },
      { name: 'Archive', onClick: () => moveTo(pages.partyHistory) },
      { name: 'Socials', onClick: () => moveTo(pages.socials) },
      { name: 'Home', onClick: () => moveTo(pages.initial) },
    ];
  }, [moveTo]);

  return (
    <>
      <Blur $show={showMenu}>
        {showMenu && (
          <List>
            {items.map((item, index) => (
              <ListItem
                key={item.name}
                $delay={index * 0.1}
                onClick={() => {
                  setShowMenu(false);
                  item.onClick();
                  setCurrentLocation(item.name);
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
      <MenuButton $show={showMenu} onClick={() => setShowMenu((prev) => !prev)}>
        x close
      </MenuButton>
      <CurrentLocation $show={!showMenu}>@ {currentLocation}</CurrentLocation>
    </>
  );
};
