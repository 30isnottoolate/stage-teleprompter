import React from 'react';
import './Teleprompter.css';

class StartHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpIndex: 1,
      keyHold: false,
      keyDownTime: ""
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyHold = this.handleKeyHold.bind(this);
    this.handleButtonA = this.handleButtonA.bind(this);
    this.handleButtonB = this.handleButtonB.bind(this);
    this.handleButtonC = this.handleButtonC.bind(this);
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
      if (!prevState.keyHold) {
        if (event.key === "a") {
          return {
            keyHold: true,
            keyDownTime: (new Date()).getTime()
          }
        } else if (event.key === "b") {
          return {
            keyHold: true,
            keyDownTime: (new Date()).getTime()
          }
        } else if (event.key === "c") {
          if (this.state.helpIndex < 5) {
            return {
              helpIndex: prevState.helpIndex + 1
            }
          } else {
            return {
              helpIndex: 1
            }
          }
        }
      }
    });
  }

  handleKeyHold(event) {
    this.setState((prevState) => {
      if (prevState.keyHold) {
        if (event.key === "a") {
          if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
            this.props.mode("set");
            return {
              keyHold: false,
              keyDownTime: ""
            }
          } else {
            return {
              keyHold: false,
              keyDownTime: ""
            }
          }
        } else if (event.key === "b") {
          if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
            this.props.mode("select");
            return {
              keyHold: false,
              keyDownTime: ""
            }
          } else {
            return {
              keyHold: false,
              keyDownTime: ""
            }
          }
        }
      }
    });
  }

  handleButtonA() {
    this.props.mode("set");
  }

  handleButtonB() {
    this.props.mode("select");
  }

  handleButtonC() {

  }

  render() {
    let listPosY = (3 - this.state.helpIndex) * this.props.state.fontSize * this.props.state.lineHeight;
    let respWidth;

    if (this.props.state.orientation === "vertical") {
      respWidth = "100vh";
    } else respWidth = "100vw";

    return (
      <div id="text-list" className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""} style={{ fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight }}>
        <p id="head-line" className={this.state.helpIndex <= 2 ? "visible" : "hidden"}>KV Teleprompter</p>
        <p id="sub-line" className={this.state.helpIndex === 1 ? "visible" : "hidden"} style={{position: "absolute", left: (this.props.state.fontSize * 0.69)}}>Control symbols:</p>
        <p id="text-marker" style={{position: "absolute", left: (this.props.state.fontSize * 0.19), top: (2 * this.props.state.fontSize * this.props.state.lineHeight)}}>&#129170;</p>
        <ul style={{ position: "absolute", top: listPosY, left: this.props.state.fontSize * 0.69, width: respWidth}}>
            <li>&#9651;&#9661; - Previous / Next</li>
            <li>&#9665;&#9655; - Change setting</li>
            <li>&#9655;&#9634; - Start / Stop</li>
            <li>&#9636; - Text List</li>
            <li>&#8984; - Settings</li>
          </ul>
        <div id="control" style={{width: respWidth}}>
          <button id="button-a" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonA} >&#8984;</button>
          <button id="button-b" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonB} >&#9636;</button>
          <button id="button-c" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonC} >&#9661;</button>
        </div>
      </div>
    )
  }
}

export default StartHelp;
