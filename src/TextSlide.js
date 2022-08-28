import React from 'react';
import './Teleprompter.css';

const SPEED = 3200;

class TextSlide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
        timer: "",
        position: 0,
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
        timer: setInterval(this.moveSlide, SPEED  / (this.props.state.fontSize * this.props.state.lineHeight * this.props.state.textSpeed / 100)),
        position: this.props.state.fontSize * this.props.state.lineHeight,
        currentText: this.props.state.data.texts["text_" + this.props.state.textIndex].text
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
      this.setState((prevState) => {
        if (!prevState.keyHold) {
          if (event.key === "a") {
            return {
              keyHold: true,
              keyDownTime: (new Date()).getTime()
            }
          } else if (event.key === "b") {
            this.switchToSelect();
          } else if (event.key === "c") {
            return {
              active: !prevState.active
            }
          }
        }
      });
    }

    handleKeyHold(event) {
      this.setState((prevState) => {
        if (prevState.keyHold) {
          if (event.key === "a") {
            if (((new Date()).getTime() - prevState.keyDownTime) > this.props.state.holdButtonTime) {
              this.switchToSet();
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
            (-1) + (this.props.state.fontSize * this.props.state.lineHeight * 2)) && prevState.position <= (this.props.state.fontSize * this.props.state.lineHeight)) {
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
        <div id="text-slide" style={{fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight}}>
          <p id="text-marker" style={{paddingLeft: (this.props.state.fontSize * 0.19) + "px", position: "absolute", top: (this.props.state.fontSize * this.props.state.lineHeight)}}>&#129170;</p>
          <div id="slide" style={{top: this.state.position, fontSize: this.props.state.fontSize, paddingLeft: (this.props.state.fontSize * 0.69) + "px"}} >
            <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
          </div>
          <div id="control" className={this.state.active ? "transparent" : "visible"}>
            <button id="button-a" onClick={this.switchToSet} style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#8984;</button>
            <button id="button-b" onClick={this.switchToSelect} style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#9636;</button>
            <button id="button-c" onClick={this.forwardAction} style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>{this.state.active ? String.fromCharCode(9634) : String.fromCharCode(9655)}</button>
          </div>
        </div>
      )
    }
  }

export default TextSlide;
