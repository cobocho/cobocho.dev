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
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(function setResizingPostViewEvent() {
    function resizingPostViewEvent() {
      if (window.innerWidth <= LAYOUT_VARIABLES.breakPoint) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    resizingPostViewEvent();

    window.addEventListener('resize', resizingPostViewEvent);

    return () => {
      window.removeEventListener('resize', resizingPostViewEvent);
    };
  }, []);

  return (
    <div className={`${postListTitleBox} ${appear.left}`}>
      <div className={postListTitleWrapper}>
        <p className={postListTitle}>{KOR_CATEGORY[title] ? KOR_CATEGORY[title] : title}</p>
        <p className={postListDescription}>{CATEGORY_DESCRIPTIONS[title] || title}</p>
      </div>
      {!isMobile && <ViewStyle />}
    </div>
  );
};

export default memo(CategoryTitle);
