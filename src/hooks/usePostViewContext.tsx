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

const PostViewContext = createContext<ViewContextValues>({ postView: 1 } as ViewContextValues);

interface Props {
  children: React.ReactNode;
}

export const PostViewContextProvider = ({ children }: Props) => {
  const [postView, setPostView] = useState<PostViewFlag>(postViewFlag.one);

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
    <PostViewContext.Provider
      value={{
        postView,
        changePostView,
      }}
    >
      {children}
    </PostViewContext.Provider>
  );
};

export const usePostViewContext = () => {
  return useContext(PostViewContext);
};
