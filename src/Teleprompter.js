import React from 'react';
import './Teleprompter.css';
import TextSlide from './TextSlide';
import TextList from './TextList';
import Settings from './Settings.js';

const FONT_SIZE = 80;
const LINE_HEIGHT = 1.2;
const COLOR_DEFAULT = "#99d3ff"; // green: #b4f8ff, blue: #99d3ff, red: #ffd6d9, yellow: #fff4ad, white: #ffffff
const HOLD_TIME = 2000;

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select", //select, read, set
      data: "",
      textCount: 0,
      currentIndex: 1,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      uiColor: COLOR_DEFAULT,
      holdButtonTime: HOLD_TIME
    };

  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        data: data,
        textCount: data.textCount
      });
    })
    .catch(() => console.log("Database missing."));
  }

  changeIndex = (index) => {
    this.setState({
      currentIndex: index
    });
  }

  changeMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  changeSettings = (setting, value) => {
    this.setState((prevState) => {
      if (setting === "fontSize") {
        return {
          fontSize: value
        }
      } else if (setting === "lineHeight") {
        return {
          lineHeight: value
        }
      } else if (setting === "uiColor") {
        return {
          uIColor: value
        }
      } else if (setting === "textSpeed") {
        return {
          textSpeed: value
        }
      } else if (setting === "holdButtonTime") {
        return {
          holdButtonTime: value
        }
      } else if (setting === "orientation") {
        return {
          orientation: value
        }
      } else if (setting === "default") {
        return {
          fontSize: FONT_SIZE,
          lineHeight: LINE_HEIGHT,
          uIColor: COLOR_DEFAULT
        }
      }
    });
  }
  
  render() {
    if (this.state.mode === "select") {
      return (
        <TextList state={this.state} mode={this.changeMode} index={this.changeIndex} />
      )
    } else if (this.state.mode === "read") {
      return (
        <TextSlide state={this.state} mode={this.changeMode} />
      )
    } else if (this.state.mode === "set") {
      return (
        <Settings state={this.state} mode={this.changeMode} settings={this.changeSettings} />
      )
    }
  }
}

export default Teleprompter;
