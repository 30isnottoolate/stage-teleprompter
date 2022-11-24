import React from 'react';
import '../Teleprompter.css';
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
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
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
					if (this.props.state.fontSize > 80) {
						this.props.changeSettings("fontSize", this.props.state.fontSize - 1);
					}
					break;
				case 2:
					if (this.props.state.lineHeight > 1) {
						this.props.changeSettings("lineHeight", this.props.state.lineHeight - 0.01);
					}
					break;
				case 3:
					if (this.props.state.colorIndex > 1) {
						this.props.changeSettings("colorIndex", this.props.state.colorIndex - 1);
					}
					break;
				case 4:
					if (this.props.state.textSpeed > 20) {
						this.props.changeSettings("textSpeed", this.props.state.textSpeed - 1);
					}
					break;
				case 5:
					if (this.props.state.holdButtonTime > 1000) {
						this.props.changeSettings("holdButtonTime", this.props.state.holdButtonTime - 10);
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
					if (this.props.state.fontSize < 150) {
						this.props.changeSettings("fontSize", this.props.state.fontSize + 1);
					}
					break;
				case 2:
					if (this.props.state.lineHeight < 1.5) {
						this.props.changeSettings("lineHeight", this.props.state.lineHeight + 0.01);
					}
					break;
				case 3:
					if (this.props.state.colorIndex < 5) {
						this.props.changeSettings("colorIndex", this.props.state.colorIndex + 1);
					}
					break;
				case 4:
					if (this.props.state.textSpeed < 200) {
						this.props.changeSettings("textSpeed", this.props.state.textSpeed + 1);
					}
					break;
				case 5:
					if (this.props.state.holdButtonTime < 5000) {
						this.props.changeSettings("holdButtonTime", this.props.state.holdButtonTime + 10);
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
		let listPosTop = (2 - this.state.settingsIndex) * this.props.state.fontSize * this.props.state.lineHeight;
		let listPosLeftA = (this.state.inChangeMode) ? this.props.state.fontSize * 0.69 - this.props.state.fontSize * 8.02 : this.props.state.fontSize * 0.69;
		let listPosLeftB = (this.state.inChangeMode) ? this.props.state.fontSize * 0.69 : this.props.state.fontSize * 8.02;
		let stateColor = this.props.colors[this.props.state.colorIndex].code;
		let responsiveWidth = (this.props.state.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="settings"
				className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: this.props.state.fontSize,
					color: stateColor,
					lineHeight: this.props.state.lineHeight
				}}>
				<p
					id="head-line"
					className={this.state.settingsIndex === 1 ? "visible" : "hidden"}>
					SETTINGS:
				</p>
				<Marker
					top={this.props.state.fontSize * this.props.state.lineHeight}
					left={this.props.state.fontSize * 0.19}
					fontSize={this.props.state.fontSize}
					lineHeight={this.props.state.lineHeight}
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
					<li>{this.props.state.fontSize}</li>
					<li>{this.props.state.lineHeight.toFixed(2)}</li>
					<li>{this.props.colors[this.props.state.colorIndex].name}</li>
					<li>{this.props.state.textSpeed}%</li>
					<li>{this.props.state.holdButtonTime} ms</li>
					<li>{this.props.state.orientation}</li>
					<li></li>
				</ul>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonAPushDown}
						mouseUpHandler={this.handleButtonAPushUp}
						icon="selectList"
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonBUpDecrease}
						icon={this.state.inChangeMode ? "left" : "up"}
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonCDownIncrease}
						icon={this.state.inChangeMode ? "right" : "down"}
					/>
				</div>
			</div>
		)
	}
}

export default Settings;
