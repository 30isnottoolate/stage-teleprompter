import React from 'react';
import './Teleprompter.css';

class TextList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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

      } else if (event.key === "b") {

      } else if (event.key === "a") {

      }
    }
  
    render() {
      if (this.props.state.mode === "start") {
        if (this.props.state.textCount === 0) {
          return (
            <div id="text-list">
              <p>Welcome!</p>
              <p>Loading text list...</p>
            </div>
          )
        } else {
          let list = "";

          for (const item in this.props.state.vault.texts) {
            list = list + "<li>" + this.props.state.vault.texts[item].title + "</li>"
          }

          return (
            <div id="text-list">
              <p>Welcome!</p>
              <p>Select a text.</p>
              <ul dangerouslySetInnerHTML={{__html: list}} />
              <div id="control">
                <button id="button_a" >SELECT (A)</button>
                <button id="button_b" >UP (B)</button>
                <button id="button_c" >DOWN (C)</button>
              </div>
            </div>
          )
        }
      } else if (this.props.state.mode === "select") {
        let list = "";

        for (const item in this.props.state.vault.texts) {
          list = list + "<li>" + this.props.state.vault.texts[item].title + "</li>"
        }

        return (
          <div id="text-list">
            <p>Select a text.</p>
            <ul dangerouslySetInnerHTML={{__html: list}} />
          </div>
        )
      }
    }
  }

export default TextList;
  