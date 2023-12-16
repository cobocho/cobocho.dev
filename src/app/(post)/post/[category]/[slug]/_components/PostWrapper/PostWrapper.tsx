'use client';

import { PropsWithChildren } from 'react';
import { appearFromLeft } from '@/styles/framer-motions';
import AppearLeft from '@/app/_components/Motion/AppearLeft';

interface Props extends PropsWithChildren {}

const PostWrapper = ({ children }: Props) => {
  return <AppearLeft {...appearFromLeft}>{children}</AppearLeft>;
};

export default PostWrapper;
