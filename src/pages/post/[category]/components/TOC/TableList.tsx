import { SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  head: Element;
  isCurrentHead: boolean;
}

const TableList = ({ head, isCurrentHead }: Props) => {
  if (!head) return <></>;

  return (
    <Container className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}>
      <a href={`#${head.id}`}>{head.textContent}</a>
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  height: fit-content;
  margin: 0;
  margin-bottom: 4px;

  font-weight: 400;

  list-style: none;

  opacity: 0.4;

  transition: all 0.2s;

  &.selected {
    opacity: 0.7;
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

    background-color: ${(props) => props.theme.textColor};

    opacity: 0.5;
  }

  a {
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  }

  &.H2-header {
    margin-left: 15px;
  }

  &.H3-header {
    margin-left: 30px;
  }
`;

export default TableList;
