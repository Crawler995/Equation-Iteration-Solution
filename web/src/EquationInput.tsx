import React, { useState } from 'react';
import { Card, Label, Input, Button, Divider, Radio } from './neumorphism-ui';
import Title from './neumorphism-ui/Title';

export default function EqualityInput() {
  const [disabled, setDisabled] = useState(true);
  
  const equationRegxStr = '[0-9]+';
  const equationRegx = new RegExp(equationRegxStr);

  const totalInfo = {
    equation: '',
    selectedItem: ''
  };

  const equationChangeHandler = (content: string) => {
    setDisabled(!equationRegx.test(content));
    totalInfo.equation = content;
  }

  const iterationMethodChangeHandler = (selectedItem: string) => {
    totalInfo.selectedItem = selectedItem;
  }

  const runHandler = () => {
    console.log(totalInfo);
  }

  return (
    <Card>
      <Label>Input your equation:</Label>
      <Input
        pattern={equationRegxStr}
        onChange={equationChangeHandler}
      />

      <Label>Select iteration method:</Label>
      <Radio
        name="iteration-method"
        items={['Netwon', 'Unknown']}
        default='Netwon'
        onChanged={iterationMethodChangeHandler}
      />
      <Button
        text="RUN" 
        disabled={disabled}
        onClick={runHandler}
      />

      <Divider />

      <Title level={1} text="TIPS" />
      <Title level={3} text="Math Symbols" />
    </Card>
  );
}
