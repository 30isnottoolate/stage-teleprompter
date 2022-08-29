import React from 'react';
import './Teleprompter.css';
import TextSlider from './TextSlider';
import TextList from './TextList';
import Settings from './Settings.js';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const UI_COLOR_DEFAULT = "#99d3ff"; // green: #b4f8ff, blue: #99d3ff, red: #ffd6d9, yellow: #fff4ad, white: #ffffff
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION = "horizontal"; // horizontal / vertical

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select", //select, read, set
      data: "",
      textCount: 0,
      textIndex: 1,
      fontSize: FONT_SIZE_DEFAULT,
      lineHeight: LINE_HEIGHT_DEFAULT,
      uIColor: UI_COLOR_DEFAULT,
      colorIndex: COLOR_INDEX_DEFAULT,
      textSpeed: TEXT_SPEED_DEFAULT,
      holdButtonTime: HOLD_TIME_DEFAULT,
      orientation: ORIENTATION
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
      textIndex: index
    });
  }

  changeMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  changeSettings = (setting, value) => {
    this.setState(() => {
      if (setting === "fontSize") {
        return {
          fontSize: value
        }
      } else if (setting === "lineHeight") {
        return {
          lineHeight: value
        }
      } else if (setting === "uIColor") {
        return {
          uIColor: value
        }
      } else if (setting === "colorIndex") {
        return {
          colorIndex: value
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
          fontSize: FONT_SIZE_DEFAULT,
          lineHeight: LINE_HEIGHT_DEFAULT,
          uIColor: UI_COLOR_DEFAULT,
          colorIndex: COLOR_INDEX_DEFAULT,
          textSpeed: TEXT_SPEED_DEFAULT,
          holdButtonTime: HOLD_TIME_DEFAULT,
          orientation: ORIENTATION
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
        <TextSlider state={this.state} mode={this.changeMode} />
      )
    } else if (this.state.mode === "set") {
      return (
        <Settings state={this.state} mode={this.changeMode} settings={this.changeSettings} />
      )
    }
  }
}

export default Teleprompter;
