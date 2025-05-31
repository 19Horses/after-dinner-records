import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Splash } from './pages/Splash';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Splash />
    </QueryClientProvider>
  );
};

export default App;
