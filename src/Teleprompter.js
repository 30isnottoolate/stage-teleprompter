import React from 'react';
import './Teleprompter.css';
import TextSlider from './TextSlider.js';
import TextList from './TextList.js';
import Settings from './Settings.js';
import StartHelp from './StartHelp.js';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const UI_COLOR_DEFAULT = "#99d3ff"; // green: #b4f8ff, blue: #99d3ff, red: #ffd6d9, yellow: #fff4ad, white: #ffffff
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION = "horizontal"; // horizontal / vertical

const colors = {
  1: {"name": "red", "code": "#ffd6d9"},
  2: {"name": "green", "code": "#b4f8ff"},
  3: {"name": "blue", "code": "#99d3ff"},
  4: {"name": "white", "code": "#ffffff"},
  5: {"name": "yellow", "code": "#fff4ad"},
}

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "start", //start, select, read, set
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

    this.defaultSettings = this.defaultSettings.bind(this);
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
      .then(response => response.json())
      .then(data => {
        this.setState(() => {
          if (localStorage["fontSize"] && localStorage["lineHeight"] && localStorage["uIColor"] &&
            localStorage["colorIndex"] && localStorage["textSpeed"] && localStorage["holdButtonTime"] &&
            localStorage["orientation"]) {
            return {
              data: data,
              textCount: data.textCount,
              fontSize: parseInt(localStorage.getItem("fontSize")),
              lineHeight: parseFloat(localStorage.getItem("lineHeight")),
              uIColor: localStorage.getItem("uIColor"),
              colorIndex: parseInt(localStorage.getItem("colorIndex")),
              textSpeed: parseInt(localStorage.getItem("textSpeed")),
              holdButtonTime: parseInt(localStorage.getItem("holdButtonTime")),
              orientation: localStorage.getItem("orientation")
            }
          } else {
            this.defaultLocalStorage();
            return {
              data: data,
              textCount: data.textCount,
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
      return {
        [setting]: value
      }
    });
  }

  defaultLocalStorage = () => {
    localStorage.setItem("fontSize", FONT_SIZE_DEFAULT);
    localStorage.setItem("lineHeight", LINE_HEIGHT_DEFAULT);
    localStorage.setItem("uIColor", UI_COLOR_DEFAULT);
    localStorage.setItem("colorIndex", COLOR_INDEX_DEFAULT);
    localStorage.setItem("textSpeed", TEXT_SPEED_DEFAULT);
    localStorage.setItem("holdButtonTime", HOLD_TIME_DEFAULT);
    localStorage.setItem("orientation", ORIENTATION);
  }

  defaultSettings() {
    this.setState(() => {
      this.defaultLocalStorage();
      return {
        fontSize: FONT_SIZE_DEFAULT,
        lineHeight: LINE_HEIGHT_DEFAULT,
        uIColor: UI_COLOR_DEFAULT,
        colorIndex: COLOR_INDEX_DEFAULT,
        textSpeed: TEXT_SPEED_DEFAULT,
        holdButtonTime: HOLD_TIME_DEFAULT,
        orientation: ORIENTATION
      }
    })
  }

  render() {
    if (this.state.mode === "start") {
      return (
        <StartHelp state={this.state} mode={this.changeMode} colors={colors} />
      )
    } else if (this.state.mode === "select") {
      return (
        <TextList state={this.state} mode={this.changeMode} index={this.changeIndex} colors={colors} />
      )
    } else if (this.state.mode === "read") {
      return (
        <TextSlider state={this.state} mode={this.changeMode} index={this.changeIndex} colors={colors} />
      )
    } else if (this.state.mode === "set") {
      return (
        <Settings state={this.state} mode={this.changeMode} settings={this.changeSettings} colors={colors} default={this.defaultSettings} />
      )
    }
  }
}

export default Teleprompter;
