import { styled } from 'styled-components';
import { slideIn } from '../../animations';

export const Blur = styled.div<{ $show: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
  padding: 64px 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    bottom: 0;
    top: auto;
    margin-top: 0px;
    margin-bottom: 24px;
  }
`;

export const MenuButton = styled.button<{ $show: boolean }>`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  right: 0;
  top: 0;
  margin-right: ${({ $show }) => ($show ? '24px' : '-100px')};
  margin-top: 24px;
  z-index: 11;
  transition: all 0.2s ease-in-out;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: all 0.4s ease-in-out;
  height: 100%;
  margin: 0;
  gap: 12px;
`;

export const ListItem = styled.li<{ $delay: number }>`
  font-size: 20px;
  font-weight: 800;
  color: black;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  animation: ${slideIn} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;
