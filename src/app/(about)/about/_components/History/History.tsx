'use client';

import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { BlogIcon, EmailIcon, GithubIcon, VelogIcon } from '@/app/_components/Icons';
import CompanyList from './CompanyList/CompanyList';
import HistoryItem from './HistoryItem/HistoryItem';
import TechStackList from './TechStack/TechStackList';
import URLList from './UrlList/UrlList';

import TECH_STACKS from '@/constants/techStacks';
import NON_DEV_COMPANIES from '@/constants/companies';
import Orchestration from '@/app/_components/Motion/Orchestration';
import { contact, devCompanies, historyContainer, links, nonDevCompanies, techStacks } from './History.css';

const LINKS = [
  {
    name: 'Github',
    icon: <GithubIcon />,
    url: 'https://github.com/Cobocho',
  },
  {
    name: 'Blog',
    icon: <BlogIcon />,
    url: 'https://www.cobocho.dev',
  },
  {
    name: 'Velog',
    icon: <VelogIcon />,
    url: 'https://velog.io/@cobocho',
  },
];

const CONTACT = [
  {
    name: 'email',
    icon: <EmailIcon />,
    url: 'rlaalsrb1111@naver.com',
  },
];

const History = () => {
  return (
    <Orchestration>
      <div className={historyContainer}>
        <HistoryItem className={techStacks} title="Tech Stacks">
          <TechStackList techStacks={TECH_STACKS} />
        </HistoryItem>
        <HistoryItem className={links} title="Links">
          <URLList links={LINKS} />
        </HistoryItem>
        <HistoryItem className={contact} title="Contact">
          <URLList links={CONTACT} />
        </HistoryItem>
        <HistoryItem className={devCompanies} title="Work Experience">
          <CompanyList />
        </HistoryItem>
        <HistoryItem className={nonDevCompanies} title="Non-Developer Work Experience" toggleMode>
          <AnimatePresence>
            <CompanyList companies={NON_DEV_COMPANIES} />
          </AnimatePresence>
        </HistoryItem>
      </div>
    </Orchestration>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'a a'
    'b c'
    'd d'
    'e e';
  grid-row-gap: 40px;

  .tech-stacks {
    grid-area: a;
  }

  .links {
    grid-area: b;
  }

  .contact {
    grid-area: c;
  }

  .dev-companies {
    grid-area: d;
  }

  .non-dev-companies {
    grid-area: e;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export default History;
