import { useEffect, useState } from 'react';
import { PartyType } from './parties';
import { Drawer } from './styles';

export const Party = ({
  project,
  onOpen,
  openProject,
}: {
  project: PartyType;
  onOpen: (p: PartyType | null) => void;
  openProject: PartyType | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!openProject && isOpen) {
      setShowContent(false);
      setIsOpen(false);
    }
    if (openProject) {
      if (openProject.id !== project.id && isOpen) {
        setShowContent(false);
        setIsOpen(false);
      }
    }
  }, [openProject]);

  return (
    <Drawer
      $isOpen={isOpen}
      onClick={() => {
        onOpen(isOpen ? null : project);
        const nextOpenState = !isOpen;
        if (nextOpenState) {
          setTimeout(() => {
            setShowContent(true);
          }, 300);
        } else {
          setShowContent(false);
        }

        return setIsOpen(nextOpenState);
      }}
    >
      {showContent && <p>hey</p>}
    </Drawer>
  );
};
