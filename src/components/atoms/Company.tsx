import { motion } from "framer-motion";
import { appearFromBottom } from "@/styles/framer-motions";
import styled from "styled-components";

const CompanyBox = styled.div`
  h4 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    list-style: inside;
  }

  li::marker {
    margin-right: 2px;
  }
`

interface CompanyProps {
  name: string;
  tenure: string;
  work: string[];
}

const Company = ({name, tenure, work} : CompanyProps) => {
  return (
    <motion.article
      variants={appearFromBottom}
    >
      <CompanyBox>
        <h4>
          {name}
        </h4>
        <p>
          {tenure}
        </p>
        <ul>
          {
            work.map((item, idx) => <li key={idx}>{item}</li>)
          }
        </ul>
      </CompanyBox>
    </motion.article>
  )
}

export default Company;