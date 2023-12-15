import { getAllTags } from '@/lib/api';
import { sortDescending } from '@/lib/utils';
import Tags from './_components/Tags/Tags';

const TagsPage = () => {
  const tags = sortDescending(getAllTags(), 'quantity');

  return <Tags tags={tags}></Tags>;
};

export default TagsPage;
