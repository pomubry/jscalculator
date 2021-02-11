import { useState } from 'react';
import { evaluate } from 'mathjs';
import Display from './components/Display';
import github from './styles/github.svg';

const App = () => {
  /*Note about state:
      -'total' refers to the overall expression to be evaluated. This is the expression at the top of the display.
      -'input' refers to the current expression the user is typing. This is the expression at the bottom of the display.   */

  const [total, setTotal] = useState('');
  const [input, setInput] = useState('0');
  const [ans, setAns] = useState('');

  const handleClick = (e) => {
    // symbolRegex is for the four basic operations: +, -, x, /
    const { value } = e.target;
    const symbolRegex = /[+\-*/]/;
    const numRegex = /[0-9]|\./;
    const lastChar = total[total.length - 1];
    const secondLastChar = total[total.length - 2];
    // If the input is a dot, append a '0' before it, else keep it as is.
    const equalCheck = value === '.' ? '0.' : value;

    // Clear all state when 'AC' is pressed.
    if (value === 'clear') {
      setTotal('');
      setAns('');
      setInput('0');
    }

    // Line 34 prevents multiple starting 0's,
    // prevents multiple decimal input,
    // and prevents symbols as initial input
    else if (
      (value === '0' && total === '0') ||
      (value === '.' && input.includes(value)) & !ans ||
      (symbolRegex.test(value) && total === '')
    ) {
      return null;
    }

    // Checks for number inputs including a .(dot)
    else if (numRegex.test(value)) {
      setTotal((prevState) =>
        // If a dot is pressed and the last character is an operation, append a '0' first.
        // This will make sure a correct number in decimal format is displayed.
        value === '.' && symbolRegex.test(lastChar)
          ? prevState + '0.'
          : // If a dot is pressed after evaluating the expression or if total is empty, use the value of equalCheck.
          // This will overwrite the total expression and start a new expression to be evaluated later.
          total.includes('=') || total === ''
          ? equalCheck
          : // If the total is just '0' and a number is pressed, replace it by the number.
          // This will prevent an a number from starting with '0'. e.g., '05+3=8'.
          total === '0' && !(value === '.')
          ? value
          : // If '0' is pressed and the total expression ends in '+0', '-0', '*0', '/0', e.g. '4+0', keep the current total state.
          // This will prevent adding another '0' at the end of the string.
          value === '0' && /[+\-*/]0/.test(secondLastChar + lastChar)
          ? prevState
          : // Same condition as above, except when an Integer that is not '0' is pressed.
          // This will also make sure a number from starting with 0.
          /[1-9]/.test(value) && /[+\-*/]0/.test(secondLastChar + lastChar)
          ? prevState.slice(0, prevState.length - 1) + value
          : // If the input is correct and all the checks above were passed, append it at the end.
            prevState + value
      );

      setInput((prevState) =>
        // If a dot is pressed and the last character is an operation, append a '0' first.
        // This will make sure a correct number in decimal format is displayed.
        value === '.' && symbolRegex.test(lastChar)
          ? '0.'
          : // If a dot is pressed after evaluating the expression or if total is empty, use the value of equalCheck.
          // This will overwrite the total expression and start a new expression to be evaluated later.
          total.includes('=') || total === ''
          ? equalCheck
          : // If a number is pressed and the current input is a '0' and the total's last character is an operator, return the number.
          // This will overwrite the current input to just the number, and prevent numbers starting from 0.
          (input === '0' || symbolRegex.test(lastChar)) && !(value === '.')
          ? value
          : // If the input is correct and all the checks above were passed, append it at the end.
            prevState + value
      );

      setAns('');
    }

    // Checks for symbol inputs excluding '=' and 'AC'.
    else if (symbolRegex.test(value)) {
      // The expression below will determine how much of the total expression will be copied.
      const index =
        // If the last character is a number,
        // or when a '-' is pressed and the total expression ends in a number then symbol, e.g., '6+'
        // return 0 to copy the entire total expression.
        // This will allow to add the symbol at the end of the total expression.
        numRegex.test(lastChar) ||
        (value === '-' && /[0-9][+*/]/.test(secondLastChar + lastChar))
          ? 0
          : // If the total expression ends in '+-', '--', '*-', '/-',
          // return -2 to prevent copying the last two characters.
          // This will allow to overwrite the 2 symbols at the end into just 1 symbol
          // since 3 consecutive symbols is a wrong math expression.
          /[+\-*/]-/.test(secondLastChar + '-')
          ? -2
          : // If '-' is pressed and the last character from the total expression is already '-',
          // return null to copy the entire total expression.
          // This prevents two '-' next to each other.
          value === '-' && lastChar === '-'
          ? null
          : // If a symbol is pressed that is not '-',
            // return -1 to prevent copying the last character.
            // This will allow to overwrite the last symbol into another one.
            -1;

      const copy = total.slice(0, total.length + index);

      // If the total expression was recently evaluated (due to the presence of '='),
      // Add the operator/symbol at the end of the total expression, overwrite the input to the symbol, and reset the ans.
      if (total.includes('=')) {
        setTotal(ans + value);
        setInput(value);
        setAns('');
      }
      // If the index above was evaluated to null, keep the state as is.
      else if (index === null) {
        setTotal((prevState) => prevState);
        setInput((prevState) => prevState);
        setAns((prevState) => prevState);
      }
      // Set the total expression based on what was copied, then add the symbol.
      // Also, set the input to the symbol pressed.
      else {
        setTotal(copy + value);
        setInput(value);
      }
    }

    // Evaluates the answer using the { evaluate } function from mathjs.
    // Check if '=' is pressed and the total expression ends in a number and it doesnt contain '='
    // This prevents evaluating an expression that was already evaluated.
    else if (
      value === 'equals' &&
      numRegex.test(lastChar) &&
      !total.includes('=')
    ) {
      const ans = evaluate(total);
      setTotal((prevState) => `${prevState}=${ans}`);
      setInput(`${ans}`);
      setAns(ans);
    }
  };

  return (
    <div className="App">
      <h1>Javascript Calculator</h1>
      {/* Display for the math expression */}
      <Display stateCopy={{ total, input }} handleClick={handleClick} />

      {/* Profile Link */}
      <div className="credits">
        <p>Designed and Coded By</p>
        <a href="https://github.com/pomubry" target="_blank">
          <img src={github} alt="github icon" />
          Bryan Taduran
        </a>
      </div>
    </div>
  );
};

export default App;
