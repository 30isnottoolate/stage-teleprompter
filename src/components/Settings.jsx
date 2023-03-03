import React from 'react';

import colors from '../utilities/colors';
import remValue from '../utilities/remValue';

import Marker from './Marker';
import ControlButton from './ControlButton';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settingsIndex: 1,
			inChangeMode: false,
			keyHold: false,
			keyDownTime: 0
		};
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
		document.removeEventListener("keyup", this.handleKeyUp);
	}

	handleKeyDown = (event) => {
		if (event.key.toLowerCase() === "a") {
			this.handleButtonAKeyDown();
		} else if (event.key.toLowerCase() === "b") {
			if (!this.state.inChangeMode && !event.repeat) {
				this.handleButtonBUp();
			} else if (this.state.inChangeMode) {
				this.handleButtonBDecrease();
			}
		} else if (event.key.toLowerCase() === "c") {
			if (!this.state.inChangeMode && !event.repeat) {
				this.handleButtonCDown();
			} else if (this.state.inChangeMode) {
				this.handleButtonCIncrease();
			}
		}
	}

	handleKeyUp = (event) => {
		if (event.key.toLowerCase() === "a" && this.state.keyHold) {
			if (!this.state.inChangeMode) {
				this.handleButtonASelectHome();
			} else this.handleButtonAUnselect();
		}
	}

	handleButtonAKeyDown = () => {
		if (!this.state.keyHold) {
			this.setState(() => {
				return {
					keyHold: true,
					keyDownTime: (new Date()).getTime()
				}
			});
		}
	}

	handleButtonASelectHome = () => {
		const resetHold = { keyHold: false, keyDownTime: 0 };

		this.setState(() => {
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
				this.props.changeMode("home");
			} else {
				if (this.state.settingsIndex === 7) {
					this.props.defaultSettings();
					return {
						...resetHold
					}
				} else {
					return {
						inChangeMode: true,
						...resetHold
					}
				}
			}
		});
	}

	handleButtonAUnselect = () => {
		this.setState(() => {
			return {
				inChangeMode: false,
				keyHold: false,
				keyDownTime: 0
			}
		});
	}

	handleButtonBUp = () => {
		this.setState((prevState) => {
			if (this.state.settingsIndex > 1) {
				return {
					settingsIndex: prevState.settingsIndex - 1
				}
			} else {
				return {
					settingsIndex: 7
				}
			}
		});
	}

	handleButtonBDecrease = () => {
		switch (this.state.settingsIndex) {
			case 1:
				if (this.props.settings.fontSize > 80 / remValue) {
					this.props.changeSettings("fontSize", this.props.settings.fontSize - (1 / remValue));
				}
				break;
			case 2:
				if (this.props.settings.lineHeight > 1.1) {
					this.props.changeSettings("lineHeight", this.props.settings.lineHeight - 0.01);
				}
				break;
			case 3:
				if (this.props.settings.colorIndex > 1) {
					this.props.changeSettings("colorIndex", this.props.settings.colorIndex - 1);
				} else this.props.changeSettings("colorIndex", 5);
				break;
			case 4:
				if (this.props.settings.textSpeed > 20) {
					this.props.changeSettings("textSpeed", this.props.settings.textSpeed - 1);
				}
				break;
			case 5:
				if (this.props.settings.holdButtonTime > 1000) {
					this.props.changeSettings("holdButtonTime", this.props.settings.holdButtonTime - 100);
				}
				break;
			case 6:
				this.props.changeOrientation();
				break;
			default:
				console.log("The impossible just happened.");
		}
	}

	handleButtonCDown = () => {
		this.setState((prevState) => {
			if (this.state.settingsIndex < 7) {
				return {
					settingsIndex: prevState.settingsIndex + 1
				}
			} else {
				return {
					settingsIndex: 1
				}
			}
		});
	}

	handleButtonCIncrease = () => {
		switch (this.state.settingsIndex) {
			case 1:
				if (this.props.settings.fontSize < 150 / remValue) {
					this.props.changeSettings("fontSize", this.props.settings.fontSize + (1 / remValue));
				}
				break;
			case 2:
				if (this.props.settings.lineHeight < 1.75) {
					this.props.changeSettings("lineHeight", this.props.settings.lineHeight + 0.01);
				}
				break;
			case 3:
				if (this.props.settings.colorIndex < 5) {
					this.props.changeSettings("colorIndex", this.props.settings.colorIndex + 1);
				} else this.props.changeSettings("colorIndex", 1);
				break;
			case 4:
				if (this.props.settings.textSpeed < 200) {
					this.props.changeSettings("textSpeed", this.props.settings.textSpeed + 1);
				}
				break;
			case 5:
				if (this.props.settings.holdButtonTime < 5000) {
					this.props.changeSettings("holdButtonTime", this.props.settings.holdButtonTime + 100);
				}
				break;
			case 6:
				this.props.changeOrientation();
				break;
			default:
				console.log("The impossible just happened.");
		}
	}

	render() {
		const { settingsIndex, inChangeMode } = this.state;
		const { settings } = this.props;

		let listPosTop = (2.75 - settingsIndex) * settings.fontSize * settings.lineHeight;
		let listPosLeftA = (inChangeMode) ? settings.fontSize * 0.69 - settings.fontSize * 8.02 : settings.fontSize * 0.69;
		let listPosLeftB = (inChangeMode) ? settings.fontSize * 0.69 : settings.fontSize * 8.02;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="settings"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize + "rem",
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					className={"title " + (settingsIndex === 1 ? "visible" : "hidden")}
					style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight + "rem" }} >
					SETTINGS:
				</p>
				<Marker
					top={1.75 * settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<ul style={{ top: listPosTop + "rem", left: listPosLeftA + "rem" }}>
					<li>Font size:</li>
					<li>Line height:</li>
					<li>UI color:</li>
					<li>Text speed:</li>
					<li>Alt key time:</li>
					<li>Orientation:</li>
					<li>Default settings</li>
				</ul>
				<ul style={{ top: listPosTop + "rem", left: listPosLeftB + "rem" }}>
					<li>{Math.floor(settings.fontSize * remValue)}</li>
					<li>{settings.lineHeight.toFixed(2)}</li>
					<li>{colors[settings.colorIndex].name}</li>
					<li>{settings.textSpeed}%</li>
					<li>{(settings.holdButtonTime / 1000).toFixed(1)} s</li>
					<li>{settings.orientation}</li>
					<li></li>
				</ul>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonAKeyDown}
						mouseUpHandler={inChangeMode ? this.handleButtonAUnselect : this.handleButtonASelectHome}
						icon="selectHome"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={inChangeMode ? this.handleButtonBDecrease : this.handleButtonBUp}
						icon={inChangeMode ? "left" : "up"}
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={inChangeMode ? this.handleButtonCIncrease : this.handleButtonCDown}
						icon={inChangeMode ? "right" : "down"}
					/>
				</div>
			</div>
		)
	}
}

export default Settings;
