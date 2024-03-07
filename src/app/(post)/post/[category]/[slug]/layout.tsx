import { PropsWithChildren } from 'react';

import Giscus from './_components/Giscus/Giscus';
import TOC from './_components/TOC/TOC';
import { postContainer, postLayout, tocSection } from './layout.css';

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
