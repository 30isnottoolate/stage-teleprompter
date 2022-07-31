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
      return (
        <div id="text-list">
          
        </div>
      )
    }
  }

export default TextList;
  