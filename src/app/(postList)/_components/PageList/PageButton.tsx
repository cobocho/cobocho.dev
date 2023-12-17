import Link from 'next/link';
import usePagination from './usePagination';
import { pageButton, pageButtonLink } from './PageButton.css';

interface Props {
  pageNumber: number;
  postQuantity: number;
}

const getComputedUrl = (url: string, pageNumber: number, page?: string) => {
  let result = url.split('/');
  if (page) {
    result[result.length - 1] = String(pageNumber);
  }
  return page ? result.join('/') : `/${pageNumber}`;
};

const PageButton = ({ pageNumber, postQuantity }: Props) => {
  const { page, url, isCurrentPage } = usePagination(postQuantity);
  const hrefLink = getComputedUrl(url, pageNumber, page as string);

  return (
    <li className={`${pageButton}${isCurrentPage(pageNumber) ? ' current-page' : ''}`}>
      <Link className={pageButtonLink} href={hrefLink}>
        {pageNumber}
      </Link>
    </li>
  );
};

export default PageButton;
