import React from 'react';
import './Teleprompter.css';
import TextSlide from './TextSlide';
import TextList from './TextList';

const FONT_SIZE = 80;
const LINE_HEIGHT = 1.2;
const COLOR_01 = "#99d3ff"; // green: #b4f8ff, blue: #99d3ff, red: #ffd6d9, yellow: #fff4ad, white: #ffffff

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select", //select, read, set
      vault: "",
      textCount: 0,
      currentIndex: 1,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      uiColor: COLOR_01,
      markerPos: FONT_SIZE * LINE_HEIGHT
    };

  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        vault: data,
        textCount: data.textCount
      });
    })
    .catch(() => console.log("Database missing."));
  }

  switchMode = (index, mode, pos) => {
    this.setState({
      mode: mode,
      currentIndex: index,
      markerPos: pos
    });
  }
  
  render() {
    if (this.state.mode === "select") {
      return (
        <TextList state={this.state} action={this.switchMode} />
      )
    } else if (this.state.mode === "read") {
      return (
        <TextSlide state={this.state} action={this.switchMode} />
      )
    } else if (this.state.mode === "set") {

    }
  }
}

export default Teleprompter;
