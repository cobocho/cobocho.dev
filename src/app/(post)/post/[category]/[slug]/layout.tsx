import React, { PropsWithChildren } from 'react';
import TOC from './_components/TOC/TOC';
import Giscus from './_components/Giscus/Giscus';
import { postLayout, postContainer, tocSection } from './layout.css';

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className={postLayout}>
      <article className={postContainer}>
        {children}
        <Giscus />
      </article>
      <div className={tocSection}>
        <TOC />
      </div>
    </section>
  );
};

export default PostLayout;
