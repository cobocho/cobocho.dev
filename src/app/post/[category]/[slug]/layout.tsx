'use client';

import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import TOC from './_components/TOC/TOC';
import Giscus from './_components/Giscus/Giscus';

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <div className="post-wrapper">
        {children}
        <Giscus />
      </div>
      <TOC />
    </Container>
  );
};

const Container = styled.article`
  display: flex;

  .post-wrapper {
    width: 100%;
  }
`;

export default PostLayout;
