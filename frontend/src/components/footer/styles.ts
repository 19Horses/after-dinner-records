import { styled } from 'styled-components';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  z-index: 10;
  margin: 24px;
  width: 140px;
  background-color: white;
  border: 1px solid;
  cursor: pointer;
`;

export const NavList = styled.div`
  position: absolute;
  bottom: 0;
  width: 140px;
  right: 105%;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: white;
  outline: 1px solid;
  padding: 12px;

  & > button {
    padding: 12px 0px;
  }
`;

export const NavButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

export const NavIcon = styled.p`
  justify-self: flex-start;
  margin: 0;
`;

export const Cross = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  right: 0;
  top: 0;
  margin: 24px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;
