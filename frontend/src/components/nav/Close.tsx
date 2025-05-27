import { Page, pages } from '../../pages/pages';
import { Close } from './styles';

export const CloseToHome = ({ moveTo }: { moveTo: (page: Page) => void }) => (
  <Close onClick={() => moveTo(pages.initial)}>close x</Close>
);
