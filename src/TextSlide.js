import React from 'react';
import './Teleprompter.css';

const SPEED = 25;
const START_POS = 50;

class TextSlide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        position: START_POS,
        direction: 0,
        currentText: "Loading...",
        timer: ""
      };
  
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.forwardAction = this.forwardAction.bind(this);
      this.backwardAction = this.backwardAction.bind(this);
      this.moveSlide = this.moveSlide.bind(this);
    }
  
    componentDidMount() {
      this.setState({
        currentText: this.props.state.data.texts["text_" + this.props.state.currentIndex].text,
        timer: setInterval(this.moveSlide, SPEED)
      });
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      clearInterval(this.state.timer);
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    handleKeyPress(event) {
      if (event.key === "a") {
        this.props.mode("select");
      } else if (event.key === "b") {
        this.backwardAction();
      } else if (event.key === "c") {
        this.forwardAction();
      }
    }
  
    forwardAction() {
      this.setState((prevState) => {
        if (prevState.direction === 0) {
          return {
            direction: 1
          }
        } else if (prevState.direction === 1 || prevState.direction === -1) {
          return {
            direction: 0
          }
        }
      });
    }
  
    backwardAction() {
      this.setState((prevState) => {
        if (prevState.direction === 0) {
          return {
            direction: -1
          }
        } else if (prevState.direction === 1 || prevState.direction === -1) {
          return {
            direction: 0
          }
        }
      });
    }
  
    moveSlide() {
      this.setState((prevState) => {
        if (document.body.offsetHeight > (prevState.position *
          (-1) + window.innerHeight / 2) && prevState.position <= START_POS) {
          return {
            position: prevState.position - prevState.direction
          }
        } else {
          return {
            position: prevState.position + prevState.direction,
            direction: 0
          }
        }
      });
    }
  
    render() {
      return (
        <div id="text-slide" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <div id="control" className={this.state.direction !== 0 ? "transparent" : "visible"}>
            <button id="button-a"  style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>SELECTION (A)</button>
            <button id="button-b" onClick={this.backwardAction} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>BACKWARD (B)</button>
            <button id="button-c" onClick={this.forwardAction} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>FORWARD (C)</button>
          </div>
          <div id="slide" style={{top: this.state.position, fontSize: this.props.state.fontSize}} >
            <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
          </div>
        </div>
      )
    }
  }

export default TextSlide;
  