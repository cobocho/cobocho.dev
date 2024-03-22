'use client';

import { FourBlockIcon, TwoBlockIcon } from '@/app/_components/Icons';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import { postViewFlag, usePostView } from '@/hooks/usePostView';

import { viewStyleBox } from './ViewStyle.css';

const ViewStyle = () => {
  const { postView, changePostView } = usePostView();

  return (
    <AppearBottom data-testid="post-view" className={viewStyleBox}>
      <span
        onClick={() => changePostView(postViewFlag.two)}
        className={postView === postViewFlag.two ? 'selected' : ''}
      >
        <FourBlockIcon />
      </span>
      <span
        onClick={() => changePostView(postViewFlag.one)}
        className={postView === postViewFlag.one ? 'selected' : ''}
      >
        <TwoBlockIcon />
      </span>
    </AppearBottom>
  );
};

export default ViewStyle;
