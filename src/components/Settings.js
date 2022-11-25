import React from 'react';
import '../App.css';
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
		if (event.key === "a") {
			this.handleButtonAPushDown();
		} else {
			if ((!this.state.inChangeMode && !event.repeat) || this.state.inChangeMode) {
				if (event.key === "b") {
					this.handleButtonBUpDecrease();
				} else if (event.key === "c") {
					this.handleButtonCDownIncrease();
				}
			}
		}
	}

	handleKeyHold(event) {
		if (event.key === "a") {
			this.handleButtonAPushUp();
		}
	}

	handleButtonAPushDown = () => {
		if (!this.state.keyHold) {
			this.setState(() => {
				if (!this.state.inChangeMode) {
					return {
						keyHold: true,
						keyDownTime: (new Date()).getTime()
					}
				} else {
					return {
						inChangeMode: false
					}
				}
			});
		}
	}

	handleButtonAPushUp = () => {
		if (this.state.keyHold) {
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
				this.props.changeMode("select");
			} else {
				this.setState((prevState) => {
					if (this.state.settingsIndex === 7) {
						this.props.defaultSettings();
						return {
							keyHold: false,
							keyDownTime: 0
						}
					} else if (this.state.settingsIndex === 8) {
						this.props.changeMode("start");
					} else {
						return {
							keyHold: false,
							keyDownTime: 0,
							inChangeMode: !prevState.inChangeMode
						}
					}
				});
			}
		}
	}

	handleButtonBUpDecrease = () => {
		if (this.state.inChangeMode) {
			switch (this.state.settingsIndex) {
				case 1:
					if (this.props.settings.fontSize > 80) {
						this.props.changeSettings("fontSize", this.props.settings.fontSize - 1);
					}
					break;
				case 2:
					if (this.props.settings.lineHeight > 1) {
						this.props.changeSettings("lineHeight", this.props.settings.lineHeight - 0.01);
					}
					break;
				case 3:
					if (this.props.settings.colorIndex > 1) {
						this.props.changeSettings("colorIndex", this.props.settings.colorIndex - 1);
					}
					break;
				case 4:
					if (this.props.settings.textSpeed > 20) {
						this.props.changeSettings("textSpeed", this.props.settings.textSpeed - 1);
					}
					break;
				case 5:
					if (this.props.settings.holdButtonTime > 1000) {
						this.props.changeSettings("holdButtonTime", this.props.settings.holdButtonTime - 10);
					}
					break;
				case 6:
					this.props.changeOrientation();
					break;
				default:
					console.log("The impossible just happened.");
			}
		} else {
			this.setState((prevState) => {
				if (this.state.settingsIndex > 1) {
					return {
						settingsIndex: prevState.settingsIndex - 1
					}
				} else {
					return {
						settingsIndex: 8
					}
				}
			});
		}
	}

	handleButtonCDownIncrease = () => {
		if (this.state.inChangeMode) {
			switch (this.state.settingsIndex) {
				case 1:
					if (this.props.settings.fontSize < 150) {
						this.props.changeSettings("fontSize", this.props.settings.fontSize + 1);
					}
					break;
				case 2:
					if (this.props.settings.lineHeight < 1.5) {
						this.props.changeSettings("lineHeight", this.props.settings.lineHeight + 0.01);
					}
					break;
				case 3:
					if (this.props.settings.colorIndex < 5) {
						this.props.changeSettings("colorIndex", this.props.settings.colorIndex + 1);
					}
					break;
				case 4:
					if (this.props.settings.textSpeed < 200) {
						this.props.changeSettings("textSpeed", this.props.settings.textSpeed + 1);
					}
					break;
				case 5:
					if (this.props.settings.holdButtonTime < 5000) {
						this.props.changeSettings("holdButtonTime", this.props.settings.holdButtonTime + 10);
					}
					break;
				case 6:
					this.props.changeOrientation();
					break;
				default:
					console.log("The impossible just happened.");
			}
		} else {
			this.setState((prevState) => {
				if (this.state.settingsIndex < 8) {
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
	}

	render() {
		const {settingsIndex, inChangeMode} = this.state;
		const {settings, colors} = this.props;

		let listPosTop = (2 - settingsIndex) * settings.fontSize * settings.lineHeight;
		let listPosLeftA = (inChangeMode) ? settings.fontSize * 0.69 - settings.fontSize * 8.02 : settings.fontSize * 0.69;
		let listPosLeftB = (inChangeMode) ? settings.fontSize * 0.69 : settings.fontSize * 8.02;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="settings"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					id="head-line"
					className={settingsIndex === 1 ? "visible" : "hidden"}>
					SETTINGS:
				</p>
				<Marker
					top={settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<ul style={{ top: listPosTop, left: listPosLeftA }}>
					<li>Font size:</li>
					<li>Line height:</li>
					<li>UI color:</li>
					<li>Text speed:</li>
					<li>Alt key time:</li>
					<li>Orientation:</li>
					<li>Default settings</li>
					<li>Got to start screen</li>
				</ul>
				<ul style={{ top: listPosTop, left: listPosLeftB }}>
					<li>{settings.fontSize}</li>
					<li>{settings.lineHeight.toFixed(2)}</li>
					<li>{colors[settings.colorIndex].name}</li>
					<li>{settings.textSpeed}%</li>
					<li>{settings.holdButtonTime} ms</li>
					<li>{settings.orientation}</li>
					<li></li>
				</ul>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonAPushDown}
						mouseUpHandler={this.handleButtonAPushUp}
						icon="selectList"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonBUpDecrease}
						icon={inChangeMode ? "left" : "up"}
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonCDownIncrease}
						icon={inChangeMode ? "right" : "down"}
					/>
				</div>
			</div>
		)
	}
}

export default Settings;
