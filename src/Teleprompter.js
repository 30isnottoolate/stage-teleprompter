import React from 'react';
import './Teleprompter.css';
import TextSlide from './TextSlide';
import TextList from './TextList';

const FONT_SIZE = 80;
const LINE_HEIGHT = 1.2;

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select", //select, read, set
      vault: "",
      textCount: 0,
      currentIndex: 1,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT
    };

  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        vault: data,
        textCount: data.textCount,
        currentIndex: 1
      });
    })
    .catch(() => console.log("Database missing."));
  }

  switchMode = (index, mode) => {
    this.setState({
      mode: mode,
      currentIndex: index
    });
  }
  
  render() {
    if (this.state.mode === "select") {
      return (
        <TextList state={this.state} action={this.switchMode} />
      )
    } else if (this.state.mode == "read") {
      return (
        <TextSlide state={this.state} action={this.switchMode} />
      )
    } else if (this.state.mode === "set") {

    }
  }
}

export default Teleprompter;
