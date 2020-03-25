import React, { useState, ChangeEvent } from 'react';
import { Card, Label, Input, Button, Divider, Radio, Title, List, Link } from './neumorphism-ui';
import { submitEquationTotalInfo } from './utils/http';
import {
  validateIterationFn,
  canUseOperators,
  canUseMathFunctions,
  canUseMathConstants,
  alwaysUnmatchedRegxStr,
  alwaysMatchedRegxStr,
  validateNum
} from './utils/UserInputValidate';
import { Step } from './types';

interface IProps {
  // call after fetching result successfully
  onSubmitSuccess: (msg: Step[]) => void;
}

const defaultTotalInfo = {
  fnStr: 'exp(-x)',
  solutionRangeStart: '0.5',
  solutionRangeEnd: '0.6',
  iterationMethod: 'Aitken',
  accurateDigits: '5'
};

const defaultNeedValidateValues = {
  fnStr: true,
  solutionRange: true,
  accurateDigits: true
};

const iterationMethods = ['Aitken', 'Netwon', 'Netwon Down-Hill'];

export default function EqualityInput(props: IProps) {
  // user input
  const [totalInfo, setTotalInfo] = useState(defaultTotalInfo);
  // if run button is disabled
  const [disabled, setDisabled] = useState(false);
  // if run button is loading
  const [loading, setLoading] = useState(false);
  // make iterationFn input valid/invalid(red border)
  // when the iterationFn is legal, use the regx matches anything to make input element valid (has :valid)
  // when the iterationFn is illegal, use the regx matches almost nothing to make input element invalid (has :invalid)
  const [fakeIterationFnRegxStr, setFakeIterationFnRegxStr] = useState(alwaysMatchedRegxStr);
  // if the values user gives are valid
  const [needValidateValue, setNeedValidateValue] = useState(defaultNeedValidateValues);
  const [fnSymbol, setFnSymbol] = useState('φ');

  const isAllValueValid = (values: typeof needValidateValue) => {
    return Object.values(values).reduce((res, cur) => res && cur);
  };

  const afterAnyChanged = (
    info: typeof totalInfo,
    curNeedValidateValues: typeof needValidateValue
  ) => {
    setNeedValidateValue(curNeedValidateValues);
    setTotalInfo(info);
    setDisabled(!isAllValueValid(curNeedValidateValues));
  };

  const iterationFnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const info = { ...totalInfo, fnStr: e.target.value };
    const curNeedValidateValues = { ...needValidateValue, fnStr: validateIterationFn(info.fnStr) };

    afterAnyChanged(info, curNeedValidateValues);
    setFakeIterationFnRegxStr(
      curNeedValidateValues.fnStr ? alwaysMatchedRegxStr : alwaysUnmatchedRegxStr
    );
  };

  const solutionRangeChangeHandler = (isStart: boolean, e: ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    const changedKey = isStart ? 'solutionRangeStart' : 'solutionRangeEnd';
    const info = { ...totalInfo, [changedKey]: res };
    const isSolutionRangeLegal =
      validateNum(info.solutionRangeStart, undefined, undefined, 6) &&
      validateNum(info.solutionRangeEnd, undefined, undefined, 6) &&
      Number(info.solutionRangeStart) <= Number(info.solutionRangeEnd);
    const curNeedValidateValues = { ...needValidateValue, solutionRange: isSolutionRangeLegal };

    afterAnyChanged(info, curNeedValidateValues);
  };

  const iterationMethodChangeHandler = (selectedItem: string) => {
    const info = { ...totalInfo, iterationMethod: selectedItem };
    setTotalInfo(info);
    setFnSymbol(selectedItem === 'Aitken' ? 'φ' : 'f');
  };

  const accurateDigitsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const info = { ...totalInfo, digitsAfterPoint: e.target.value };
    const isDigitsAfterPointLegal = validateNum(info.digitsAfterPoint, 1, 10);

    const curNeedValidateValues = { ...needValidateValue, accurateDigits: isDigitsAfterPointLegal };
    afterAnyChanged(info, curNeedValidateValues);
  };

  const runHandler = () => {
    console.log(totalInfo);

    setLoading(true);
    submitEquationTotalInfo(totalInfo)
      .then(res => {
        if (res.data.code === 200) {
          props.onSubmitSuccess(res.data.data.steps as Step[]);
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

  const renderUserInput = () => {
    return (
      <>
        <Label>{`Input ${fnSymbol}(x):`}</Label>
        <Input
          type="text"
          pattern={fakeIterationFnRegxStr}
          value={totalInfo.fnStr}
          onChange={iterationFnChangeHandler}
          required
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
          type="number"
          step="0.000001"
          value={totalInfo.solutionRangeStart}
          onChange={solutionRangeChangeHandler.bind(null, true)}
          required
        />
        <Input
          type="number"
          step="0.000001"
          min={totalInfo.solutionRangeStart}
          value={totalInfo.solutionRangeEnd}
          onChange={solutionRangeChangeHandler.bind(null, false)}
          required
        />

        <Label>Accurate to ? digits after the decimal point:</Label>
        <Input
          type="number"
          step="1"
          min="1"
          max="10"
          value={totalInfo.accurateDigits}
          onChange={accurateDigitsChangeHandler}
          required
        />
      </>
    );
  };

  const renderTips = () => {
    return (
      <>
        <Title level={1} text="TIPS" />
        <Title level={3} text="Math Symbols" />
        <Title
          level={4}
          text="Use Python synatx. Your equation will be regarded as a Python sentence to execute."
        />
        <List.ListWrapper>
          <List.ListItem>You can only use "x" to represent the unknown value.</List.ListItem>
          <List.ListItem>{`You can use these operators: ${canUseOperators.join(
            ', '
          )}.`}</List.ListItem>
          <List.ListItem>{`You can use these math functions: ${canUseMathFunctions
            .map(fn => fn + '(x)')
            .join(', ')}.`}</List.ListItem>
          <List.ListItem>{`You can use these math constants: ${canUseMathConstants.join(
            ', '
          )}.`}</List.ListItem>
          <List.ListItem>
            You can find the meanings of symbols above in{' '}
            <Link href="https://www.runoob.com/python/python-numbers.html" target="_blank">
              Python Number
            </Link>
            .
          </List.ListItem>
          <List.ListItem>
            {`When the "Input ${fnSymbol}(x):" is with red border, it doesn't mean that the φ(x) has no synatx
            errors. It just tries avoiding XSS injection and shows the most obvious synatx errors.`}
          </List.ListItem>
        </List.ListWrapper>
      </>
    );
  };

  return (
    <Card>
      {renderUserInput()}
      <Button text="RUN" disabled={disabled} loading={loading} onClick={runHandler} />

      <Divider />

      {renderTips()}
    </Card>
  );
}
