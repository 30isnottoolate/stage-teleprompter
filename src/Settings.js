import React from 'react';
import './Teleprompter.css';

const COLORS = {
  1: {"name": "red", "code": "#ffd6d9"},
  2: {"name": "green", "code": "#b4f8ff"},
  3: {"name": "blue", "code": "#99d3ff"},
  4: {"name": "white", "code": "#ffffff"},
  5: {"name": "yellow", "code": "#fff4ad"},
}

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        keyHold: false,
        keyDownTime: "",
        settingsIndex: 1,
        inChangeMode: false
      };

      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleKeyHold = this.handleKeyHold.bind(this);
      this.getColorName = this.getColorName.bind(this);
  
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
      document.addEventListener("keyup", this.handleKeyHold);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
      document.removeEventListener("keyup", this.handleKeyHold);
    }

    handleKeyPress(event) {
      this.setState((prevState) => {
        if (!this.state.keyHold) {
          if (!this.state.inChangeMode) {
            if (event.key === "a") {
              return {
                keyHold: true,
                keyDownTime: (new Date()).getTime()
              }
            } else if (event.key === "b") {
              if (this.state.settingsIndex > 1) {
                return {
                  settingsIndex: prevState.settingsIndex - 1
                }
              } else {
                return {
                  settingsIndex: 7
                }
              }
            } else if (event.key === "c") {
              if (this.state.settingsIndex < 7) {
                return {
                  settingsIndex: prevState.settingsIndex + 1
                }
              } else {
                return {
                  settingsIndex: 1
                }
              }
            }
          } else {
            if (event.key === "a") {
              return {
                inChangeMode: false
              }
            } else if (event.key === "b") {
              if (prevState.settingsIndex === 1 && this.props.state.fontSize > 80) {
                this.props.settings("fontSize", this.props.state.fontSize - 1);
              } else if (prevState.settingsIndex === 2 && this.props.state.lineHeight > 1) {
                this.props.settings("lineHeight", this.props.state.lineHeight - 0.01);
              } else if (prevState.settingsIndex === 3 && this.props.state.colorIndex > 1) {
                this.props.settings("uIColor", COLORS[this.props.state.colorIndex - 1].code);
                this.props.settings("colorIndex", this.props.state.colorIndex - 1);
              } else if (prevState.settingsIndex === 4 && this.props.state.textSpeed > 20) {
                this.props.settings("textSpeed", this.props.state.textSpeed - 1);
              } else if (prevState.settingsIndex === 5 && this.props.state.holdButtonTime > 1000) {
                this.props.settings("holdButtonTime", this.props.state.holdButtonTime - 10);
              } else if (prevState.settingsIndex === 6) {
                if (this.props.state.orientation === "horizontal") {
                  this.props.settings("orientation", "vertical");
                } else {
                  this.props.settings("orientation", "horizontal");
                }
              }
            } else if (event.key === "c") {
              if (prevState.settingsIndex === 1 && this.props.state.fontSize < 150) {
                this.props.settings("fontSize", this.props.state.fontSize + 1);
              } else if (prevState.settingsIndex === 2 && this.props.state.lineHeight < 1.5) {
                this.props.settings("lineHeight", this.props.state.lineHeight + 0.01);
              } else if (prevState.settingsIndex === 3 && this.props.state.colorIndex < 5) {
                this.props.settings("uIColor", COLORS[this.props.state.colorIndex + 1].code);
                this.props.settings("colorIndex", this.props.state.colorIndex + 1);
              } else if (prevState.settingsIndex === 4 && this.props.state.textSpeed < 200) {
                this.props.settings("textSpeed", this.props.state.textSpeed + 1);
              } else if (prevState.settingsIndex === 5 && this.props.state.holdButtonTime < 5000) {
                this.props.settings("holdButtonTime", this.props.state.holdButtonTime + 10);
              } else if (prevState.settingsIndex === 6) {
                if (this.props.state.orientation === "horizontal") {
                  this.props.settings("orientation", "vertical");
                } else {
                  this.props.settings("orientation", "horizontal");
                }
              }
            }
          }
        }
      });
    }

    handleKeyHold(event) {
      this.setState(() => {
        if (this.state.keyHold) {
          if (event.key === "a") {
            if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
              this.props.mode("select");
              return {
                keyHold: false,
                keyDownTime: ""
              }
            } else {
              if (this.state.settingsIndex === 7) {
                this.props.settings("default");
                return {
                  keyHold: false,
                  keyDownTime: ""
                }
              } else {
                return {
                  keyHold: false,
                  keyDownTime: "",
                  inChangeMode: true
                }
              }
            }
          }
        }
      });
    }

    getColorName() {
      for (let item in COLORS) {
        if (COLORS[item].code === this.props.state.uIColor) {
          return COLORS[item].name;
        }
      }
    }
  
    render() {
      let listPos = (2 - this.state.settingsIndex) * this.props.state.fontSize * this.props.state.lineHeight;
      let markerPos;
      if (this.state.inChangeMode) {
        markerPos = this.props.state.fontSize * 7.5;
      } else markerPos = this.props.state.fontSize * 0.19;

      return (
        <div id="settings" style={{fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight}}>
          <p id="head-line" className={this.state.settingsIndex === 1 ? "visible" : "hidden"}>SETTINGS:</p>
          <p id="text-marker" style={{position: "absolute", left: markerPos}} >&#129170;</p>
          <ul style={{ position: "absolute", top: listPos, left: (this.props.state.fontSize * 0.69) }}>
            <li>Font size:</li>
            <li>Line height:</li>
            <li>UI color:</li>
            <li>Text speed:</li>
            <li>Alt key time:</li>
            <li>Orientation:</li>
            <li>Default settings</li>
          </ul>
          <ul style={{ position: "absolute", top: listPos, left: this.props.state.fontSize * 8.02 }}>
            <li>{this.props.state.fontSize}</li>
            <li>{this.props.state.lineHeight.toFixed(2)}</li>
            <li>{this.getColorName()}</li>
            <li>{this.props.state.textSpeed}%</li>
            <li>{this.props.state.holdButtonTime} ms</li>
            <li>{this.props.state.orientation}</li>
            <li></li>
          </ul>
          <div id="control">
            <button id="button-a" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#9711; / &#9636;</button>
            <button id="button-b" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>{this.state.inChangeMode ? String.fromCharCode(9665) : String.fromCharCode(9651)}</button>
            <button id="button-c" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>{this.state.inChangeMode ? String.fromCharCode(9655) : String.fromCharCode(9661)}</button>
          </div>
        </div>
      )
    }
  }

export default Settings;
