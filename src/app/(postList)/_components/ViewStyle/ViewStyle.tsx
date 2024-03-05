'use client';

import { FourBlockIcon, TwoBlockIcon } from '@/app/_components/Icons';
import { viewStyleBox } from './ViewStyle.css';
import { postViewFlag, usePostViewContext } from '@/hooks/usePostViewContext';

const ViewStyle = () => {
  const { postView, changePostView } = usePostViewContext();

  return (
    <div className={viewStyleBox}>
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
    </div>
  );
};

export default ViewStyle;
