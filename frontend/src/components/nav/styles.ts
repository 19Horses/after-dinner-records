import { styled } from 'styled-components';
import { appear } from '../../animations';

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

export const CloseButton = styled.button`
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
  transition: opacity 0.5s ease-in-out;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
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
  transition: opacity 0.5s ease-in-out;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
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
  transition: opacity 0.5s ease-in-out;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

export const NavButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  transition: opacity 0.5s ease-in-out;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;
export const EnterButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  margin-bottom: 24px;
  z-index: 11;
  animation: ${appear} 1s ease-in-out;
  text-decoration: underline;
  transition: opacity 1s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;
