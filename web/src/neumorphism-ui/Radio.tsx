import styled from 'styled-components';
import React from 'react';
import { color } from './config';

const Group = styled.div``;

const ItemWrapper = styled.div`
  width: fit-content;
  margin: 10px 10px;
`;

const shadow = `
  2px 2px 4px rgba(55, 84, 170, .15),
  -2px -2px 4px #FFF,
  inset 1px 1px 6px rgba(55, 84, 170, .15),
  inset -1px -1px 6px #FFF
`;

const checkedShadow = `
  inset 2px 2px 4px rgba(55, 84, 170, .15),
  inset -2px -2px 4px #FFF,
  2px 2px 6px rgba(55, 84, 170, .15),
  -2px -2px 6px #FFF
`;

const Item = styled.input.attrs({
  type: 'radio'
})`
  appearance: none;
  outline: none;

  &:checked + label::before {
    box-shadow: ${checkedShadow};
  }

  &:checked + label::after {
    background-color: ${color.primaryColor};
  }
`;

const Label = styled.label`
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;

    --radius: 20px;

    width: var(--radius);
    height: var(--radius);
    border-radius: var(--radius);
    font-size: 10px;
    margin-right: 8px;
    text-align: center;

    box-shadow: ${shadow};

    transition: all 0.2s;
  }

  &::after {
    content: '';
    display: inline-block;
    position: relative;

    --radius: 10px;

    margin-left: -100%;
    left: 15px;
    top: -1px;
    width: var(--radius);
    height: var(--radius);
    border-radius: var(--radius);

    background-color: rgba(0, 0, 0, 0);

    transition: all 0.2s;
  }
`;

export interface IRadioProps {
  name: string;
  items: string[];
  default: string;
  onChange: (selectedItem: string) => void;
}

function Radio(props: IRadioProps) {
  return (
    <Group>
      {props.items.map(item => (
        <ItemWrapper key={`${props.name}-${item}`}>
          <Item
            id={`${props.name}-${item}`}
            name={props.name}
            value={item}
            defaultChecked={props.default === item}
            onChange={e => props.onChange(e.target.value)}
          />
          <Label htmlFor={`${props.name}-${item}`}>{item}</Label>
        </ItemWrapper>
      ))}
    </Group>
  );
}

export default Radio;
