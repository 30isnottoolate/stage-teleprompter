import React from 'react';
import './App.css';
import TextSlider from './TextSlider.jsx';
import TextList from './TextList.jsx';
import Settings from './Settings.jsx';
import StartHelp from './StartHelp.jsx';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION_DEFAULT = "horizontal"; // horizontal / vertical

const DEFAULT_STATES = {
	fontSize: FONT_SIZE_DEFAULT,
	lineHeight: LINE_HEIGHT_DEFAULT,
	colorIndex: COLOR_INDEX_DEFAULT,
	textSpeed: TEXT_SPEED_DEFAULT,
	holdButtonTime: HOLD_TIME_DEFAULT,
	orientation: ORIENTATION_DEFAULT
}

const localStorageStates = {
	fontSize: parseInt(localStorage.getItem("fontSize")),
	lineHeight: parseFloat(localStorage.getItem("lineHeight")),
	colorIndex: parseInt(localStorage.getItem("colorIndex")),
	textSpeed: parseInt(localStorage.getItem("textSpeed")),
	holdButtonTime: parseInt(localStorage.getItem("holdButtonTime")),
	orientation: localStorage.getItem("orientation")
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			library: { texts: [{ title: "", content: "" }] },
			libraryStatus: "checking", // checking, missing, invalid, valid
			textIndex: 0,
			...DEFAULT_STATES,
			mode: "start" // start, select, read, set
		};
	}

	componentDidMount() {
		this.setState(() => {
			if (localStorage["fontSize"] && localStorage["lineHeight"] && localStorage["colorIndex"] &&
				localStorage["textSpeed"] && localStorage["holdButtonTime"] && localStorage["orientation"]) {
				return {
					...localStorageStates
				}
			} else {
				this.defaultLocalStorage();
				return {
					...DEFAULT_STATES
				}
			}
		});

		this.fetchLibrary();
	}

	fetchLibrary() {
		console.log("fetching");
		fetch('library.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				if (data.librarian === validateLibrary(data.texts)) {
					this.setState({
						library: data,
						libraryStatus: "valid"
					});
				} else {
					this.setState({ libraryStatus: "invalid" });
				}
			})
			.catch(() => {
				this.setState({ libraryStatus: "missing" });
			});
	}

	validateLibrary(texts) {
		let validationCode = "11";

		texts.forEach((item) => {
			validationCode += (item.title.length.toString(16) + item.content.length.toString(16));
		});

		return validationCode += "22";
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
				...DEFAULT_STATES
			}
		})
	}

	render() {
		if (this.state.mode === "start") {
			return (
				<StartHelp
					settings={this.state}
					libraryStatus={this.state.libraryStatus}
					fetchLibrary={this.fetchLibrary}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "select") {
			return (
				<TextList
					settings={this.state}
					library={this.state.library}
					textIndex={this.state.textIndex} changeTextIndex={this.changeIndex}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "read") {
			return (
				<TextSlider
					settings={this.state}
					library={this.state.library}
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
