import { Html } from '@react-three/drei';
import { pages } from '../pages';
import { PartyHistoryContent } from './PartyHistory';
import { useGetParties } from '../../queries/useGetParties';

export const PartyHistory = ({
  doneTransitioning,
}: {
  doneTransitioning: boolean;
}) => {
  const { isLoading, isError, data: parties } = useGetParties();

  if (isLoading) {
    return (
      <Html
        fullscreen
        position={pages.partyHistory.camera.lookAt}
        zIndexRange={[10, 10]}
      >
        <p>Loading...</p>
      </Html>
    );
  }

  if (isError || !parties) {
    return (
      <Html
        fullscreen
        position={pages.partyHistory.camera.lookAt}
        zIndexRange={[10, 10]}
      >
        <p>Something went wrong!</p>
      </Html>
    );
  }

  if (!doneTransitioning) {
    return null;
  }

  return <PartyHistoryContent parties={parties} />;
};
