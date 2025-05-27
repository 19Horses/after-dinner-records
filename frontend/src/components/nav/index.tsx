import { Page, pages } from '../../pages/pages';
import { Footer, NavButton } from './styles';

export const NavBar = ({ moveTo }: { moveTo: (page: Page) => void }) => (
  <Footer>
    <NavButton onClick={() => moveTo(pages.nextParty)}>Next party</NavButton>
    <NavButton onClick={() => moveTo(pages.socials)}>Socials</NavButton>
  </Footer>
);
