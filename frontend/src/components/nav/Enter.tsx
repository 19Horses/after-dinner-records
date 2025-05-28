import { EnterButton } from './styles';

export const Enter = ({ handleEnter }: { handleEnter: () => void }) => (
  <EnterButton onClick={handleEnter}>Enter</EnterButton>
);
