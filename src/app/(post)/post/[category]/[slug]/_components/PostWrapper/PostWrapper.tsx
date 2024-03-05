'use client';

import { PropsWithChildren } from 'react';

import AppearLeft from '@/app/_components/Motion/AppearLeft';
import { appearFromLeft } from '@/styles/framer-motions';

interface Props extends PropsWithChildren {}

const PostWrapper = ({ children }: Props) => {
  return <AppearLeft {...appearFromLeft}>{children}</AppearLeft>;
};

export default PostWrapper;
