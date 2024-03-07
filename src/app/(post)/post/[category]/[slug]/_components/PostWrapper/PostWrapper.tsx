import { PropsWithChildren } from 'react';

import { appear } from '@/styles/animation.css';

interface Props extends PropsWithChildren {}

const PostWrapper = ({ children }: Props) => {
  return <div className={appear.left}>{children}</div>;
};

export default PostWrapper;
