import React from 'react';
import './Teleprompter.css';

const SPEED = 25;
const START_POS = 50;

class TextSlide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
        timer: "",
        position: START_POS,
        currentText: "Loading...",
        keyHold: false,
        keyDownTime: ""
      };
  
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleKeyHold = this.handleKeyHold.bind(this);
      this.switchToSelect = this.switchToSelect.bind(this);
      this.switchToSet = this.switchToSet.bind(this);
      this.forwardAction = this.forwardAction.bind(this);
      this.moveSlide = this.moveSlide.bind(this);
    }
  
    componentDidMount() {
      this.setState({
        timer: setInterval(this.moveSlide, SPEED),
        currentText: this.props.state.data.texts["text_" + this.props.state.currentIndex].text
      });
      document.addEventListener("keydown", this.handleKeyPress);
      document.addEventListener("keyup", this.handleKeyHold);
    }
    
    componentWillUnmount() {
      clearInterval(this.state.timer);
      document.removeEventListener("keydown", this.handleKeyPress);
      document.removeEventListener("keyup", this.handleKeyHold);
    }

    handleKeyPress(event) {
      if (!this.state.keyHold) {
        this.setState((prevState) => {
          if (event.key === "a") {
            return {
              keyHold: true,
              keyDownTime: (new Date()).getTime()
            }
          } else if (event.key === "b") {
            this.switchToSelect();
          } else if (event.key === "c") {
            return {
              active: !prevState.active,
              keyHold: true,
              keyDownTime: (new Date()).getTime()
            }
          }
        });
      }
    }

    handleKeyHold(event) {
      if (this.state.keyHold) {
        if (event.key === "a") {
          if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
            this.switchToSet();
          }
        }
        this.setState({
          keyHold: false,
          keyDownTime: ""
        });
      }
    }

    switchToSelect() {
      this.props.mode("select");
    }

    switchToSet() {
      this.props.mode("set");
    }
  
    forwardAction() {
      this.setState((prevState) => ({
        active: !prevState.active
      }));
    }
  
    moveSlide() {
      this.setState((prevState) => {
        if (prevState.active) {
          if (document.body.offsetHeight > (prevState.position *
            (-1) + window.innerHeight / 2) && prevState.position <= START_POS) {
            return {
              position: prevState.position - 1
            }
          } else {
            return {
              position: prevState.position + 1,
              active: false
            }
          }
        }
      });
    }
  
    render() {
      return (
        <div id="text-slide" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <div id="control" className={this.state.active ? "transparent" : "visible"}>
            <button id="button-a" onClick={this.switchToSet} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#8984;</button>
            <button id="button-b" onClick={this.switchToSelect} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9636;</button>
            <button id="button-c" onClick={this.forwardAction} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9655;</button>
          </div>
          <div id="slide" style={{top: this.state.position, fontSize: this.props.state.fontSize}} >
            <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
          </div>
        </div>
      )
    }
  }

export default TextSlide;
