import { Page, pages } from '../../pages/pages';
import { Footer, NavButton } from './styles';

export const NavBar = ({
  currentPage,
  moveTo,
}: {
  currentPage: Page;
  moveTo: (page: Page) => void;
}) => {
  const color =
    currentPage.id === 'socials' || currentPage.id === 'nextParty'
      ? 'white'
      : 'black';
  return (
    <Footer>
      <NavButton $color={color} onClick={() => moveTo(pages.nextParty)}>
        Next party
      </NavButton>
      <NavButton $color={color} onClick={() => moveTo(pages.socials)}>
        Socials
      </NavButton>
    </Footer>
  );
};
