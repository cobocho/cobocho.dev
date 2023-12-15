import styled from 'styled-components';

import TechStackTag from './TechStackTag';
import Orchestration from '@/app/_components/Motion/Orchestration';
import OrchestrationAppearLeft from '@/app/_components/Motion/OrchestrationAppearLeft';

import { TechStackProps } from '@/constants/techStacks';

interface Props {
  techStacks: TechStackProps[];
}

const TechStackList = ({ techStacks }: Props) => {
  return (
    <Container>
      <Orchestration>
        {techStacks.map(({ name }) => {
          return (
            <OrchestrationAppearLeft className="tech-tag" key={name}>
              <TechStackTag tech={name} />
            </OrchestrationAppearLeft>
          );
        })}
      </Orchestration>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;

  .tech-tag {
    display: inline-block;
  }
`;

export default TechStackList;
