import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import {
  addToList,
  getList,
  isAdmin,
  toggleAdmin,
  updateList
} from '../redux';
import Screen from './Screen';
import Buttons from './Buttons';
import Button from './Button';
import './App.css';

class App extends Component {
  state = {
    input: '',
    output: '',
    query: ''
  }

  searchInput = React.createRef();

  componentDidMount() {
    const { updateList } = this.props;
    const cachedList = JSON.parse(sessionStorage.getItem('list'));
    if (cachedList) {
      updateList(cachedList);
    }

    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 32) { //space key
      event.preventDefault();
      this.monkeyComputes();
    }
    else if (event.keyCode === 13) { //enter key
      event.preventDefault();
      this.handleSearch(event);
    }
  }

  handleClick = (event) => {
    const { value } = event.target;
    const { addToList, list } = this.props;
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
          addToList(operation);
          sessionStorage.setItem('list', JSON.stringify([...list, operation]));
        } catch (e) {
          console.log(e.message);
          this.setState({ output: 'error', input: '' });
        }
        break;
      case 'C':
        this.setState({ output: '', input: '' });
        break;

      default:
        this.setState({ input: this.state.input += value });
        break;
    }
  }

  clearHistory = () => {
    sessionStorage.clear();
    this.props.updateList([]);
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  monkeyComputes = () => {
    const { addToList } = this.props;
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
          addToList(operation);
          sessionStorage.setItem('list', JSON.stringify(this.props.list));
        }, 50 * i);
      } catch (e) {
        console.log(e.message, input1, randOperator, input2);
      }

    }
  }

  handleSearch = () => {
    const query = this.searchInput.current.value;
    console.log(query);
    this.setState({ query })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.monkeyComputes);
  }

  render() {
    const { isAdmin, list, toggleAdmin } = this.props;
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
          <Buttons handleClick={this.handleClick} />
        </div>

        <button onClick={toggleAdmin}>Admin mode</button>
        {isAdmin &&
          <div className="admin">
            <input
              placeholder="Search results..."
              type="number"
              ref={this.searchInput}
            />
            <button onClick={this.clearHistory}>Clear history</button>
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
  addToList,
  toggleAdmin,
  updateList
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
