import styled, { keyframes } from 'styled-components';
import { color } from './config';
import React, { useState, useEffect } from 'react';

const buttonShadow = `
  4px 4px 10px rgba(55, 84, 170, .15),
  -4px -4px 15px rgba(255, 255, 255, 1),
  inset 0px 0px 4px rgba(255, 255, 255, .2),
  inset 7px 7px 15px rgba(55, 84, 170, 0),
  inset -7px -7px 20px rgba(255, 255, 255, 0),
  0px 0px 2px rgba(255, 255, 255, 0)
`;

const buttonHoverShadow = `
  7px 7px 15px rgba(55, 84, 170, .15),
  -7px -7px 20px rgba(255, 255, 255, 1),
  inset 0px 0px 4px rgba(255, 255, 255, .2),
  inset 7px 7px 15px rgba(55, 84, 170, 0),
  inset -7px -7px 20px rgba(255, 255, 255, 0),
  0px 0px 4px rgba(255, 255, 255, 0)
`;

const buttonActiveShadow = `
  7px 7px 15px rgba(55, 84, 170, .15),
  -7px -7px 20px rgba(255, 255, 255, 1),
  inset 0px 0px 4px rgba(255, 255, 255, 0),
  inset 7px 7px 15px rgba(55, 84, 170, .15),
  inset -7px -7px 20px rgba(255, 255, 255, 1),
  0px 0px 4px rgba(255, 255, 255, .2)
`;

const RawButton = styled.button`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  outline: none;
  padding: 8px 36px;
  margin: 10px 0px 10px 0px;
  border-radius: 40px;
  font-size: 18px;

  color: ${color.grey};
  box-shadow: ${buttonShadow};
  transition: all 0.3s;

  &:focus {
    outline: none;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      color: ${color.primaryColor};
      box-shadow: ${buttonHoverShadow};
    }

    &:active {
      box-shadow: ${buttonActiveShadow};
    }
  }

  &:disabled {
    color: ${color.lightGrey};
  }
`;

const loadingAnimation = keyframes`
  0 {transform: translate(0, 0);}
  50% {transform: translate(0, 6px);}
  100% {transform: translate(0, 0);}
`

const ButtonLoadingLine = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0px 2px;
  border-radius: 8px;

  background-color: ${color.primaryColor}
`;

const ButtonLoadingWrapper = styled.div`
  height: 30px;
  padding: 10px 0px;
  margin-top: 30px;
  text-align: center;
  opacity: ${(props: {opacity: number}) => props.opacity};

  span {
    animation: ${loadingAnimation} 0.6s infinite;
  }
  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

function ButtonLoading(props: { loading: boolean }) {
  return (
    <ButtonLoadingWrapper opacity={props.loading ? 1 : 0}>
      <ButtonLoadingLine />
      <ButtonLoadingLine />
      <ButtonLoadingLine />
    </ButtonLoadingWrapper>
  );
}

interface IProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

function Button(props: IProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <ButtonLoading loading={loading} />
      <RawButton
        disabled={props.disabled || loading}
        onClick={props.onClick}
      >
        { props.text }
      </RawButton>
    </div>
  );
}

export default Button;
