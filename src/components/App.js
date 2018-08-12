import React, { Component } from 'react';
import Screen from './Screen';
import Button from './Button';
import './App.css';

class App extends Component {
  state = {
    input: '',
    output: ''
  }

  handleClick = (event) => {
    const value = event.target.value;
    switch (value) {
      case '=':
        try {
          const result = eval(this.state.input).toString();
          console.log(result);
          this.setState({ output: result });
        } catch (e) {
          console.log(e.message);
          this.setState({ output: 'error', input: '' });
        }
        break;
      case 'CE':
        this.setState({ output: '', input: '' });
        break;

      default:
        this.setState({ input: this.state.input += value, output: '' });
        break;
    }
  }

  render() {
    return (
      <div className="calculator">
        <Screen input={this.state.input} output={this.state.output} />
        <div className="button-row">
          <Button value={'1'} handleClick={this.handleClick} type='input' />
          <Button value={'2'} handleClick={this.handleClick} type='input' />
          <Button value={'3'} handleClick={this.handleClick} type='input' />
          <Button value={'4'} handleClick={this.handleClick} type='input' />
          <Button value={'-'} handleClick={this.handleClick} type='operation' />
          <Button value={'+'} handleClick={this.handleClick} type='operation' />
        </div>
        <div className="button-row">
          <Button value={'5'} handleClick={this.handleClick} type='input' />
          <Button value={'6'} handleClick={this.handleClick} type='input' />
          <Button value={'7'} handleClick={this.handleClick} type='input' />
          <Button value={'8'} handleClick={this.handleClick} type='input' />
          <Button value={'*'} handleClick={this.handleClick} type='operation' />
          <Button value={'/'} handleClick={this.handleClick} type='operation' />
        </div>
        <div className="button-row">
          <Button value={'9'} handleClick={this.handleClick} type='input' />
          <Button value={'.'} handleClick={this.handleClick} type='input' />
          <Button value={'0'} handleClick={this.handleClick} type='input' />
          <Button value={'CE'} handleClick={this.handleClick} type='operation' />
          <Button value={'='} handleClick={this.handleClick} type='operation' />
        </div>
      </div>
    );
  }
}

export default App;
