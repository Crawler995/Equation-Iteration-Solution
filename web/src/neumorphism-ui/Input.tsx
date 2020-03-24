import styled from 'styled-components';
import { color } from './config';
import React from 'react';

const inputShadow = `
  inset 2px 2px 7px rgba(55, 84, 170, .15), inset -5px -5px 7px #fff;
`;

const inputFocusShadow = `
  inset 3px 3px 10px rgba(55, 84, 170, .15), inset -7px -7px 10px #fff;
`;

const RawInput = styled.input`
  appearance: none;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0);
  width: 100%;
  border-radius: 10px;
  padding: 7px 15px;
  font-size: 18px;

  color: ${color.grey};
  background-color: ${color.backgroundColor};
  box-shadow: ${inputShadow};

  transition: all 0.3s;

  &:focus {
    box-shadow: ${inputFocusShadow};
  }

  &:invalid {
    border: 2px solid rgba(220, 53, 69, 0.7);
  }
`;

interface IProps {
  pattern: string;
  onChange: (content: string) => void;
}

function Input(props: IProps) {
  return <RawInput pattern={props.pattern} onChange={(e) => props.onChange(e.target.value)} />
}

export default Input;
