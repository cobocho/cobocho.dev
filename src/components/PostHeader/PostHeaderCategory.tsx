import { KOR_CATEGORY } from '@/constants/category-translate';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  category: string;
}

const PostHeaderCategory = ({ category }: Props) => {
  let transCategory;

  if (KOR_CATEGORY[category]) transCategory = KOR_CATEGORY[category];

  return (
    <Container>
      <Link className="home" href={`/`}>
        HOME
      </Link>
      /
      <Link className="category" href={`/category/${category}/1`}>
        {transCategory || category}
      </Link>
      /
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  color: ${({ theme }) => theme.subContent};

  a {
    color: inherit;

    transition: all 0.5s;

    &:hover {
      color: ${({ theme }) => theme.content};
    }
  }

  .home {
    margin-right: 6px;
  }

  .category {
    margin: 0 6px;

    text-transform: uppercase;
  }
`;

export default PostHeaderCategory;
