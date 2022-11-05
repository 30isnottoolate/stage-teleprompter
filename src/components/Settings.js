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
			keyDownTime: ""
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
		if (!this.state.keyHold && event.key === "a") {
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
		if (this.state.keyHold) {
			if (event.key === "a") {
				if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
					this.props.mode("select");
				} else {
					this.handleButtonAOptionList();
				}
			}
		}
	}

	handleButtonAOptionList = () => {
		this.setState((prevState) => {
			if (this.state.settingsIndex === 7) {
				this.props.default();
				return {
					keyHold: false,
					keyDownTime: ""
				}
			} else if (this.state.settingsIndex === 8) {
				this.props.mode("start");
			} else {
				return {
					keyHold: false,
					keyDownTime: "",
					inChangeMode: !prevState.inChangeMode
				}
			}
		});
	}

	handleButtonBUpDecrease = () => {
		if (this.state.inChangeMode) {
			switch (this.state.settingsIndex) {
				case 1:
					if (this.props.state.fontSize > 80) {
						this.props.settings("fontSize", this.props.state.fontSize - 1);
					}
					break;
				case 2:
					if (this.props.state.lineHeight > 1) {
						this.props.settings("lineHeight", this.props.state.lineHeight - 0.01);
					}
					break;
				case 3:
					if (this.props.state.colorIndex > 1) {
						this.props.settings("colorIndex", this.props.state.colorIndex - 1);
					}
					break;
				case 4:
					if (this.props.state.textSpeed > 20) {
						this.props.settings("textSpeed", this.props.state.textSpeed - 1);
					}
					break;
				case 5:
					if (this.props.state.holdButtonTime > 1000) {
						this.props.settings("holdButtonTime", this.props.state.holdButtonTime - 10);
					}
					break;
				case 6:
					this.props.changeOrientation();
					break;
				default:
					console.log("This should have never happened.");
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
						this.props.settings("fontSize", this.props.state.fontSize + 1);
					}
					break;
				case 2:
					if (this.props.state.lineHeight < 1.5) {
						this.props.settings("lineHeight", this.props.state.lineHeight + 0.01);
					}
					break;
				case 3:
					if (this.props.state.colorIndex < 5) {
						this.props.settings("colorIndex", this.props.state.colorIndex + 1);
					}
					break;
				case 4:
					if (this.props.state.textSpeed < 200) {
						this.props.settings("textSpeed", this.props.state.textSpeed + 1);
					}
					break;
				case 5:
					if (this.props.state.holdButtonTime < 5000) {
						this.props.settings("holdButtonTime", this.props.state.holdButtonTime + 10);
					}
					break;
				case 6:
					this.props.changeOrientation();
					break;
				default:
					console.log("This should have never happened.");
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
		let listPosLeftA;
		let listPosLeftB;
		let stateColor = this.props.colors[this.props.state.colorIndex].code;
		let respWidth;

		if (this.props.state.orientation === "vertical") {
			respWidth = "100vh";
		} else respWidth = "100vw";

		if (this.state.inChangeMode) {
			listPosLeftA = this.props.state.fontSize * 0.69 - this.props.state.fontSize * 8.02;
			listPosLeftB = this.props.state.fontSize * 0.69;
		} else {
			listPosLeftA = this.props.state.fontSize * 0.69;
			listPosLeftB = this.props.state.fontSize * 8.02;
		}

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
				<div id="control" style={{ width: respWidth }}>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonAOptionList}
						icon="selectList"
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonBUpDecrease}
						icon={this.state.inChangeMode ? "left" : "up"}
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonCDownIncrease}
						icon={this.state.inChangeMode ? "right" : "down"}
					/>
				</div>
			</div>
		)
	}
}

export default Settings;
