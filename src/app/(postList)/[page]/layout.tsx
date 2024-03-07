import { PropsWithChildren } from 'react';

import CategoryTitle from '../_components/CategoryTitle/CategoryTitle';

const PostListLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CategoryTitle title="recent" />
      {children}
    </>
  );
};

export default PostListLayout;
