import { styled } from 'styled-components';
import { Landing } from './pages/Landing';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <Wrapper>
      <Landing />
    </Wrapper>
  );
};

export default App;
