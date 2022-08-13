import React from 'react';
import './Teleprompter.css';

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
  
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
      document.addEventListener("keyup", this.handleKeyHold);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
      document.removeEventListener("keyup", this.handleKeyHold);
    }
  
    render() {
      return (
        <div id="settings" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <p id="head-line">SETTINGS:</p>
          <ul>
            <li>Font size:</li>
            <li>Line height:</li>
            <li>UI color:</li>
            <li>Text speed:</li>
            <li>Hold button time:</li>
            <li>Orientation:</li>
            <li>Default settings</li>
          </ul>
          <div id="control">
            <button id="button-a" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9711; / &#9636;</button>
            <button id="button-b" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9651;</button>
            <button id="button-c" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9661;</button>
          </div>
        </div>
      )
    }
  }

export default Settings;
