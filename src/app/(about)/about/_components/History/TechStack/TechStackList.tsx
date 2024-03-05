import AppearBottom from '@/app/_components/Motion/AppearBottom';
import Orchestration from '@/app/_components/Motion/Orchestration';
import { TechStackProps } from '@/constants/techStacks';

import { techStackList } from './TechStackList.css';
import TechStackTag from './TechStackTag';

interface Props {
  techStacks: TechStackProps[];
}

const TechStackList = ({ techStacks }: Props) => {
  return (
    <ul className={techStackList}>
      <Orchestration stagger="fast">
        {techStacks.map(({ name }) => {
          return (
            <AppearBottom isOrchestration style={{ display: 'inline-block' }} key={name}>
              <TechStackTag tech={name} />
            </AppearBottom>
          );
        })}
      </Orchestration>
    </ul>
  );
};

export default TechStackList;
