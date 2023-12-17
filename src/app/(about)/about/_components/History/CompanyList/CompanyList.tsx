import styled from 'styled-components';

import { CompanyProps } from '@/constants/companies';
import LoadingIcon from '@/app/_components/Icons/LoadingIcon';
import OrchestrationAppearBottom from '@/app/_components/Motion/OrchestrationAppearBottom';
import {
  companyContainer,
  companyEmploymentPeriod,
  companyEnglishName,
  companyEnglishPosition,
  companyEnglishWork,
  companyName,
  companyPosition,
  companyWork,
} from './CompanyList.css';

interface Props {
  companies?: CompanyProps[];
}

const CompanyList = ({ companies }: Props) => {
  if (!companies) {
    return (
      <OrchestrationAppearBottom>
        <Company>
          <p className="blank">
            Searching...
            <LoadingIcon />
          </p>
        </Company>
      </OrchestrationAppearBottom>
    );
  }

  return (
    <OrchestrationAppearBottom>
      {companies.map((company) => {
        return (
          <div className={companyContainer} key={company.name}>
            <div className={companyName}>
              <p>{company.name}</p>
              <p className={companyEnglishName}>{company.engName}</p>
            </div>
            <div className={companyPosition}>
              <p>{company.position}</p>
              <p className={companyEnglishPosition}>{company.engPosition}</p>
            </div>
            <p className={companyEmploymentPeriod}>{company.employmentPeriod}</p>
            <div className={companyWork}>
              <span>{company.work}</span>
              <span className={companyEnglishWork}>{company.engWork}</span>
            </div>
          </div>
        );
      })}
    </OrchestrationAppearBottom>
  );
};

const Company = styled.div`
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
    h4 {
    }
  }

  .employment-period {
  }

  .position {
    .eng {
    }
  }

  .work {
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
