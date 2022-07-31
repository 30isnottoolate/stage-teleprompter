import React from 'react';
import './Teleprompter.css';
import TextSlide from './TextSlide';
import TextList from './TextList';

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "start", //start, select, read, set
      vault: "",
      textCount: 0
    };

  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/30isnottoolate/misc/main/liber.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        vault: data,
        textCount: data.textCount
      });
    })
    .catch(() => console.log("Database missing."));
  }
  
  render() {
    if (this.state.mode === "start" || this.state.mode === "select") {
      return (
        <TextList state={this.state} />
      )
    } else if (this.state.mode == "read") {
      return (
        <TextSlide state={this.state} />
      )
    } else if (this.state.mode === "set") {

    }
  }
}

export default Teleprompter;
