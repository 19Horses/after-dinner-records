import { BackButton } from './styles';

export const Back = ({ goBack }: { goBack: () => void }) => (
  <BackButton onClick={() => goBack()}>{'<- back'}</BackButton>
);
