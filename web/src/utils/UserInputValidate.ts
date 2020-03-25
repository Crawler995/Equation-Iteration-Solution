export const alwaysUnmatchedRegxStr = '^🚀$';
export const alwaysMatchedRegxStr = '.*';
const numRegx = /-?(\d+\.\d+|\d+|\.\d+)([eE][-+]?\d+)?/;

export const canUseOperators = ['+', '-', '*', '/', '**'];
export const canUseMathFunctions = [
  'asin',
  'acos',
  'atan',
  'sin',
  'cos',
  'tan',
  'abs',
  'exp',
  'log10',
  'log',
  'sqrt'
];
export const canUseMathConstants = ['pi', 'e'];
const canUseOtherSymbols = ['x'];

export const validateNum = (
  numStr: string,
  min?: number,
  max?: number,
  maxDigitsAfterPoint?: number
) => {
  let res = numRegx.test(numStr);
  if (!res) return false;

  const num = Number(numStr);
  if (min) res = num >= min;
  if (!res) return false;

  if (max) res = num <= max;
  if (!res) return false;

  if (maxDigitsAfterPoint) res = (numStr.split('.')[1]?.length ?? -1) <= maxDigitsAfterPoint;
  return res;
};

export const validateIterationFn = (iterationFn: string) => {
  if (iterationFn === '') {
    return false;
  }

  iterationFn = iterationFn.replace(new RegExp(numRegx, 'g'), '');

  canUseOperators.forEach(operator => {
    if (operator !== '/') {
      if (operator !== '**') {
        operator = '\\' + operator;
      } else {
        operator = '\\*\\*';
      }
    }
    const regx = new RegExp('\\s*' + operator + '\\s*', 'g');
    iterationFn = iterationFn.replace(regx, '');
  });

  canUseMathFunctions.forEach(fn => {
    const regx = new RegExp('\\s*' + fn + '\\s*\\(\\s*.+\\s*\\)\\s*', 'g');
    iterationFn = iterationFn.replace(regx, '');
  });

  canUseMathConstants.forEach(constant => {
    const regx = new RegExp('\\s*' + constant + '\\s*', 'g');
    iterationFn = iterationFn.replace(regx, '');
  });

  canUseOtherSymbols.forEach(symbol => {
    iterationFn = iterationFn.replace(new RegExp(symbol, 'g'), '');
  });
  console.log(iterationFn)
  return iterationFn.trim() === '';
};
