import styled from 'styled-components';
import { motion } from 'framer-motion';

import { appearFromBottom } from '@/styles/framer-motions';

import { CompanyProps } from '@/constants/companies';
import LoadingIcon from '@/components/Icons/LoadingIcon';

interface Props {
  companies?: CompanyProps[];
}

const CompanyList = ({ companies }: Props) => {
  if (!companies) {
    return (
      <motion.article variants={appearFromBottom}>
        <Company>
          <p className="blank">
            Searching...
            <LoadingIcon />
          </p>
        </Company>
      </motion.article>
    );
  }

  return (
    <motion.article variants={appearFromBottom}>
      {companies.map((company) => {
        return (
          <Company key={company.name}>
            <div className="names">
              <h3>{company.name}</h3>
              <h4>{company.engName}</h4>
            </div>
            <div className="position">
              <span>{company.position}</span>
              <span className="eng">{company.engPosition}</span>
            </div>
            <p className="employment-period">{company.employmentPeriod}</p>
            <div className="works">
              <span>{company.work}</span>
              <span className="eng">{company.engWork}</span>
            </div>
          </Company>
        );
      })}
    </motion.article>
  );
};

const Company = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 30px;

  .blank {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;

    svg {
      fill: ${({ theme }) => theme.content};
    }
  }

  .names {
    display: flex;
    gap: 6px;
    align-items: flex-end;

    font-size: 28px;

    h4 {
      font-size: 20px;
      color: ${({ theme }) => theme.subContent};
    }
  }

  .employment-period {
    font-size: 20px;
    color: ${({ theme }) => theme.subContent};
  }

  .position {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    font-size: 18px;
    color: ${({ theme }) => theme.subContent};

    .eng {
      color: ${({ theme }) => theme.subContent};
      white-space: normal;
    }
  }

  .works {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    font-size: 15px;
    white-space: break-spaces;

    span {
      display: flex;
    }

    .eng {
      color: ${({ theme }) => theme.subContent};
      white-space: normal;
    }
  }

  @media (max-width: 900px) {
    .names {
      flex-direction: column;
      align-items: flex-start;
    }

    .works {
      display: flex;
      flex-direction: column;
      white-space: normal;
    }
  }
`;

export default CompanyList;
