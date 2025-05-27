import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import { styled } from 'styled-components';
import { appear, fadeIn } from './animations';
import Home from './pages/Home';
import { Landing } from './pages/Landing';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql/',
  cache: new InMemoryCache(),
});

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Blur = styled.div<{ $isFadingOut: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 999;
  opacity: ${({ $isFadingOut }) => ($isFadingOut ? 0 : 1)};
  transition: opacity 1s ease-in-out;
`;

const Title = styled.h1`
  font-family: 'Bootzy';
  font-size: 64px;
  margin-top: 100px;
  animation: ${fadeIn} 1s ease-in-out;
  width: 80%;
  text-align: center;
`;

const EnterButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 24px;
  z-index: 11;
  animation: ${appear} 1s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  const [isAtSplash, setIsAtSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsAtSplash(false);
    }, 1000);
  };

  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Landing isAtSplash={isAtSplash} />
        <Home />
        {/* <ReactP5Wrapper sketch={sketch} /> */}
        {isAtSplash && (
          <Blur $isFadingOut={isFadingOut}>
            <Title>AFTER DINNER RECORDS</Title>
            <EnterButton onClick={handleEnter}>Enter</EnterButton>
          </Blur>
        )}
      </Wrapper>
    </ApolloProvider>
  );
};

export default App;
