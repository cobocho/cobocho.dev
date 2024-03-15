'use client';

import { memo, useLayoutEffect, useState } from 'react';

import {
  CATEGORY_DESCRIPTIONS,
  KOR_CATEGORY,
  KOR_CATEGORY_KEYS,
} from '@/constants/category-translate';
import { appear } from '@/styles/animation.css';
import LAYOUT_VARIABLES from '@/styles/layout-variables';

import ViewStyle from '../ViewStyle/ViewStyle';
import {
  postListDescription,
  postListTitle,
  postListTitleBox,
  postListTitleWrapper,
} from './CategoryTitle.css';

interface Props {
  title: KOR_CATEGORY_KEYS;
}

const CategoryTitle = ({ title }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useLayoutEffect(function setResizingPostViewEvent() {
    function resizingPostViewEvent() {
      setIsMobile(window.innerWidth <= LAYOUT_VARIABLES.breakPoint);
    }

    resizingPostViewEvent();

    window.addEventListener('resize', resizingPostViewEvent);

    return () => {
      window.removeEventListener('resize', resizingPostViewEvent);
    };
  }, []);

  return (
    /**
     * vanilla extract jest 관련 에러로 인한 옵셔널 체이닝 조치
     * @issue https://github.com/vanilla-extract-css/vanilla-extract/issues/1131
     */
    <div className={`${postListTitleBox} ${appear?.left}`}>
      <div className={postListTitleWrapper}>
        <p className={postListTitle}>{KOR_CATEGORY[title] ? KOR_CATEGORY[title] : title}</p>
        <p className={postListDescription}>{CATEGORY_DESCRIPTIONS[title] || title}</p>
      </div>
      {!isMobile && <ViewStyle />}
    </div>
  );
};

export default memo(CategoryTitle);
