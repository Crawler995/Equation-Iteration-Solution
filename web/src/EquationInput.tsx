import React, { useState } from 'react';
import { Card, Label, Input, Button, Divider, Radio, Title, List, Link } from './neumorphism-ui';
import { submitEquationTotalInfo } from './network/http';

interface IProps {
  onSubmitSuccess: () => void;
}

export default function EqualityInput(props: IProps) {
  const [totalInfo, setTotalInfo] = useState({
    iterationFn: '',
    solutionRange: ['', ''],
    iterationMethod: 'Netwon'
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const iterationMethods = ['Aitken', 'Netwon', 'Netwon down-hill'];
  const canUseOperators = ['+', '-', '*', '/', '**'];
  const canUseMathFunctioins = [
    'abs(x)',
    'exp(x)',
    'log(x)',
    'log10(x)',
    'sqrt(x)',
    'sin(x)',
    'cos(x)',
    'tan(x)',
    'asin(x)',
    'acos(x)',
    'atan(x)'
  ];
  const canUseMathConstants = ['pi', 'e'];

  const iterationFnRegxStr = '^[0-9]+$';
  const iterationFnRegx = new RegExp(iterationFnRegxStr);
  // 0.23
  // 12.12
  // 12
  // 0
  const numberRegxStr = '^-?0.[0-9]+$|^-?[1-9]+.[0-9]+$|^-?[1-9][0-9]*$|^0$';
  const numberRegx = new RegExp(numberRegxStr);

  const isIterationFnLegal = (iterationFn: string) => {

  }

  const isInfoLegal = (info: typeof totalInfo) => {
    const isIterationFnLegal = iterationFnRegx.test(info.iterationFn);
    const isSolutionRangeLegal =
      numberRegx.test(info.solutionRange[0]) && numberRegx.test(info.solutionRange[1]);

    return isIterationFnLegal && isSolutionRangeLegal;
  };

  const iterationFnChangeHandler = (content: string) => {
    const info = { ...totalInfo, iterationFn: content };
    const isLegal = isInfoLegal(info);

    setTotalInfo(info);
    setDisabled(!isLegal);
  };

  const solutionRangeChangeHandler = (isStart: boolean, res: string) => {
    const [start, end] = totalInfo.solutionRange;
    const info = { ...totalInfo, solutionRange: isStart ? [res, end] : [start, res] };
    const isLegal = isInfoLegal(info);

    setTotalInfo(info);
    setDisabled(!isLegal);
  };

  const iterationMethodChangeHandler = (selectedItem: string) => {
    const info = { ...totalInfo, iterationMethod: selectedItem };
    const isLegal = isInfoLegal(info);

    setTotalInfo(info);
    setDisabled(!isLegal);
  };

  const runHandler = () => {
    console.log(totalInfo);

    setLoading(true);
    submitEquationTotalInfo(totalInfo)
      .then(res => {
        if (res.data.error === 0) {
          props.onSubmitSuccess();
        } else {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card>
      <Label>Input φ(x):</Label>
      <Input
        pattern={iterationFnRegxStr}
        value={totalInfo.iterationFn}
        onChange={iterationFnChangeHandler}
      />

      <Label>Select iteration method:</Label>
      <Radio
        name="iteration-method"
        items={iterationMethods}
        default={totalInfo.iterationMethod}
        onChange={iterationMethodChangeHandler}
      />

      <Label>Input solution range (α ∈ [?, ?]):</Label>
      <Input
        pattern={numberRegxStr}
        value={totalInfo.solutionRange[0]}
        onChange={solutionRangeChangeHandler.bind(null, true)}
      />
      <Input
        pattern={numberRegxStr}
        value={totalInfo.solutionRange[1]}
        onChange={solutionRangeChangeHandler.bind(null, false)}
      />

      <Button text="RUN" disabled={disabled} loading={loading} onClick={runHandler} />

      <Divider />

      <Title level={1} text="TIPS" />
      <Title level={3} text="Math Symbols" />
      <Title
        level={4}
        text="Use Python synatx. Your equation will be regarded as a Python sentence to execute."
      />
      <List.ListWrapper>
        <List.ListItem>You can only use "x" to represent the unknown value.</List.ListItem>
        <List.ListItem>{`You can use these operators: ${canUseOperators.join(', ')}`}</List.ListItem>
        <List.ListItem>{`You can use these math functions: ${canUseMathFunctioins.join(', ')}`}</List.ListItem>
        <List.ListItem>{`You can use these math constants: ${canUseMathConstants.join(', ')}`}</List.ListItem>
        <List.ListItem>
          You can find the meanings of symbols above in{' '}
          <Link href="https://www.runoob.com/python/python-numbers.html" target="_blank">
            Python Number
          </Link>
        </List.ListItem>
      </List.ListWrapper>
    </Card>
  );
}
