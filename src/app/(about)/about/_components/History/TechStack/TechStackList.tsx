import TechStackTag from './TechStackTag';
import Orchestration from '@/app/_components/Motion/Orchestration';
import OrchestrationAppearLeft from '@/app/_components/Motion/OrchestrationAppearLeft';

import { TechStackProps } from '@/constants/techStacks';
import { techStackList } from './TechStackList.css';

interface Props {
  techStacks: TechStackProps[];
}

const TechStackList = ({ techStacks }: Props) => {
  return (
    <ul className={techStackList}>
      <Orchestration stagger="fast">
        {techStacks.map(({ name }) => {
          return (
            <OrchestrationAppearLeft style={{ display: 'inline-block' }} key={name}>
              <TechStackTag tech={name} />
            </OrchestrationAppearLeft>
          );
        })}
      </Orchestration>
    </ul>
  );
};

export default TechStackList;
