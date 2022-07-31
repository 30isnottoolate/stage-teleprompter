import React from 'react';
import './Teleprompter.css';

class TextList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentIndex: this.props.state.currentIndex,
        markerPos: {
          position: "absolute",
          top: this.props.state.currentIndex * this.props.state.fontSize * this.props.state.lineHeight
        }
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
            markerPos: {
              position: "absolute",
              top: (prevState.currentIndex + 1) * this.props.state.fontSize * this.props.state.lineHeight
            }
          }));
        } else {
          this.setState(({
            currentIndex: 1,
            markerPos: {
              position: "absolute",
              top: 1 * this.props.state.fontSize * 1.2
            }
          }));
        }
      } else if (event.key === "b") {
        if (this.state.currentIndex > 1) {
          this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex - 1),
            markerPos: {
              position: "absolute",
              top: (prevState.currentIndex -1) * this.props.state.fontSize * this.props.state.lineHeight
            }
          }));
        } else {
          this.setState({
            currentIndex: this.props.state.textCount,
            markerPos: {
              position: "absolute",
              top: this.props.state.textCount * this.props.state.fontSize * this.props.state.lineHeight
            }
          });
        }
        
      } else if (event.key === "a") {
        this.props.action(this.state.currentIndex, "read");
      }
    }
  
    render() {
      if (this.props.state.mode === "start") {
        if (this.props.state.textCount === 0) {
          return (
            <div id="text-list" style={{fontSize: this.props.state.fontSize}}>
              <p>Welcome!</p>
              <p>Loading text list...</p>
            </div>
          )
        } else {
          let list = "";
          let index = 0;

          for (const item in this.props.state.vault.texts) {
            index++;
            list = list + `<li id="li-${index}">${this.props.state.vault.texts[item].title}</li>`;
          }

          return (
            <div id="text-list" style={{fontSize: this.props.state.fontSize}}>
              <p>Welcome! Select a text.</p>
              <ul dangerouslySetInnerHTML={{__html: list}} />
              <p style={this.state.markerPos}>&gt;</p>
              <div id="control">
                <button id="button-a" >SELECT (A)</button>
                <button id="button-b" >UP (B)</button>
                <button id="button-c" >DOWN (C)</button>
              </div>
            </div>
          )
        }
      } else if (this.props.state.mode === "select") {
        let list = "";
        let index = 0;

        for (const item in this.props.state.vault.texts) {
          index++;
          list = list + `<li id="li-${index}">${this.props.state.vault.texts[item].title}</li>`;
        }

        return (
          <div id="text-list" style={{fontSize: this.props.state.fontSize}}>
            <p>Select a text.</p>
            <ul dangerouslySetInnerHTML={{__html: list}} />
            <p style={this.state.markerPos}>&gt;</p>
            <div id="control">
              <button id="button-a" >SELECT (A)</button>
              <button id="button-b" >UP (B)</button>
              <button id="button-c" >DOWN (C)</button>
            </div>
          </div>
        )
      }
    }
  }

export default TextList;
  