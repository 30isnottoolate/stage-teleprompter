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
          <button id="button-a" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#8984;</button>
          <button id="button-b" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9636;</button>
          <button id="button-c" style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9655;</button>
        </div>
      )
    }
  }

export default Settings;
