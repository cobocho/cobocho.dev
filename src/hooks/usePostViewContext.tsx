'use client';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';

interface ViewContextValues {
  postView: PostViewFlag;
  changePostView: (view: PostViewFlag) => void;
}

export const postViewFlag = {
  two: 2,
  one: 1,
} as const;

export type PostViewFlag = (typeof postViewFlag)[keyof typeof postViewFlag];

const PostViewContext = createContext<ViewContextValues>({ postView: 2 } as ViewContextValues);

interface Props {
  children: React.ReactNode;
}

export const PostViewContextProvider = ({ children }: Props) => {
  const [postView, setPostView] = useState<PostViewFlag>(postViewFlag.two);

  const changePostView = useCallback((view: PostViewFlag) => {
    setPostView(view);
    localStorage.setItem('post_view', String(view));
  }, []);

  useLayoutEffect(function setLocalPostView() {
    if (window.innerWidth < LAYOUT_VARIABLES.breakPoint) {
      setPostView(postViewFlag.two);
      return;
    }
    const localPostView = Number(localStorage.getItem('post_view')) as PostViewFlag;

    if (localStorage.getItem('post_view')) {
      setPostView(localPostView);
    }
  }, []);

  useLayoutEffect(function setResizingEvent() {
    function resizingPostViewEvent() {
      const localPostView = Number(localStorage.getItem('post_view')) as PostViewFlag;

      if (window.innerWidth <= LAYOUT_VARIABLES.breakPoint) {
        setPostView(postViewFlag.two);
      } else {
        setPostView(localPostView);
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
