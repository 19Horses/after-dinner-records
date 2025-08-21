import { styled } from 'styled-components';
import { appear } from '../../animations';

export const BlurMenu = styled.div`
  display: flex;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: #000;
  padding: 12px 15px 10px;
  border: 1px solid rgba(40, 40, 40, 0.3);
  border-radius: 25px;
  justify-content: space-between;
  position: fixed;
  z-index: 20;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  animation: ${appear} 0.3s ease-in-out;

  @media (max-width: 768px) {
    bottom: 10px;
    padding: 8px 10px 6px;
    width: 60%;
  }
`;
export const List = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  width: 100%;
  padding: 0;
`;
export const ListItem = styled.li`
  margin: 0 20px;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
  text-transform: uppercase;

  &:hover {
    color: red;
  }

  &::selection {
    background-color: transparent;
  }
`;
