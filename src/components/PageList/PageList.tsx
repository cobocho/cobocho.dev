import styled from 'styled-components';
import PageButton from './PageButton';
import usePagination from './usePagination';

interface Props {
  postQuantity: number;
}

const PageList = ({ postQuantity }: Props) => {
  const { pages, isFirstPage, isLastPage, increasePage, decreasePage } = usePagination(postQuantity || 0);

  return (
    <Container>
      <ul>
        <ArrowButton id="prev-btn" onClick={decreasePage} disabled={isFirstPage}>
          {'<'}
        </ArrowButton>
        {pages.map((page) => {
          return <PageButton pageNumber={page} postQuantity={postQuantity} key={page} />;
        })}
        <ArrowButton id="next-btn" onClick={increasePage} disabled={isLastPage}>
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
  color: ${({ theme }) => theme.content};

  &:disabled {
    color: ${({ theme }) => theme.middle};
  }

  &:hover {
    cursor: pointer;
  }
`;

export default PageList;
