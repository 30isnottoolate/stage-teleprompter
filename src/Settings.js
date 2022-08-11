import React from 'react';
import './Teleprompter.css';

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
  
    }
  
    render() {
      return (
        <div id="settings" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <p>SETTINGS:</p>
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
