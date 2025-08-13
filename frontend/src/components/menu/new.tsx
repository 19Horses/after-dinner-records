import { styled } from 'styled-components';
import { appear } from '../../animations';
import { Page, pages } from '../../pages';

// have nav on left and right
// hover effect
// click and they move to next page

const VerticalNav = styled.h2`
  position: absolute;
  top: 50%;
  font-size: 24px;

  transition: all 0.3s ease-in-out;
  animation: ${appear} 0.3s ease-in-out;
  text-align: center;
  transform: translate(0, -50%);
  writing-mode: vertical-rl;

  background-color: black;
  color: white;
  padding: 4px;

  &:hover {
    color: red;
    cursor: pointer;
  }

  &::selection {
    background-color: transparent;
  }

  @media (max-width: 768px) {
    bottom: 0;
    top: auto;
    writing-mode: horizontal-tb;
    transform: none;
  }
`;

const LeftNav = styled(VerticalNav)`
  left: 0;
  margin-left: 24px;

  @media (max-width: 768px) {
    margin: 12px;
    transform: none;
  }
`;

const RightNav = styled(VerticalNav)`
  right: 0;
  margin-right: 24px;
  transform: translate(0, -50%) rotateX(180deg) scaleX(-1);

  @media (max-width: 768px) {
    margin: 12px;
    transform: none;
  }
`;

export const Menu = ({ moveTo }: { moveTo: (page: Page) => void }) => {
  return (
    <>
      <LeftNav onClick={() => moveTo(pages.socials)}>Socials</LeftNav>
      <RightNav onClick={() => moveTo(pages.partyDetails)}>Next Party</RightNav>
    </>
  );
};
