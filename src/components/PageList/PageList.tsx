import styled from 'styled-components';
import PageButton from './PageButton';
import { useRouter } from 'next/router';

interface Props {
  postQuantity: number;
}

const PageList = ({ postQuantity }: Props) => {
  const router = useRouter();
  const { page } = router.query;

  const pages = Array.from({ length: Math.ceil(postQuantity / 10) }, (v, i) => i + 1);

  const isFirstPage = page === '1' || !page;
  const isLastPage = page ? +page === pages.length : pages.length === 1;

  const pageIncreaseHandler = () => {
    const { query } = router;

    if (!query.page) {
      router.push('/2');
      return;
    }

    const url = router.asPath.split('/');
    const nextPage = +query.page + 1;
    url[url.length - 1] = String(nextPage);

    router.push(url.join('/'));
  };

  const pageDecreaseHandler = () => {
    const { query } = router;

    if (!query.page) {
      router.push(`/${pages.length - 1}`);
      return;
    }

    const url = router.asPath.split('/');
    const prevPage = +query.page - 1;
    url[url.length - 1] = String(prevPage);

    router.push(url.join('/'));
  };

  return (
    <Container>
      <ul>
        <ArrowButton
          onClick={pageDecreaseHandler}
          disabled={isFirstPage}
        >
          {'<'}
        </ArrowButton>
        {pages.map((page) => {
          return (
            <PageButton
              pageNumber={page}
              key={page}
            />
          );
        })}
        <ArrowButton
          onClick={pageIncreaseHandler}
          disabled={isLastPage}
        >
          {'>'}
        </ArrowButton>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 30px;

  ul {
    width: fit-content;
    display: flex;
    align-items: center;

    margin: 0 auto;
  }

  li {
    margin-right: 10px;
  }

  li:last-child {
    margin-right: 0;
  }
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;

  margin: 0 20px;

  border: none;
  background-color: transparent;

  font-weight: 800;
  color: ${(props) => props.theme.textColor};

  opacity: 0.6;

  &:disabled {
    opacity: 0.1;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default PageList;
