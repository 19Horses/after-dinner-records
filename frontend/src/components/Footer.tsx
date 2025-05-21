import { styled } from 'styled-components';
import { CameraPosition, cameraPositions } from '../pages/cameraPositions';

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

export const NavBar = ({
  moveTo,
}: {
  moveTo: (newCamera: CameraPosition) => void;
}) => (
  <>
    <Cross onClick={() => moveTo(cameraPositions.initial)}>
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
      <button onClick={() => moveTo(cameraPositions.nextParty)}>
        Next party
      </button>
      <button onClick={() => moveTo(cameraPositions.socials)}>Socials</button>
    </Footer>
  </>
);
