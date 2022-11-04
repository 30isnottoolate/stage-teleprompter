import React from 'react';
import './Teleprompter.css';
import TextSlider from './components/TextSlider.js';
import TextList from './components/TextList.js';
import Settings from './components/Settings.js';
import StartHelp from './components/StartHelp.js';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION_DEFAULT = "horizontal"; // horizontal / vertical

const colors = {
	1: { "name": "red", "code": "#ffd6d9" },
	2: { "name": "green", "code": "#b4f8ff" },
	3: { "name": "blue", "code": "#99d3ff" },
	4: { "name": "white", "code": "#ffffff" },
	5: { "name": "yellow", "code": "#fff4ad" },
}

class Teleprompter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "start", //start, select, read, set
			data: "",
			textCount: 0,
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
							textCount: Object.keys(data.texts).length,
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
							textCount: data.textCount,
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
					state={this.state}
					mode={this.changeMode}
					colors={colors} />
			)
		} else if (this.state.mode === "select") {
			return (
				<TextList
					state={this.state}
					mode={this.changeMode}
					index={this.changeIndex}
					colors={colors} />
			)
		} else if (this.state.mode === "read") {
			return (
				<TextSlider
					state={this.state}
					mode={this.changeMode}
					index={this.changeIndex}
					colors={colors} />
			)
		} else if (this.state.mode === "set") {
			return (
				<Settings
					state={this.state}
					mode={this.changeMode}
					settings={this.changeSettings}
					changeOrientation={this.changeOrientation}
					colors={colors}
					default={this.defaultSettings} />
			)
		}
	}
}

export default Teleprompter;
