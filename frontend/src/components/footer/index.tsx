import { useState } from 'react';
import { Page, pages } from '../../pages/pages';
import { Cross, Footer, NavButton, NavIcon, NavList } from './styles';

export const NavBar = ({
  moveTo,
  currentPage,
}: {
  moveTo: (page: Page) => void;
  currentPage: Page;
}) => {
  const [openNavList, setOpenNavList] = useState(false);
  return (
    <>
      {currentPage.id === 'partyHistory' && (
        <Cross onClick={() => moveTo(pages.nextParty)}>[close]</Cross>
      )}
      <Footer onClick={() => setOpenNavList(!openNavList)}>
        <NavIcon>←--</NavIcon>
        {Object.entries(pages).map(([key, page]) => {
          if (!page.name || currentPage.id !== page.id) {
            return;
          }
          return <NavButton key={key}>{page.name}</NavButton>;
        })}
        {openNavList && (
          <NavList>
            {Object.entries(pages).map(([key, page]) => {
              if (!page.name || currentPage.id === page.id) {
                return;
              }
              return (
                <NavButton key={key} onClick={() => moveTo(page)}>
                  {page.name}
                </NavButton>
              );
            })}
          </NavList>
        )}
      </Footer>
    </>
  );
};
