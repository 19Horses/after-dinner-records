import { styled } from 'styled-components';
import { appear } from '../../animations';

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
  transition: color 0.3s ease-in-out;
  animation: ${appear} 0.5s ease-in-out;
  text-decoration: underline;

  &:hover {
    color: red;
  }
`;
