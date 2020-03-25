import React from 'react';
import { Card, List } from './neumorphism-ui';
import successIcon from './neumorphism-ui/icon/success.png';
import errorIcon from './neumorphism-ui/icon/error.png';
import { Step } from './types';
import styled, { keyframes } from 'styled-components';

const moveAnimation = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const FadeInCard = styled(Card)`
  animation: ${moveAnimation} 1s forwards;
`;

interface ItemProps {
  isFailed: boolean;
}

const WithIconListItem = styled(List.ListItem)`
  margin-bottom: 10px;
  font-size: 18px;
  list-style-image: url(${(props: ItemProps) => props.isFailed ? errorIcon : successIcon});
`;

export default function ResultShow(props: { solutionSteps: Step[] }) {
  if(props.solutionSteps.length === 0) {
    return <></>;
  }

  return (
    <FadeInCard>
      <List.ListWrapper>
        {
          props.solutionSteps.map((step) => (
            <WithIconListItem key={step.msg} isFailed={step.is_failed}>
              {step.msg}
            </WithIconListItem>
          ))
        }
      </List.ListWrapper>
    </FadeInCard>
  );
}
