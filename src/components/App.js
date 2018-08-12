import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import { addToList, getList, isAdmin, toggleAdmin } from '../redux';
import Screen from './Screen';
import Button from './Button';
import './App.css';

class App extends Component {
  state = {
    input: '',
    output: '',
    query: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', this.monkeyComputes);
  }

  handleClick = (event) => {
    const value = event.target.value;
    switch (value) {
      case '=':
        try {
          const prepareInput = this.state.input.replace(/x/g, '*');
          const result = math.eval(prepareInput).toString();
          console.log(result);
          this.setState({ output: result });
          const operation = {
            input: `${this.state.input} = ${result}`,
            output: result
          }
          this.props.addToList(operation);
        } catch (e) {
          console.log(e.message);
          this.setState({ output: 'error', input: '' });
        }
        break;
      case 'CE':
        this.setState({ output: '', input: '' });
        break;

      default:
        this.setState({ input: this.state.input += value });
        break;
    }
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  monkeyComputes = (event) => {
    if (event.keyCode === 32) { //space key
      event.preventDefault();
      const nrOfOperations = this.getRandomInt(3, 200),
        operations = ['+', '-', '/', '*'];
      console.log('nrOfOperations', nrOfOperations);
      for (let i = 0; i <= nrOfOperations; i++) {
        const input1 = this.getRandomInt(-9999, 9999),
          input2 = this.getRandomInt(-9999, 9999),
          randOperatorIndex = this.getRandomInt(0, 3),
          randOperator = operations[randOperatorIndex];

        try {
          setTimeout(() => {
            const result = math.eval(input1 + randOperator + input2).toString();
            this.setState({ output: result, input: input1 + randOperator + input2 });
            console.log(`${input1} ${randOperator} ${input2} = ${result}`);
            console.log(result);
            const operation = {
              input: `${input1} ${randOperator} ${input2} = ${result}`,
              output: result
            }
            this.props.addToList(operation);
          }, 50 * i);
        } catch (e) {
          console.log(e.message, input1, randOperator, input2);
        }

      }
    }
  }

  handleSearch = (event) => {
    this.setState({ query: event.target.value })

  }

  toggleAdminMode = () => {
    this.props.toggleAdmin();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.monkeyComputes);
  }

  render() {
    const { list, isAdmin, toggleAdmin } = this.props;
    const filteredList = list.filter((item) =>
      item.output.indexOf(this.state.query) !== -1
    );
    const filteredListItems = filteredList.map((item, i) =>
      <li key={i}>{item.input}</li>
    );
    return (
      <div className="container">
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
            <Button value={'x'} handleClick={this.handleClick} type='operation' />
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

        <button onClick={toggleAdmin}>Admin mode</button>
        {isAdmin &&
          <div className="admin">
            <input
              placeholder="Search results..."
              type="number"
              onChange={this.handleSearch}
            />
            <ul>
              {filteredListItems}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: getList(state),
  isAdmin: isAdmin(state)
});

const mapDispatchToProps = {
  toggleAdmin,
  addToList
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
