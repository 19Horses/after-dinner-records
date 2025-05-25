import { Page, pages } from '../../pages/pages';
import { Cross, Footer, NavButton } from './styles';

export const NavBar = ({
  moveTo,
  currentPage,
}: {
  moveTo: (page: Page) => void;
  currentPage: Page;
}) => (
  <Footer>
    {currentPage.id !== 'initial' && (
      <Cross onClick={() => moveTo(pages.initial)}>[close]</Cross>
    )}
    <NavButton onClick={() => moveTo(pages.nextParty)}>Next party</NavButton>
    <NavButton onClick={() => moveTo(pages.socials)}>Socials</NavButton>
  </Footer>
);
