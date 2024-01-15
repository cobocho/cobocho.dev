import { CompanyProps } from '@/constants/companies';
import LoadingIcon from '@/app/_components/Icons/LoadingIcon';
import {
  blankCompany,
  companyContainer,
  companyEmploymentPeriod,
  companyEnglishName,
  companyEnglishPosition,
  companyEnglishWork,
  companyName,
  companyPosition,
  companyWork,
} from './CompanyList.css';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

interface Props {
  companies?: CompanyProps[];
}

const CompanyList = ({ companies }: Props) => {
  if (!companies) {
    return (
      <AppearBottom isOrchestration>
        <div className={companyContainer}>
          <p className={blankCompany}>
            Searching...
            <LoadingIcon />
          </p>
        </div>
      </AppearBottom>
    );
  }

  return (
    <AppearBottom isOrchestration>
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
    </AppearBottom>
  );
};

export default CompanyList;
