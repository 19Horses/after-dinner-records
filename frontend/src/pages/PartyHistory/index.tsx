import { Html } from '@react-three/drei';
import { useState } from 'react';
import { cameraPositions } from '../cameraPositions';
import { Party } from './Party';
import { parties, PartyType } from './parties';
import { Container } from './styles';

export const PartyHistory = () => {
  const [openProject, setOpenProject] = useState<PartyType | null>(null);

  const onProjectOpen = (p: PartyType | null) => {
    setOpenProject(p);
  };
  return (
    <Html fullscreen position={cameraPositions.partyHistory.lookAt}>
      <Container>
        {parties.map((project, i) => (
          <Party
            key={i}
            project={project}
            openProject={openProject}
            onOpen={onProjectOpen}
          />
        ))}
      </Container>
    </Html>
  );
};
