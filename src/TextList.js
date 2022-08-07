import React from 'react';
import './Teleprompter.css';

class TextList extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleButtonA = this.handleButtonA.bind(this);
      this.handleButtonB = this.handleButtonB.bind(this);
      this.handleButtonC = this.handleButtonC.bind(this);
    }
  
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    handleKeyPress(event) {
      if (event.key === "c") {
        if (this.props.state.currentIndex < this.props.state.textCount) {
          this.props.index(this.props.state.currentIndex + 1);
        } else {
          this.props.index(1);
        }
      } else if (event.key === "b") {
        if (this.props.state.currentIndex > 1) {
          this.props.index(this.props.state.currentIndex - 1);
        } else {
          this.props.index(this.props.state.textCount);
        }
        
      } else if (event.key === "a") {
        this.props.mode("read");
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
                <button id="button-a" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonA} >SELECT (A)</button>
                <button id="button-b" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonB} >UP (B)</button>
                <button id="button-c" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}} onClick={this.handleButtonC} >DOWN (C)</button>
              </div>
            </div>
          )
        }
      }
    }
  }

export default TextList;
  