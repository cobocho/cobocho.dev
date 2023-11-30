import Link from 'next/link';
import styled from 'styled-components';
import TagIcon from '../Icons/TagIcon';

interface Props {
  tags: string[];
}

const PostHeaderTags = ({ tags }: Props) => {
  return (
    <Container>
      <TagIcon />
      <ul className="tags">
        {tags.map((tag) => {
          return (
            <li className="tag" key={tag}>
              <Link href={`/tags/${tag}/1`}># {tag}</Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 15px 0;

  border-top: 0.5px solid ${({ theme }) => theme.content};
  border-bottom: 0.1px solid ${({ theme }) => theme.content};

  svg {
    transform: scale(0.7);
    margin-right: 8px;
    fill: ${({ theme }) => theme.subContent};
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    list-style-type: none;

    li {
      transition: all 1s;

      a {
        color: ${({ theme }) => theme.subContent};

        &:hover {
          color: ${({ theme }) => theme.content};
        }
      }
    }
  }
`;

export default PostHeaderTags;
