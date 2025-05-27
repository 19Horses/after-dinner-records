import { Canvas } from '@react-three/fiber';
import { css, styled } from 'styled-components';
import { fadeIn } from '../../animations';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;
`;

export const Drawer = styled.div<{ $isOpen: boolean; $delay: number }>`
  height: 100%;
  flex: ${(props) => (props.$isOpen ? 5 : 1)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid black;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  cursor: pointer;
  background-color: white;

  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: ${(props) => props.$delay ?? 0}s;

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

export const Description = styled.p`
  font-size: 16px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const DateText = styled.p<{ $vertical?: boolean }>`
  font-size: 14px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  writing-mode: ${({ $vertical }) => ($vertical ? 'vertical-rl' : 'auto')};
`;

export const Lineup = styled.p`
  font-style: italic;
  font-size: 20px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const CanvasForPartyPoster = styled(Canvas)`
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  max-height: 50%;
`;

export const TicketLink = styled.a`
  cursor: pointer;
  color: black;
  text-decoration: underline;
  font-size: 16px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  justify-self: flex-end;
  margin: 16px 0px;
`;
