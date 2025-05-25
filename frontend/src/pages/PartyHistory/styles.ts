import { Canvas } from '@react-three/fiber';
import { styled, css, keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;

export const Drawer = styled.div<{ $isOpen: boolean }>`
  height: 100%;
  flex: ${(props) => (props.$isOpen ? 5 : 1)};
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const PartyImage = styled.img`
  width: 40%;
  object-fit: contain;
  animation: ${fadeIn} 0.5s ease-in-out forwards, ${spin} 2s linear infinite;
  transform-origin: center;
`;

export const Description = styled.p`
  font-size: 16px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const Date = styled.p<{ $vertical?: boolean }>`
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
