import { PropsWithChildren } from 'react';

import { appearLeftAnimation } from '@/styles/animation.css';

interface Props extends PropsWithChildren {}

const PostWrapper = ({ children }: Props) => {
  return <div className={appearLeftAnimation}>{children}</div>;
};

export default PostWrapper;
