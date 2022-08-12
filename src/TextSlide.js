import React from 'react';
import './Teleprompter.css';

const SPEED = 25;
const START_POS = 50;

class TextSlide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        position: START_POS,
        active: false,
        currentText: "Loading...",
        timer: ""
      };
  
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.switchToSelect = this.switchToSelect.bind(this);
      this.switchToSet = this.switchToSet.bind(this);
      this.forwardAction = this.forwardAction.bind(this);
      this.moveSlide = this.moveSlide.bind(this);
    }
  
    componentDidMount() {
      this.setState({
        currentText: this.props.state.data.texts["text_" + this.props.state.currentIndex].text,
        timer: setInterval(this.moveSlide, SPEED)
      });
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      clearInterval(this.state.timer);
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    handleKeyPress(event) {
      if (event.key === "a") {
        this.switchToSet();
      } else if (event.key === "b") {
        this.switchToSelect();
      } else if (event.key === "c") {
        this.forwardAction();
      }
    }

    switchToSelect() {
      this.props.mode("select");
    }

    switchToSet() {
      this.props.mode("set");
    }
  
    forwardAction() {
      this.setState((prevState) => ({
        active: !prevState.active
      }));
    }
  
    moveSlide() {
      this.setState((prevState) => {
        if (prevState.active) {
          if (document.body.offsetHeight > (prevState.position *
            (-1) + window.innerHeight / 2) && prevState.position <= START_POS) {
            return {
              position: prevState.position - 1
            }
          } else {
            return {
              position: prevState.position + 1,
              active: false
            }
          }
        }
      });
    }
  
    render() {
      return (
        <div id="text-slide" style={{fontSize: this.props.state.fontSize, color: this.props.state.uiColor}}>
          <div id="control" className={this.state.active ? "transparent" : "visible"}>
            <button id="button-a" onClick={this.switchToSet} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#8984;</button>
            <button id="button-b" onClick={this.switchToSelect} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9636;</button>
            <button id="button-c" onClick={this.forwardAction} style={{color: this.props.state.uiColor, borderColor: this.props.state.uiColor}}>&#9655;</button>
          </div>
          <div id="slide" style={{top: this.state.position, fontSize: this.props.state.fontSize}} >
            <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
          </div>
        </div>
      )
    }
  }

export default TextSlide;
  