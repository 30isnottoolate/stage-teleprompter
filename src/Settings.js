import React from 'react';
import './Teleprompter.css';

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        keyHold: false,
        keyDownTime: "",
        settingsIndex: 1,
        inChangeMode: false
      };

      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleKeyHold = this.handleKeyHold.bind(this);
      this.getColorName = this.getColorName.bind(this);
  
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
      this.setState((prevState) => {
        if (!this.state.keyHold) {
          if (!this.state.inChangeMode) {
            if (event.key === "a") {
              return {
                keyHold: true,
                keyDownTime: (new Date()).getTime()
              }
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
          } else {
            if (event.key === "a") {
              return {
                inChangeMode: false
              }
            }
          }
        }
      });
    }

    handleKeyHold(event) {
      if (this.state.keyHold) {
        if (event.key === "a") {
          if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
            this.props.mode("select");
          } else {
            if (this.state.settingsIndex === 7) {
              this.props.settings("default");
            } else {
              this.setState({
                inChangeMode: true
              });
            }
          }
        }
        this.setState({
          keyHold: false,
          keyDownTime: ""
        });
      }
    }

    getColorName() {
      if (this.props.state.uIColor === "#ffd6d9") {
        return "red"
      } else if (this.props.state.uIColor === "#b4f8ff") {
        return "green"
      } else if (this.props.state.uIColor === "#99d3ff") {
        return "blue"
      } else if (this.props.state.uIColor === "#ffffff") {
        return "white"
      } else if (this.props.state.uIColor === "#fff4ad") {
        return "yellow"
      }
    }
  
    render() {
      let listPos = (2 - this.state.settingsIndex) * this.props.state.fontSize * this.props.state.lineHeight;

      return (
        <div id="settings" style={{fontSize: this.props.state.fontSize, color: this.props.state.uIColor, lineHeight: this.props.state.lineHeight}}>
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
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.getColorName()}</td>
            </tr>
            <tr>
              <td>Text speed:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.props.state.textSpeed}%</td>
            </tr>
            <tr>
              <td>Hold button time:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.props.state.holdButtonTime} ms</td>
            </tr>
            <tr>
              <td>Orientation:</td>
              <td style={{paddingLeft: (this.props.state.fontSize * 1.38) + "px"}}>{this.props.state.orientation}</td>
            </tr>
            <tr>
              <td>Default settings</td>
            </tr>
            </tbody>
          </table>
          <div id="control">
            <button id="button-a" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#9711; / &#9636;</button>
            <button id="button-b" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#9651;</button>
            <button id="button-c" style={{color: this.props.state.uIColor, borderColor: this.props.state.uIColor}}>&#9661;</button>
          </div>
        </div>
      )
    }
  }

export default Settings;
