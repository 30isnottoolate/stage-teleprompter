import React from 'react';
import './Teleprompter.css';

const SPEED = 3200;

class TextSlider extends React.Component {
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
      this.moveSlide = this.moveSlide.bind(this);
      this.handleButtonA = this.handleButtonA.bind(this);
      this.handleButtonB = this.handleButtonB.bind(this);
      this.handleButtonC = this.handleButtonC.bind(this);

      this.slideRef = React.createRef();
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
            this.props.mode("select");
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
          }
        }
      });
    }
  
    moveSlide() {
      this.setState((prevState) => {
        if (prevState.active) {
          if (this.slideRef.current.offsetHeight > (prevState.position *
            (-1) + (this.props.state.fontSize * this.props.state.lineHeight * 2)) && (prevState.position) <= (this.props.state.fontSize * this.props.state.lineHeight)) {
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

    handleButtonA() {
      this.props.mode("set");
    }

    handleButtonB() {
      this.props.mode("select");
    }

    handleButtonC() {
      this.setState((prevState) => ({
        active: !prevState.active
      }));
    }
  
    render() {
      let respWidth;

      if (this.props.state.orientation === "vertical") {
        respWidth = "100vh";
      } else respWidth = "100vw";
      
      return (
        <div id="text-slide" className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""} style={{fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight}}>
          <p id="text-marker" style={{paddingLeft: (this.props.state.fontSize * 0.19) + "px", position: "absolute", top: (this.props.state.fontSize * this.props.state.lineHeight)}}>&#129170;</p>
          <div id="slide" ref={this.slideRef} style={{top: this.state.position, width: respWidth, fontSize: this.props.state.fontSize, paddingLeft: (this.props.state.fontSize * 0.69) + "px"}} >
            <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
          </div>
          <div id="control" style={{width: respWidth}}>
            <button id="button-a" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}} onClick={this.handleButtonA}>&#8984;</button>
            <button id="button-b" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}} onClick={this.handleButtonB}>&#9636;</button>
            <button id="button-c" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}} onClick={this.handleButtonC}>{this.state.active ? String.fromCharCode(9634) : String.fromCharCode(9655)}</button>
          </div>
        </div>
      )
    }
  }

export default TextSlider;
