import { styled, css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;

export const Drawer = styled.div<{ $isOpen: boolean }>`
  height: 100%;
  flex: ${(props) => (props.$isOpen ? 10 : 1)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid black;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    outline: none;
  }

  ${(props) =>
    props.$isOpen &&
    css`
      &:hover,
      &:focus {
        outline: none;
      }
    `}
`;
