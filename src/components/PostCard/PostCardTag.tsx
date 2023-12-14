import React from 'react';
import styled from 'styled-components';

interface Props {
  tag: string;
}

const PostCardTag = ({ tag }: Props) => {
  return (
    <Container>
      <span>{tag}</span>
    </Container>
  );
};

const Container = styled.span`
  display: inline-block;

  width: fit-content;
  height: fit-content;

  padding: 6px 8px 4px 8px;
  margin-right: 6px;
  margin-top: 6px;

  border-radius: 12px;

  background-color: #fff;

  color: #000;
  font-weight: 700;

  transition: all 0.4s;

  z-index: 90;

  &:hover {
    background-color: #d4d4d4;
    transform: translateY(-4px);
  }
`;

export default PostCardTag;
