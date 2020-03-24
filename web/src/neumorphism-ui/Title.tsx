import styled, { css } from 'styled-components';
import { color } from './config';
import React from 'react';

const style = css`
  color: ${color.darkGrey};
  font-weight: normal;
  margin-bottom: 10px;
`;

const Title1 = styled.h1`
  font-size: 26px;
  ${style};
`;

const Title2 = styled.h2`
  font-size: 22px;
  ${style};
`;

const Title3 = styled.h3`
  font-size: 18px;
  ${style};
`;

const Title4 = styled.h4`
  font-size: 16px;
  ${style};
`;

function Title(props: {level: number, text: string}) {
  const {text, level} = props;
  const titles = [
    <Title1>{text}</Title1>,
    <Title2>{text}</Title2>,
    <Title3>{text}</Title3>,
    <Title4>{text}</Title4>
  ];
  return titles[level - 1];
}
export default Title;