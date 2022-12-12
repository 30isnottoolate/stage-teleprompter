import React from 'react';
import './App.css';
import Home from './Home.jsx';
import TextList from './TextList.jsx';
import Reader from './Reader.jsx';
import Settings from './Settings.jsx';

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
	fontSize: parseInt(localStorage["fontSize"]),
	lineHeight: parseFloat(localStorage["lineHeight"]),
	colorIndex: parseInt(localStorage["colorIndex"]),
	textSpeed: parseInt(localStorage["textSpeed"]),
	holdButtonTime: parseInt(localStorage["holdButtonTime"]),
	orientation: localStorage["orientation"]
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			library: { texts: [{ title: "", content: "" }] },
			libraryStatus: "checking", // checking, missing, invalid, valid
			textIndex: 0,
			...DEFAULT_STATES,
			mode: "home" // home, list, read, set
		};
	}

	componentDidMount() {
		if (this.validateLocalStorage()) {
			this.setState({ ...localStorageStates });
		} else {
			this.setState({ ...DEFAULT_STATES }, this.defaultLocalStorage);
		}

		this.fetchLibrary();
	}

	validateLocalStorage = () => {
		let storageValidity = true;

		if (!localStorage["fontSize"] ||
			isNaN(parseInt(localStorage["fontSize"])) ||
			parseInt(localStorage["fontSize"]) < 80 ||
			parseInt(localStorage["fontSize"]) > 150) {
			storageValidity = false;
		}
		if (!localStorage["lineHeight"] ||
			isNaN(parseFloat(localStorage["lineHeight"])) ||
			parseFloat(localStorage["lineHeight"]) < 1 ||
			parseFloat(localStorage["lineHeight"]) > 1.5) {
			storageValidity = false;
		}
		if (!localStorage["colorIndex"] ||
			isNaN(parseInt(localStorage["colorIndex"])) ||
			parseInt(localStorage["colorIndex"]) < 1 ||
			parseInt(localStorage["colorIndex"]) > 5) {
			storageValidity = false;
		}
		if (!localStorage["textSpeed"] ||
			isNaN(parseInt(localStorage["textSpeed"])) ||
			parseInt(localStorage["textSpeed"]) < 20 ||
			parseInt(localStorage["textSpeed"]) > 200) {
			storageValidity = false;
		}
		if (!localStorage["holdButtonTime"] ||
			isNaN(parseInt(localStorage["holdButtonTime"])) ||
			parseInt(localStorage["holdButtonTime"]) < 1000 ||
			parseInt(localStorage["holdButtonTime"]) > 5000) {
			storageValidity = false;
		}
		if (!localStorage["orientation"] ||
			(localStorage["orientation"] !== "horizontal" &&
				localStorage["orientation"] !== "vertical")) {
			storageValidity = false;
		}

		return storageValidity;
	}

	fetchLibrary = () => {
		fetch('library.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				if (data.librarian && data.librarian === this.validateLibrary(data.texts)) {
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

	validateLibrary = (texts) => {
		let validationCode = "11";

		texts.forEach((item) => {
			validationCode += (item.title.length.toString(16) + item.content.length.toString(16));
		});

		return validationCode += "22";
	}

	changeIndex = (index) => {
		this.setState({ textIndex: index });
	}

	changeMode = (mode) => {
		this.setState({ mode: mode });
	}

	changeSettings = (setting, value) => {
		this.setState({ [setting]: value }, localStorage.setItem(setting, value));
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
		this.setState({ ...DEFAULT_STATES }, this.defaultLocalStorage);
	}

	render() {
		if (this.state.mode === "home") {
			return (
				<Home
					settings={this.state}
					libraryStatus={this.state.libraryStatus}
					fetchLibrary={this.fetchLibrary}
					changeMode={this.changeMode}
				/>
			)
		} else if (this.state.mode === "list") {
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
				<Reader
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
