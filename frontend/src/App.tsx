import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useProgress } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { fadeIn } from './animations';
import { Enter } from './components/nav/Enter';
import { Landing } from './pages/Landing';

console.log(import.meta.env.VITE_STRAPI_URL);

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_STRAPI_URL}/graphql/`,
  cache: new InMemoryCache(),
});

const Wrapper = styled.div`
  width: 100vw;
  height: 100svh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Blur = styled.div<{ $isFadingOut: boolean }>`
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

const Title = styled.h1`
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

const App = () => {
  const [isAtSplash, setIsAtSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { loaded, total } = useProgress();
  const isLoading = useMemo(() => {
    return loaded !== total;
  }, [loaded, total]);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsAtSplash(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <ApolloProvider client={client}>
        <Wrapper>
          <p>Loading...</p>
        </Wrapper>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Landing isAtSplash={isAtSplash} />
        {/* <Home /> */}
        {/* <ReactP5Wrapper sketch={sketch} /> */}
        {isAtSplash && (
          <Blur $isFadingOut={isFadingOut}>
            <Title>AFTER DINNER RECORDS</Title>
            <Enter handleEnter={handleEnter} />
          </Blur>
        )}
      </Wrapper>
    </ApolloProvider>
  );
};

export default App;
