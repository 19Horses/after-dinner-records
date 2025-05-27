import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { styled } from 'styled-components';
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
