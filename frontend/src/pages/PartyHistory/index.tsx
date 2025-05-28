import { Html } from '@react-three/drei';
import { PartyType, useGetParties } from '../../queries/useGetParties';
import { pages } from '../pages';
import { PartyHistoryContent } from './PartyHistory';

export const PartyHistory = ({
  doneTransitioning,
}: {
  doneTransitioning: boolean;
}) => {
  const { loading, error, data } = useGetParties();

  if (loading) {
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

  if (error) {
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

  const parties: PartyType[] = data.parties;

  return <PartyHistoryContent parties={parties} />;
};
