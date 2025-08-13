import { Page, pages } from '../../pages';
import { ArchiveButton } from './styles';

export const Archive = ({ moveTo }: { moveTo: (page: Page) => void }) => (
  <ArchiveButton onClick={() => moveTo(pages.partyHistory)}>
    [archive]
  </ArchiveButton>
);
