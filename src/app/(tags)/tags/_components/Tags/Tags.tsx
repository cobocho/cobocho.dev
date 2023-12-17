'use client';

import Link from 'next/link';

import AppearLeft from '@/app/_components/Motion/AppearLeft';
import Orchestration from '@/app/_components/Motion/Orchestration';
import OrchestrationAppearLeft from '@/app/_components/Motion/OrchestrationAppearLeft';

import { do_hyeon } from '@/app/fonts';

import Tag from '@/types/tag';

import { tag, tagQuantity, tagsList, tagsListTitle } from './Tags.css';

interface Props {
  tags: Tag[];
}

const Tags = ({ tags }: Props) => {
  return (
    <div>
      <AppearLeft>
        <h2 className={`${tagsListTitle} ${do_hyeon.className}`}>Tags</h2>
      </AppearLeft>
      <Orchestration stagger="fast">
        <ul className={tagsList}>
          {tags.map(({ tagName, quantity }) => {
            return (
              <OrchestrationAppearLeft className={tag} key={tagName}>
                <Link href={`/tags/${tagName}/1`}>
                  <p>
                    {tagName}
                    <em className={tagQuantity}>({quantity})</em>
                  </p>
                </Link>
              </OrchestrationAppearLeft>
            );
          })}
        </ul>
      </Orchestration>
    </div>
  );
};

export default Tags;
