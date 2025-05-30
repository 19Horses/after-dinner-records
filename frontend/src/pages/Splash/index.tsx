import { useProgress } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { Enter } from '../../components/nav/Enter';
import { useGetNextParty } from '../../queries/useGetNextParty';
import { Landing } from '../Landing';
import { Blur, Title, Wrapper } from './styles';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGetSocials } from '../../queries/useGetSocials';

export const Splash = () => {
  const [isAtSplash, setIsAtSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const gltf = useLoader(GLTFLoader, './backyard.glb');
  const { loaded, total } = useProgress();

  const { loading, error, data } = useGetNextParty();

  const {
    loading: loadingSocials,
    error: errorSocials,
    data: dataSocials,
  } = useGetSocials();

  const isLoading = useMemo(() => {
    return loading || loadingSocials || loaded !== total;
  }, [loaded, total, loading, loadingSocials]);

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

  if (error || errorSocials) {
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
        nextParty={data.parties[0]}
        socials={dataSocials.socials}
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
