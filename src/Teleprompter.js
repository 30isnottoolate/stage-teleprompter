import React from 'react';
import './Teleprompter.css';
import TextSlide from './TextSlide';

const LOW_SPEED = 25; //this.state.speed = 1
const HIGH_SPEED = 10; //this.state.speed = 2
const START_POS = 50;

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "read", //read, select, set
      vault: "123",
      textCount: 0
    };

  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        vault: data,
        textCount: data.textCount
      });
    })
    .catch(() => console.log("Database missing."));
  }
  
  render() {
    if (this.state.mode === "select") {

    } else if (this.state.mode == "read") {
      return (
        <TextSlide state={this.state} />
      )
    } else if (this.state.mode === "set") {

    }
  }
}

export default Teleprompter;
