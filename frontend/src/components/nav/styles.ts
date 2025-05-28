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
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  right: 0;
  top: 0;
  margin-right: 24px;
  margin-top: 24px;
  z-index: 11;
  text-decoration: underline;
`;

export const BackButton = styled.button`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  top: 0;
  left: 0;
  margin: 24px;
  z-index: 11;
  text-decoration: underline;
`;

export const ArchiveButton = styled.button`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  margin-top: 24px;
  z-index: 11;
  text-decoration: underline;
`;

export const NavButton = styled.button<{ $color: 'white' | 'black' }>`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  text-decoration: underline;
  color: ${({ $color }) => $color};
`;

export const EnterButton = styled.button`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  text-align: center;
  transform: translate(-50%, 0%);
  margin-bottom: 24px;
  z-index: 11;
  animation: ${appear} 1s ease-in-out;
  text-decoration: underline;
`;
