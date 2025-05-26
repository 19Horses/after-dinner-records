import { Page, pages } from '../../pages/pages';
import { Close, Footer, NavButton } from './styles';

export const NavBar = ({
  moveTo,
  currentPage,
}: {
  moveTo: (page: Page) => void;
  currentPage: Page;
}) => (
  <>
    {currentPage.id !== 'initial' && (
      <Close onClick={() => moveTo(pages.initial)}>[close]</Close>
    )}
    <Footer>
      <NavButton onClick={() => moveTo(pages.nextParty)}>Next party</NavButton>
      <NavButton onClick={() => moveTo(pages.socials)}>Socials</NavButton>
    </Footer>
  </>
);
