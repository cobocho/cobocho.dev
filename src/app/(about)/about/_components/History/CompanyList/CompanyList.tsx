import { CompanyProps } from '@/constants/companies';
import LoadingIcon from '@/app/_components/Icons/LoadingIcon';
import OrchestrationAppearBottom from '@/app/_components/Motion/OrchestrationAppearBottom';
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

interface Props {
  companies?: CompanyProps[];
}

const CompanyList = ({ companies }: Props) => {
  if (!companies) {
    return (
      <OrchestrationAppearBottom>
        <div className={companyContainer}>
          <p className={blankCompany}>
            Searching...
            <LoadingIcon />
          </p>
        </div>
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

export default CompanyList;
