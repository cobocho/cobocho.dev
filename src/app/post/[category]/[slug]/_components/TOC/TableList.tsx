import { SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  head: Element;
  isCurrentHead: boolean;
}

const TableList = ({ head, isCurrentHead }: Props) => {
  return (
    <Container className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}>
      <a href={`#${head.id}`}>{head.textContent}</a>
    </Container>
  );
};

const Container = styled.li`
  --header-depth-gap: 15px;

  margin-bottom: 0.5rem;

  font-size: 0.9rem;
  font-weight: 400;

  list-style: none;

  transition: all 0.2s;

  &.selected {
    a {
      color: ${({ theme }) => theme.content};
    }

    transform: scale(1.05);
  }

  &.selected::before {
    content: '';

    position: absolute;
    left: -10px;
    top: 0;

    display: block;

    width: 3px;
    height: 100%;

    background-color: ${({ theme }) => theme.content};

    color: ${({ theme }) => theme.subContent};
  }

  a {
    color: ${({ theme }) => theme.subContent};
  }

  &.H2-header {
    margin-left: var(--header-depth-gap);
  }

  &.H3-header {
    margin-left: calc(var(--header-depth-gap) * 2);
  }
`;

export default TableList;
