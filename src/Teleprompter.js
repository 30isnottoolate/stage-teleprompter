import React from 'react';
import './Teleprompter.css';

const LOW_SPEED = 25; //this.state.speed = 1
const HIGH_SPEED = 10; //this.state.speed = 2
const START_POS = 50;

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: START_POS,
      direction: 0,
      speed: 1,
      mode: "read", //read, select, set
      vault: "1234",
      textCount: 0,
      currentText: "Loading..."
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.forwardAction = this.forwardAction.bind(this);
    this.backwardAction = this.backwardAction.bind(this);
    this.changeableInterval = this.changeableInterval.bind(this);
    this.moveSlide = this.moveSlide.bind(this);
  }

  componentDidMount() {
    this.changeableInterval();
    document.addEventListener("keydown", this.handleKeyPress);
    
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        vault: data,
        textCount: data.textCount,
        currentText: data.texts.text_001.text
      })
    })
    .catch(() => console.log("Database missing."));
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  handleKeyPress(event) {
    if (event.key === "c") {
      this.forwardAction();
    } else if (event.key === "b") {
      this.backwardAction();
    }
  }

  forwardAction() {
    this.setState((prevState) => {
      if (prevState.direction === 0) {
        return {
          direction: 1,
          speed: 1
        }
      } else if (prevState.direction === 1 && prevState.speed === 1) {
        return {
          speed: 2
        }
      } else if (prevState.direction === -1 || prevState.speed === 2) {
        return {
          direction: 0
        }
      }
    });
  }

  backwardAction() {
    this.setState((prevState) => {
      if (prevState.direction === 0) {
        return {
          direction: -1,
          speed: 1
        }
      } else if (prevState.direction === -1 && prevState.speed === 1) {
        return {
          speed: 2
        }
      } else if (prevState.direction === 1 || prevState.speed === 2) {
        return {
          direction: 0
        }
      }
    });
  }

  changeableInterval() {
    if (this.state.speed === 1) {
      setTimeout(this.moveSlide, LOW_SPEED);
    } else if (this.state.speed === 2) {
      setTimeout(this.moveSlide, HIGH_SPEED);
    }
  }

  moveSlide() {
    this.setState((prevState) => {
      if (document.getElementById("slide").offsetHeight > (prevState.position *
        (-1) + document.body.offsetHeight / 2) && prevState.position <= START_POS) {
        return {
          position: prevState.position - prevState.direction
        }
      } else {
        return {
          position: prevState.position + prevState.direction,
          direction: 0
        }
      }
    });
    this.changeableInterval();
  }

  render() {
    return (
      <div id="app">
        <div id="control" className={this.state.direction !== 0 ? "transparent" : "visible"}>
          <button id="mode" >SELECTION (A)</button>
          <button id="backward" onClick={this.backwardAction} >BACKWARD (B)</button>
          <button id="forward" onClick={this.forwardAction} >FORWARD (C)</button>
        </div>
        <div id="slide" style={{top: this.state.position}} >
          <p id="text" dangerouslySetInnerHTML={{__html: this.state.currentText}} />
        </div>
      </div>
    );
  }
}

export default Teleprompter;
