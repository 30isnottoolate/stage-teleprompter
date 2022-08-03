import React from 'react';
import './Teleprompter.css';

class TextList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentIndex: this.props.state.currentIndex,
        markerPos: this.props.state.currentIndex * this.props.state.fontSize * this.props.state.lineHeight
      };
  
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
  
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    handleKeyPress(event) {
      if (event.key === "c") {
        if (this.state.currentIndex < this.props.state.textCount) {
          this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex + 1),
            markerPos: prevState.markerPos - (this.props.state.fontSize * this.props.state.lineHeight)
          }));
        } else {
          this.setState(({
            currentIndex: 1,
            markerPos: this.props.state.fontSize * this.props.state.lineHeight
          }));
        }
      } else if (event.key === "b") {
        if (this.state.currentIndex > 1) {
          this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex - 1),
            markerPos: prevState.markerPos + (this.props.state.fontSize * this.props.state.lineHeight)
          }));
        } else {
          this.setState({
            currentIndex: this.props.state.textCount,
            markerPos: 2*(this.props.state.fontSize * this.props.state.lineHeight) - (this.props.state.textCount * this.props.state.fontSize * this.props.state.lineHeight)
          });
        }
        
      } else if (event.key === "a") {
        this.props.action(this.state.currentIndex, "read");
      }
    }
  
    render() {
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

          for (const item in this.props.state.vault.texts) {
            index++;
            list = list + `<li id="li-${index}" style="padding-left:${this.props.state.fontSize*0.69}px">${this.props.state.vault.texts[item].title}</li>`;
          }

          return (
            <div id="text-list" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
              <p id="head-line">SELECT:</p>
              <ul dangerouslySetInnerHTML={{__html: list}} style={{position: "absolute", top: this.state.markerPos}}/>
              <p id="text-marker" style={{paddingLeft: (this.props.state.fontSize*0.19)+"px"}}>&#129170;</p>
              <div id="control">
                <button id="button-a" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>SELECT (A)</button>
                <button id="button-b" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>UP (B)</button>
                <button id="button-c" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>DOWN (C)</button>
              </div>
            </div>
          )
        }
      }
    }
  }

export default TextList;
  