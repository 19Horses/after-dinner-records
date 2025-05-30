import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Splash } from './pages/Splash';
import { STRAPI_URL } from './strapiIntegration';

const client = new ApolloClient({
  uri: `${STRAPI_URL}/graphql/`,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Splash />
    </ApolloProvider>
  );
};

export default App;
