import styled from "styled-components";
import PageButton from "../atoms/PageButton";
import { motion } from "framer-motion";

type Props = {
  PageQuantity: number,
}

const PageListBox = styled.div`
  display: flex;
  width: 100%;
  height: 30px;

  ul {
    display: flex;
    margin: 0 auto;
  }

  li {
    margin-right: 10px;
  }

  li:last-child {
    margin-right: 0;
  }
`

const PageList = ({ PageQuantity } : Props) => {
  const pages = Array.from({ length: Math.ceil(PageQuantity / 10) }, (v, i) => i + 1);
  return (
    <PageListBox>
      <ul>
        {
          pages.map(page => {
            return <PageButton pageNumber={page} key={page} />
          })
        }
      </ul>
    </PageListBox>
  )
}

export default PageList;