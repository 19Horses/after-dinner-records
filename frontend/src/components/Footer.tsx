import { styled } from 'styled-components';
import { Page, pages } from '../pages/pages';

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

const Cross = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 24px;
`;

export const NavBar = ({ moveTo }: { moveTo: (page: Page) => void }) => (
  <>
    <Cross onClick={() => moveTo(pages.initial)}>
      <svg
        aria-label="Close"
        fill="black"
        height="18"
        role="img"
        viewBox="0 0 24 24"
        width="18"
      >
        <title>Close</title>
        <polyline
          fill="none"
          points="20.643 3.357 12 12 3.353 20.647"
          stroke="black"
        ></polyline>
        <line
          fill="none"
          stroke="black"
          x1="20.649"
          x2="3.354"
          y1="20.649"
          y2="3.354"
        ></line>
      </svg>
    </Cross>
    <Footer>
      <button onClick={() => moveTo(pages.nextParty)}>Next party</button>
      <button onClick={() => moveTo(pages.socials)}>Socials</button>
    </Footer>
  </>
);
