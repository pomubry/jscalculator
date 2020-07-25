import React, { Component } from 'react';
import { evaluate } from 'mathjs';
import Display from './Display';
import github from './github.svg';

export class App extends Component {
  state = {
    total: '',
    input: '0',
    ans: '',
  };

  handleClick = (e) => {
    const { value } = e.target;
    const { input, total, ans } = this.state;
    const symbolRegex = /[+\-*/]/;
    const numRegex = /[0-9]|\./;
    const lastChar = total[total.length - 1];
    const secondLastChar = total[total.length - 2];

    /*Note about state:
        -'total' refers to the overall expression to be evaluated
        -'input' refers to the current expression the user is typing   */

    if (value === 'clear') {
      this.setState({ total: '', input: '0', ans: '' });
    }

    // Line 33 prevents multiple starting 0's,
    // prevents multiple decimal input,
    // and prevents operations as initial input
    else if (
      (value === '0' && total === '0') ||
      (value === '.' && input.includes(value) && !ans) ||
      (symbolRegex.test(value) && total === '')
    ) {
      return null;
    }

    // Checks for number inputs including a .(dot)
    else if (numRegex.test(value)) {
      const equalCheck = value === '.' ? '0.' : value;
      this.setState((prevState) => ({
        total:
          value === '.' && symbolRegex.test(lastChar)
            ? prevState.total + '0.'
            : total.includes('=') || total === ''
            ? equalCheck
            : total === '0' && !(value === '.')
            ? value
            : value === '0' && /[+\-*/]0/.test(secondLastChar + lastChar)
            ? prevState.total
            : /[1-9]/.test(value) && /[+\-*/]0/.test(secondLastChar + lastChar)
            ? prevState.total.slice(0, prevState.total.length - 1) + value
            : prevState.total + value,
        input:
          value === '.' && symbolRegex.test(lastChar)
            ? '0.'
            : total.includes('=') || total === ''
            ? equalCheck
            : (input === '0' || symbolRegex.test(lastChar)) && !(value === '.')
            ? value
            : prevState.input + value,
        ans: '',
      }));
    }

    // Checks for symbol inputs excluding '=' and 'AC'
    else if (symbolRegex.test(value)) {
      const index =
        numRegex.test(lastChar) ||
        (value === '-' && /[0-9][+*/]/.test(secondLastChar + lastChar))
          ? 0
          : /[+\-*/]-/.test(secondLastChar + '-')
          ? -2
          : value === '-' && lastChar === '-'
          ? null
          : -1;
      const copy = total.slice(0, total.length + index);
      total.includes('=')
        ? this.setState((prevState) => ({
            total: prevState.ans + value,
            input: value,
            ans: '',
          }))
        : index === null
        ? this.setState({ total, input, ans })
        : this.setState({ total: copy + value, input: value });
    }

    // Evaluates the answer using the { evaluate } function from mathjs
    else if (
      value === 'equals' &&
      numRegex.test(lastChar) &&
      !total.includes('=')
    ) {
      this.setState((prevState) => {
        const ans = evaluate(prevState.total);
        return {
          total: `${prevState.total}=${ans}`,
          input: `${ans}`,
          ans,
        };
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Javascript Calculator</h1>
        <Display stateCopy={this.state} handleClick={this.handleClick} />
        <div className="credits">
          <p>Designed and Coded By</p>
          <a href="https://github.com/pomubry" target="_blank">
            <img src={github} alt="github icon" />
            Bryan Taduran
          </a>
        </div>
      </div>
    );
  }
}

export default App;
