import React from 'react';
import './App.css';
import TextSlider from './TextSlider.js';
import TextList from './TextList.js';
import Settings from './Settings.js';
import StartHelp from './StartHelp.js';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION_DEFAULT = "horizontal"; // horizontal / vertical

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "start", //start, select, read, set
			data: "",
			textIndex: 1,
			fontSize: FONT_SIZE_DEFAULT,
			lineHeight: LINE_HEIGHT_DEFAULT,
			colorIndex: COLOR_INDEX_DEFAULT,
			textSpeed: TEXT_SPEED_DEFAULT,
			holdButtonTime: HOLD_TIME_DEFAULT,
			orientation: ORIENTATION_DEFAULT
		};
	}

	componentDidMount() {
		fetch('librarian.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				this.setState(() => {
					if (localStorage["fontSize"] && localStorage["lineHeight"] && localStorage["colorIndex"] &&
						localStorage["textSpeed"] && localStorage["holdButtonTime"] && localStorage["orientation"]) {
						return {
							data: data,
							fontSize: parseInt(localStorage.getItem("fontSize")),
							lineHeight: parseFloat(localStorage.getItem("lineHeight")),
							colorIndex: parseInt(localStorage.getItem("colorIndex")),
							textSpeed: parseInt(localStorage.getItem("textSpeed")),
							holdButtonTime: parseInt(localStorage.getItem("holdButtonTime")),
							orientation: localStorage.getItem("orientation")
						}
					} else {
						this.defaultLocalStorage();
						return {
							data: data,
							fontSize: FONT_SIZE_DEFAULT,
							lineHeight: LINE_HEIGHT_DEFAULT,
							colorIndex: COLOR_INDEX_DEFAULT,
							textSpeed: TEXT_SPEED_DEFAULT,
							holdButtonTime: HOLD_TIME_DEFAULT,
							orientation: ORIENTATION_DEFAULT
						}
					}
				});
			})
			.catch(() => console.log("Database missing."));
	}

	changeIndex = (index) => {
		this.setState({
			textIndex: index
		});
	}

	changeMode = (mode) => {
		this.setState({
			mode: mode
		});
	}

	changeSettings = (setting, value) => {
		localStorage.setItem(setting, value);
		this.setState(() => {
			return {
				[setting]: value
			}
		});
	}

	changeOrientation = () => {
		this.setState((prevState) => {
			if (prevState.orientation === "horizontal") {
				return {
					orientation: "vertical"
				}
			} else {
				return {
					orientation: "horizontal"
				}
			}
		});
	}

	defaultLocalStorage = () => {
		localStorage.setItem("fontSize", FONT_SIZE_DEFAULT);
		localStorage.setItem("lineHeight", LINE_HEIGHT_DEFAULT);
		localStorage.setItem("colorIndex", COLOR_INDEX_DEFAULT);
		localStorage.setItem("textSpeed", TEXT_SPEED_DEFAULT);
		localStorage.setItem("holdButtonTime", HOLD_TIME_DEFAULT);
		localStorage.setItem("orientation", ORIENTATION_DEFAULT);
	}

	defaultSettings = () => {
		this.setState(() => {
			this.defaultLocalStorage();
			return {
				fontSize: FONT_SIZE_DEFAULT,
				lineHeight: LINE_HEIGHT_DEFAULT,
				colorIndex: COLOR_INDEX_DEFAULT,
				textSpeed: TEXT_SPEED_DEFAULT,
				holdButtonTime: HOLD_TIME_DEFAULT,
				orientation: ORIENTATION_DEFAULT
			}
		})
	}

	render() {
		if (this.state.mode === "start") {
			return (
				<StartHelp
					settings={this.state}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "select") {
			return (
				<TextList
					settings={this.state}
					data={this.state.data}
					textIndex={this.state.textIndex} changeTextIndex={this.changeIndex}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "read") {
			return (
				<TextSlider
					settings={this.state}
					data={this.state.data}
					textIndex={this.state.textIndex} changeTextIndex={this.changeIndex}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "set") {
			return (
				<Settings
					settings={this.state}
					changeSettings={this.changeSettings}
					changeOrientation={this.changeOrientation}
					defaultSettings={this.defaultSettings}
					changeMode={this.changeMode}
				/>
			)
		}
	}
}

export default App;
