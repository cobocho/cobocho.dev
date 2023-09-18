import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {
  pageNumber: number;
}

const PageButton = ({ pageNumber }: Props) => {
  const router = useRouter();
  const { page } = router.query;

  const isCurrentPage = page === String(pageNumber) || (!page && pageNumber === 1);

  const url = router.asPath.split('/');

  if (page) {
    url[url.length - 1] = String(pageNumber);
  }

  const hrefLink = page ? url.join('/') : `/${pageNumber}`;

  return (
    <Container className={isCurrentPage ? 'current-page' : ''}>
      <Link href={hrefLink}>{pageNumber}</Link>
    </Container>
  );
};

const Container = styled.li<{ className: string }>`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  opacity: 0.2;
  transition: all 0.5s;

  &.current-page {
    opacity: 1;
    background-color: ${(props) => props.theme.textColor};

    a {
      color: ${(props) => props.theme.bgColor};
    }
  }

  &.current-page:hover {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover {
    transform: translateY(-4px);
    opacity: 0.7;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    font-family: sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.textColor};
  }
`;

export default PageButton;
