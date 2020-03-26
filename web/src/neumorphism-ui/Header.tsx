import styled from 'styled-components';
import React from 'react';
import Link from './Link';

const RawHeader = styled.header`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Author = styled.div`
  font-size: 20px;
`;

export default function Header(props: { title: string; author: string; link: string }) {
  return (
    <RawHeader>
      <Title>{props.title}</Title>
      <Link href={props.link} target="_blank">
        <Author>{props.author}</Author>
      </Link>
    </RawHeader>
  );
}
