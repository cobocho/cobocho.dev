import styled from 'styled-components';
import { getAllTags } from '../../lib/api';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead/SeoHead';
import PageType from '@/types/page';
import Tag from '@/types/tag';
import { appearFromLeft, orchestrateTags } from '@/styles/framer-motions';
import Link from 'next/link';
import { sortDescending } from '@/lib/utils';

interface Props {
  allTags: Tag[];
}

const TagsPageBox = styled.div`
  .tags-title {
    margin-bottom: 20px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
  }

  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
  }

  .tag:hover {
    text-decoration: underline;
  }

  .tag em {
    margin-left: 3px;
    font-size: 16px;
    color: #acacac;
  }
`;

export default function Index({ allTags }: Props) {
  return (
    <>
      <SeoHead page={PageType.Tags} />
      <TagsPageBox>
        <motion.section className="tags-list-wrapper" variants={appearFromLeft} initial="hidden" animate="visible">
          <h2 className="tags-title">Tags</h2>
          <motion.ul className="tags-list" variants={orchestrateTags} initial="hidden" animate="visible">
            {allTags.map(({ tagName, quantity }) => {
              return (
                <motion.li className="tag" key={tagName} variants={appearFromLeft}>
                  <Link href={`/tags/${tagName}/1`}>
                    <p>
                      {tagName}
                      <em>({quantity})</em>
                    </p>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.section>
      </TagsPageBox>
    </>
  );
}

export const getStaticProps = async () => {
  const allTags = getAllTags();
  const descendingTags = sortDescending(allTags, 'quantity');

  return {
    props: { allTags: descendingTags },
  };
};
