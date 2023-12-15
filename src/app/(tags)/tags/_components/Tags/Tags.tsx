'use client';

import AppearLeft from '@/app/_components/Motion/AppearLeft';
import Orchestration from '@/app/_components/Motion/Orchestration';
import OrchestrationAppearLeft from '@/app/_components/Motion/OrchestrationAppearLeft';
import { do_hyeon } from '@/app/fonts';
import Tag from '@/types/tag';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  tags: Tag[];
}

const Tags = ({ tags }: Props) => {
  return (
    <Container>
      <AppearLeft>
        <h2 className="tags-title">Tags</h2>
      </AppearLeft>
      <Orchestration stagger="fast">
        <ul className="tags-list">
          {tags.map(({ tagName, quantity }) => {
            return (
              <OrchestrationAppearLeft className="tag" key={tagName}>
                <Link href={`/tags/${tagName}/1`}>
                  <p>
                    {tagName}
                    <em>({quantity})</em>
                  </p>
                </Link>
              </OrchestrationAppearLeft>
            );
          })}
        </ul>
      </Orchestration>
    </Container>
  );
};

const Container = styled.div`
  .tags-title {
    margin-bottom: 20px;
    font-family: ${do_hyeon.style.fontFamily};
    font-size: 48px;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;

    .tag {
      margin-right: 20px;
      margin-bottom: 20px;
      font-size: 20px;
      list-style: none;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }

      em {
        margin-left: 3px;
        font-size: 16px;
        color: #acacac;
      }
    }
  }
`;

export default Tags;
