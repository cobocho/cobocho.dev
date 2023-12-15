import styled from 'styled-components';
import OrchestrationAppearBottom from '@/app/_components/Motion/OrchestrationAppearBottom';

interface LinkProps {
  icon: JSX.Element;
  name: string;
  url: string;
}

interface Props {
  links: LinkProps[];
}

const URLList = ({ links }: Props) => {
  return (
    <Container>
      <ul>
        {links.map((link) => {
          return (
            <OrchestrationAppearBottom key={link.name}>
              <URLItem>
                {link.icon}
                <em>{link.name}</em>
                <a target="_blank" href={link.url}>
                  {link.url}
                </a>
              </URLItem>
            </OrchestrationAppearBottom>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;

const URLItem = styled.li`
  display: flex;
  align-items: center;

  margin-bottom: 16px;
  padding-top: 4px;

  svg {
    margin-right: 10px;
    fill: ${({ theme }) => theme.content};
  }

  em {
    margin-right: 6px;
  }

  a {
    color: ${({ theme }) => theme.subContent};
    text-decoration: underline;
  }
`;

export default URLList;
