'use client';

import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import TOC from './_components/TOC/TOC';
import Giscus from './_components/Giscus/Giscus';

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <article className="post-wrapper">
        {children}
        <Giscus />
      </article>
      <div className="toc">
        <TOC />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .post-wrapper {
    width: 100%;
  }

  .toc {
    position: fixed;
    left: calc(900px + (100vw - 900px) / 2);
    width: 300px;
    height: 100dvh;
  }
`;

export default PostLayout;
