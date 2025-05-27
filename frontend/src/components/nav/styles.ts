import { styled } from 'styled-components';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  z-index: 9;
`;

export const Close = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  right: 0;
  top: 0;
  margin: 24px;
  z-index: 11;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  top: 0;
  left: 0;
  margin: 24px;
  z-index: 11;

  &:hover {
    text-decoration: underline;
  }
`;

export const ArchiveButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 24px;
  z-index: 11;

  &:hover {
    text-decoration: underline;
  }
`;

export const NavButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
