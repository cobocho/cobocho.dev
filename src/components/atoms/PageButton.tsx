import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

type Props = {
  pageNumber: number;
}

const PageButtonBox = styled.li<{ className: string }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  background-color: ${props => props.theme.tagColor};
  opacity: 0.5;
  transition: all 0.5s;

  &.current-page {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-10px);
    opacity: 0.7;
  }

  &.current-page:hover {
    transform: translateY(0);
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 800;
    color: ${props => props.theme.tagTextColor};
  }
`

const PageButton = ({ pageNumber } : Props) => {
  const router = useRouter();
  const { category, page } = router.query;
  const isCurrentPage = page === String(pageNumber) || (!page && pageNumber === 1);

  const hrefLink = category ? `/category/${category}/${pageNumber}` : `/${pageNumber}`
  return (
    <PageButtonBox className={isCurrentPage ? 'current-page' : ''}>
      <Link href={hrefLink}>
        {pageNumber}
      </Link>
    </PageButtonBox>
  )
}

export default PageButton;