import React from 'react';
import './Teleprompter.css';

class StartHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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

  handleKeyPress() {

  }

  handleKeyHold() {

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
    return (
      <div id="text-list" className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""} style={{ fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight }}>
        <p id="head-line">KV Teleprompter</p>
        <div id="control">
          <button id="button-a" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonA} >&#8984;</button>
          <button id="button-b" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonB} >&#9636;</button>
          <button id="button-c" style={{ color: this.props.state.uIColor, borderColor: this.props.state.uIColor }} onClick={this.handleButtonC} >&#9661;</button>
        </div>
      </div>
    )
  }
}

export default StartHelp;
