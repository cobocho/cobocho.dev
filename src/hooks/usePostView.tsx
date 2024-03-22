'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

interface ViewContextValues {
  postView: PostViewFlag;
  changePostView: (view: PostViewFlag) => void;
}

export const postViewFlag = {
  two: 2,
  one: 1,
} as const;

export type PostViewFlag = (typeof postViewFlag)[keyof typeof postViewFlag];

const PostView = createContext<ViewContextValues | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const PostViewProvider = ({ children }: Props) => {
  const [postView, setPostView] = useState<PostViewFlag>(postViewFlag.two);

  const changePostView = useCallback((view: PostViewFlag) => {
    setPostView(view);
  }, []);

  useLayoutEffect(function setResizingEvent() {
    function resizingPostViewEvent() {
      if (window.innerWidth <= LAYOUT_VARIABLES.breakPoint) {
        setPostView(postViewFlag.two);
      } else {
        setPostView(postViewFlag.one);
      }
    }

    window.addEventListener('resize', resizingPostViewEvent);

    return () => {
      window.removeEventListener('resize', resizingPostViewEvent);
    };
  }, []);

  return (
    <PostView.Provider
      value={{
        postView,
        changePostView,
      }}
    >
      {children}
    </PostView.Provider>
  );
};

export const usePostView = () => {
  const context = useContext(PostView);

  if (!context) {
    throw new Error('usePostView 커스텀 훅은 PostViewProvider 내부에서 호출해야합니다.');
  }

  return context;
};
