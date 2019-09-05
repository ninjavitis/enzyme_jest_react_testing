import React, {Component, useState} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props)

    this.state={
      counter: 0,
      counterError:false
    }
  }

  handleIncrement = () => {
    this.setState({error: false, counter:this.state.counter +1})
    }


  handleDecrement = () => {
      if (this.state.counter - 1 < 0){
        this.setState({error: true})
        return
      } else {
        this.setState({counter: this.state.counter - 1})}
      }

  render(){
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        {this.state.error && <div data-test="counter-error">Error: counter can't go below zero.</div>}
        <button data-test="increment-button" onClick={()=>this.handleIncrement()}>Increment counter</button>
        <button data-test="decrement-button" onClick={()=>this.handleDecrement()}>Decrement counter</button>
      </div>
    );
  }
}

export default App;
