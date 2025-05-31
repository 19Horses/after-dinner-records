import { useProgress } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Enter } from '../../components/nav/Enter';
import { useGetParties } from '../../queries/useGetParties';
import { useGetSocials } from '../../queries/useGetSocials';
import { Landing } from '../Landing';
import { Blur, Title, Wrapper } from './styles';

export const Splash = () => {
  const [isAtSplash, setIsAtSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const { loaded, total } = useProgress();

  const {
    data: parties,
    isLoading: isLoadingParties,
    isError: isErrorParties,
  } = useGetParties();

  const {
    data: socials,
    isLoading: isLoadingSocials,
    isError: isErrorSocials,
  } = useGetSocials();

  const isLoading = useMemo(() => {
    return isLoadingParties || isLoadingSocials || loaded !== total;
  }, [loaded, total, isLoadingParties, isLoadingSocials]);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsAtSplash(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (isErrorParties || isErrorSocials || !parties || !socials) {
    return (
      <Wrapper>
        <p>Something went wrong!</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Landing
        isAtSplash={isAtSplash}
        gltf={gltf}
        nextParty={parties[parties.length - 1]}
        socials={socials}
      />
      {isAtSplash && (
        <Blur $isFadingOut={isFadingOut}>
          <Title>AFTER DINNER RECORDS</Title>
          <Enter handleEnter={handleEnter} />
        </Blur>
      )}
    </Wrapper>
  );
};
