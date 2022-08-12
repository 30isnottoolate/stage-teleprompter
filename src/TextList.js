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
      if (!this.state.keyHold) {
        this.setState((prevState) => {
          if (event.key === "a") {
        
          } else if (event.key === "b") {
            if (this.props.state.currentIndex > 1) {
              this.props.index(this.props.state.currentIndex - 1);
            } else {
              this.props.index(this.props.state.textCount);
            }
          } else if (event.key === "c") {
            if (this.props.state.currentIndex < this.props.state.textCount) {
              this.props.index(this.props.state.currentIndex + 1);
            } else {
              this.props.index(1);
            }
          }
          return {
            keyHold: !prevState.keyHold,
            keyDownTime: (new Date()).getTime()
          }
        });
      }
    }

    handleKeyHold(event) {
      if (event.key === "a") {
        if (this.state.keyHold) {
          this.setState((prevState) => {
            if (((new Date()).getTime() - prevState.keyDownTime) > 2000) {
              this.props.mode("set");
            } else this.props.mode("read");
            return {
              keyHold: false,
              keyDownTime: ""
            }
          });
        }
      }
    }

    handleButtonA() {
      this.props.mode("read");
    }

    handleButtonB() {
      if (this.props.state.currentIndex > 1) {
        this.props.index(this.props.state.currentIndex - 1);
      } else {
        this.props.index(this.props.state.textCount);
      }
    }

    handleButtonC() {
      if (this.props.state.currentIndex < this.props.state.textCount) {
        this.props.index(this.props.state.currentIndex + 1);
      } else {
        this.props.index(1);
      }
    }
  
    render() {
      let listPos = (2 - this.props.state.currentIndex) * this.props.state.fontSize * this.props.state.lineHeight;

      if (this.props.state.mode === "start" || this.props.state.mode === "select") {
        if (this.props.state.textCount === 0) {
          return (
            <div id="text-list" style={{fontSize: this.props.state.fontSize}}>
              <p id="head-line">HELLO!</p>
              <p>Loading text list...</p>
            </div>
          )
        } else {
          let list = "";
          let index = 0;

          for (const item in this.props.state.data.texts) {
            index++;
            list = list + `<li id="li-${index}" style="padding-left:${this.props.state.fontSize * 0.69}px">${this.props.state.data.texts[item].title}</li>`;
          }

          return (
            <div id="text-list" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
              <p id="head-line" className={this.props.state.currentIndex === 1 ? "visible" : "hidden"}>SELECT:</p>
              <ul dangerouslySetInnerHTML={{__html: list}} style={{position: "absolute", top: listPos}}/>
              <p id="text-marker" style={{paddingLeft: (this.props.state.fontSize * 0.19) + "px"}}>&#129170;</p>
              <div id="control">
                <button id="button-a" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonA} >&#9711; / &#8984;</button>
                <button id="button-b" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonB} >&#9651;</button>
                <button id="button-c" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonC} >&#9661;</button>
              </div>
            </div>
          )
        }
      }
    }
  }

export default TextList;
  