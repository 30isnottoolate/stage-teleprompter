import React from 'react';
import './Teleprompter.css';

class TextList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          if (this.props.state.textIndex > 1) {
            this.props.index(this.props.state.textIndex - 1);
          } else {
            this.props.index(this.props.state.textCount);
          }
        } else if (event.key === "c") {
          if (this.props.state.textIndex < this.props.state.textCount) {
            this.props.index(this.props.state.textIndex + 1);
          } else {
            this.props.index(1);
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
            this.props.mode("read");
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
    this.props.mode("read");
  }

  handleButtonB() {
    if (this.props.state.textIndex > 1) {
      this.props.index(this.props.state.textIndex - 1);
    } else {
      this.props.index(this.props.state.textCount);
    }
  }

  handleButtonC() {
    if (this.props.state.textIndex < this.props.state.textCount) {
      this.props.index(this.props.state.textIndex + 1);
    } else {
      this.props.index(1);
    }
  }

  render() {
    let listPos = (2 - this.props.state.textIndex) * this.props.state.fontSize * this.props.state.lineHeight;
    let stateColor = this.props.colors[this.props.state.colorIndex].code;
    let respWidth;
    let list = "";

    if (this.props.state.orientation === "vertical") {
      respWidth = "100vh"
    } else respWidth = "100vw";


    if (this.props.state.mode === "start" || this.props.state.mode === "select") {
      if (this.props.state.textCount === 0) {
        return (
          <div id="text-list" style={{ fontSize: this.props.state.fontSize }}>
            <p id="head-line">HELLO!</p>
            <p>Loading text list...</p>
          </div>
        )
      } else {
        for (const item in this.props.state.data.texts) {
          list = list + `<li>${this.props.state.data.texts[item].title}</li>`;
        }

        return (
          <div id="text-list" className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""} style={{ fontSize: this.props.state.fontSize, color: stateColor, lineHeight: this.props.state.lineHeight }}>
            <p id="head-line" className={this.props.state.textIndex === 1 ? "visible" : "hidden"}>SELECT:</p>
            <ul dangerouslySetInnerHTML={{ __html: list }} style={{ top: listPos, left: (this.props.state.fontSize * 0.69), width: respWidth }} />
            <p id="text-marker" style={{ left: (this.props.state.fontSize * 0.19) }}>&#129170;</p>
            <div id="control" style={{ width: respWidth }}>
              <button id="button-a" style={{ color: stateColor, borderColor: stateColor }} onClick={this.handleButtonA} >&#9711; / &#8984;</button>
              <button id="button-b" style={{ color: stateColor, borderColor: stateColor }} onClick={this.handleButtonB} >&#9651;</button>
              <button id="button-c" style={{ color: stateColor, borderColor: stateColor }} onClick={this.handleButtonC} >&#9661;</button>
            </div>
          </div>
        )
      }
    }
  }
}

export default TextList;
  