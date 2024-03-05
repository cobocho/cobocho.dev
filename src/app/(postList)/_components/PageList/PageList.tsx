'use client';

import PageButton from './PageButton';
import { arrowButton, pageList, pageListWrapper } from './PageList.css';
import usePagination from './usePagination';

interface Props {
  postQuantity: number;
}

const PageList = ({ postQuantity }: Props) => {
  const { pages, isFirstPage, isLastPage, increasePage, decreasePage } = usePagination(
    postQuantity || 0,
  );

  return (
    <div className={pageListWrapper}>
      <ul className={pageList}>
        <button className={arrowButton} id="prev-btn" onClick={decreasePage} disabled={isFirstPage}>
          {'<'}
        </button>
        {pages.map((page) => {
          return <PageButton pageNumber={page} postQuantity={postQuantity} key={page} />;
        })}
        <button className={arrowButton} id="next-btn" onClick={increasePage} disabled={isLastPage}>
          {'>'}
        </button>
      </ul>
    </div>
  );
};

export default PageList;
