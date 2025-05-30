import { styled } from 'styled-components';
import { fadeIn } from '../../animations';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100svh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Blur = styled.div<{ $isFadingOut: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 999;
  opacity: ${({ $isFadingOut }) => ($isFadingOut ? 0 : 1)};
  transition: opacity 1s ease-in-out;
`;

export const Title = styled.h1`
  font-family: 'Bootzy';
  font-size: 64px;
  margin-top: 24px;
  animation: ${fadeIn} 1s ease-in-out;
  width: 80%;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;
