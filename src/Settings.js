import React from 'react';
import './Teleprompter.css';

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        settingsIndex: 1,
        keyHold: false,
        keyDownTime: "",
        settingsMode: "" //fontSize, lineHeight, uIColor, textSpeed, holdButtonTime, orientation
      };

      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleKeyHold = this.handleKeyHold.bind(this);
  
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
            if (this.state.settingsIndex > 1) {
              return {
                settingsIndex: prevState.settingsIndex - 1
              }
            } else {
              return {
                settingsIndex: 7
              }
            }
          } else if (event.key === "c") {
            if (this.state.settingsIndex < 7) {
              return {
                settingsIndex: prevState.settingsIndex + 1
              }
            } else {
              return {
                settingsIndex: 1
              }
            }
          }
          return {
            keyHold: true,
            keyDownTime: (new Date()).getTime()
          }
        });
      }
    }

    handleKeyHold(event) {
      if (this.state.keyHold) {
        if (event.key === "a") {
          if (((new Date()).getTime() - this.state.keyDownTime) > 2000) {
            this.props.mode("select");
          } else {
            
          }
        }
        this.setState({
          keyHold: false,
          keyDownTime: ""
        });
      }
    }
  
    render() {
      let listPos = (2 - this.state.settingsIndex) * this.props.state.fontSize * this.props.state.lineHeight;

      return (
        <div id="settings" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <p id="head-line" className={this.state.settingsIndex === 1 ? "visible" : "hidden"}>SETTINGS:</p>
          <p id="text-marker" style={{paddingLeft: (this.props.state.fontSize * 0.19) + "px"}} >&#129170;</p>
          <table style={{paddingLeft: (this.props.state.fontSize * 0.69) + "px", position: "absolute", top: listPos}}>
            <tbody>
            <tr>
              <td>Font size:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.props.state.fontSize}</td>
            </tr>
            <tr>
              <td>Line height:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.props.state.lineHeight}</td>
            </tr>
            <tr>
              <td>UI color:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>Blue</td>
            </tr>
            <tr>
              <td>Text speed:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>100%</td>
            </tr>
            <tr>
              <td>Hold button time:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>2000ms</td>
            </tr>
            <tr>
              <td>Orientation:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>Horizontal</td>
            </tr>
            <tr>
              <td>Default settings</td>
            </tr>
            </tbody>
          </table>
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
