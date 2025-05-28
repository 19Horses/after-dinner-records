import { Page, pages } from '../../pages/pages';
import { CloseButton } from './styles';

export const Close = ({ moveTo }: { moveTo: (page: Page) => void }) => (
  <CloseButton onClick={() => moveTo(pages.initial)}>close x</CloseButton>
);
