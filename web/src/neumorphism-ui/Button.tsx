import styled, { keyframes } from 'styled-components';
import { color } from './config';
import React from 'react';

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

export const RawButton = styled.button`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  outline: none;
  padding: 8px 36px;
  margin: 10px 0px 10px 0px;
  border-radius: 40px;
  font-size: 18px;

  color: ${color.primaryColor};
  box-shadow: ${buttonShadow};
  transition: all 0.3s;

  &:focus {
    outline: none;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
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
`;

const ButtonLoadingLine = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0px 2px;
  border-radius: 8px;

  background-color: ${color.primaryColor};
`;

const ButtonLoadingWrapper = styled.div`
  height: 30px;
  padding: 10px 0px;
  margin-top: 20px;
  text-align: center;
  opacity: ${(props: { opacity: number }) => props.opacity};

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

export interface IButtonProps {
  text: string;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

function Button(props: IButtonProps) {
  return (
    <div>
      <ButtonLoading loading={props.loading} />
      <RawButton disabled={props.disabled || props.loading} onClick={props.onClick}>
        {props.text}
      </RawButton>
    </div>
  );
}

export default Button;
