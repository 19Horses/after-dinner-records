import { Page, pages } from '../../pages';
import { useMemo } from 'react';
import { BlurMenu, List, ListItem } from './styles';

export const Menu = ({ moveTo }: { moveTo: (page: Page) => void }) => {
  const items = useMemo(() => {
    return [
      { name: 'Next Party', onClick: () => moveTo(pages.nextParty) },
      { name: 'Socials', onClick: () => moveTo(pages.socials) },
    ];
  }, [moveTo]);
  return (
    <BlurMenu>
      <List>
        {items.map((item) => (
          <ListItem key={item.name} onClick={item.onClick}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </BlurMenu>
  );
};
