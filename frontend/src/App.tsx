import { styled } from 'styled-components';
import { Landing } from './pages/Landing';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/Home';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from './sketch';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql/',
  cache: new InMemoryCache(),
});

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Landing />
        <Home />
        {/* <ReactP5Wrapper sketch={sketch} /> */}
      </Wrapper>
    </ApolloProvider>
  );
};

export default App;
