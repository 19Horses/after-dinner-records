import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  from {
    visibility: hidden;
    transform: translateX(50px);
  }
  to {
    visibility: visible;
    transform: translateX(0);
  }
`;
