import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import usePagination from './usePagination';

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
    <Container className={isCurrentPage(pageNumber) ? 'current-page' : ''}>
      <Link href={hrefLink}>{pageNumber}</Link>
    </Container>
  );
};

const Container = styled.li`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  transition: all 0.5s;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    font-weight: 500;
    font-size: 20px;
    color: ${({ theme }) => theme.subContent};

    &:hover {
      transform: translateY(-4px);
    }
  }

  &.current-page {
    background-color: ${({ theme }) => theme.content};

    a {
      color: ${({ theme }) => theme.theme};
    }

    &:hover {
      transform: translateY(0);
    }
  }
`;

export default PageButton;
