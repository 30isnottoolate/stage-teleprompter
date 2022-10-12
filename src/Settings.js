import React from 'react';
import './Teleprompter.css';

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
		this.setState((prevState) => {
			if (!this.state.keyHold) {
				if (!this.state.inChangeMode) {
					if (event.key === "a") {
						return {
							keyHold: true,
							keyDownTime: (new Date()).getTime()
						}
					} else if (event.key === "b" && !event.repeat) {
						if (this.state.settingsIndex > 1) {
							return {
								settingsIndex: prevState.settingsIndex - 1
							}
						} else {
							return {
								settingsIndex: 8
							}
						}
					} else if (event.key === "c" && !event.repeat) {
						if (this.state.settingsIndex < 8) {
							return {
								settingsIndex: prevState.settingsIndex + 1
							}
						} else {
							return {
								settingsIndex: 1
							}
						}
					}
				} else {
					if (event.key === "a") {
						return {
							inChangeMode: false
						}
					} else if (event.key === "b") {
						if (prevState.settingsIndex === 1 && this.props.state.fontSize > 80) {
							this.props.settings("fontSize", this.props.state.fontSize - 1);
						} else if (prevState.settingsIndex === 2 && this.props.state.lineHeight > 1) {
							this.props.settings("lineHeight", this.props.state.lineHeight - 0.01);
						} else if (prevState.settingsIndex === 3 && this.props.state.colorIndex > 1) {
							this.props.settings("colorIndex", this.props.state.colorIndex - 1);
						} else if (prevState.settingsIndex === 4 && this.props.state.textSpeed > 20) {
							this.props.settings("textSpeed", this.props.state.textSpeed - 1);
						} else if (prevState.settingsIndex === 5 && this.props.state.holdButtonTime > 1000) {
							this.props.settings("holdButtonTime", this.props.state.holdButtonTime - 10);
						} else if (prevState.settingsIndex === 6) {
							if (this.props.state.orientation === "horizontal") {
								this.props.settings("orientation", "vertical");
							} else {
								this.props.settings("orientation", "horizontal");
							}
						}
					} else if (event.key === "c") {
						if (prevState.settingsIndex === 1 && this.props.state.fontSize < 150) {
							this.props.settings("fontSize", this.props.state.fontSize + 1);
						} else if (prevState.settingsIndex === 2 && this.props.state.lineHeight < 1.5) {
							this.props.settings("lineHeight", this.props.state.lineHeight + 0.01);
						} else if (prevState.settingsIndex === 3 && this.props.state.colorIndex < 5) {
							this.props.settings("colorIndex", this.props.state.colorIndex + 1);
						} else if (prevState.settingsIndex === 4 && this.props.state.textSpeed < 200) {
							this.props.settings("textSpeed", this.props.state.textSpeed + 1);
						} else if (prevState.settingsIndex === 5 && this.props.state.holdButtonTime < 5000) {
							this.props.settings("holdButtonTime", this.props.state.holdButtonTime + 10);
						} else if (prevState.settingsIndex === 6) {
							if (this.props.state.orientation === "horizontal") {
								this.props.settings("orientation", "vertical");
							} else {
								this.props.settings("orientation", "horizontal");
							}
						}
					}
				}
			}
		});
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
			if (this.state.settingsIndex === 1 && this.props.state.fontSize > 80) {
				this.props.settings("fontSize", this.props.state.fontSize - 1);
			} else if (this.state.settingsIndex === 2 && this.props.state.lineHeight > 1) {
				this.props.settings("lineHeight", this.props.state.lineHeight - 0.01);
			} else if (this.state.settingsIndex === 3 && this.props.state.colorIndex > 1) {
				this.props.settings("colorIndex", this.props.state.colorIndex - 1);
			} else if (this.state.settingsIndex === 4 && this.props.state.textSpeed > 20) {
				this.props.settings("textSpeed", this.props.state.textSpeed - 1);
			} else if (this.state.settingsIndex === 5 && this.props.state.holdButtonTime > 1000) {
				this.props.settings("holdButtonTime", this.props.state.holdButtonTime - 10);
			} else if (this.state.settingsIndex === 6) {
				if (this.props.state.orientation === "horizontal") {
					this.props.settings("orientation", "vertical");
				} else {
					this.props.settings("orientation", "horizontal");
				}
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
			if (this.state.settingsIndex === 1 && this.props.state.fontSize < 150) {
				this.props.settings("fontSize", this.props.state.fontSize + 1);
			} else if (this.state.settingsIndex === 2 && this.props.state.lineHeight < 1.5) {
				this.props.settings("lineHeight", this.props.state.lineHeight + 0.01);
			} else if (this.state.settingsIndex === 3 && this.props.state.colorIndex < 5) {
				this.props.settings("colorIndex", this.props.state.colorIndex + 1);
			} else if (this.state.settingsIndex === 4 && this.props.state.textSpeed < 200) {
				this.props.settings("textSpeed", this.props.state.textSpeed + 1);
			} else if (this.state.settingsIndex === 5 && this.props.state.holdButtonTime < 5000) {
				this.props.settings("holdButtonTime", this.props.state.holdButtonTime + 10);
			} else if (this.state.settingsIndex === 6) {
				if (this.props.state.orientation === "horizontal") {
					this.props.settings("orientation", "vertical");
				} else {
					this.props.settings("orientation", "horizontal");
				}
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
				<p
					id="text-marker"
					style={{
						top: (this.props.state.fontSize * this.props.state.lineHeight),
						left: this.props.state.fontSize * 0.19
					}} >
					&#129170;
				</p>
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
					<button
						id="button-a"
						style={{
							color: stateColor,
							borderColor: stateColor
						}}
						onClick={this.handleButtonAOptionList} >
						&#9711; / &#9636;
					</button>
					<button
						id="button-b"
						style={{
							color: stateColor,
							borderColor: stateColor
						}}
						onClick={this.handleButtonBUpDecrease} >
						{this.state.inChangeMode ? String.fromCharCode(9665) : String.fromCharCode(9651)}
					</button>
					<button
						id="button-c"
						style={{
							color: stateColor,
							borderColor: stateColor
						}}
						onClick={this.handleButtonCDownIncrease} >
						{this.state.inChangeMode ? String.fromCharCode(9655) : String.fromCharCode(9661)}
					</button>
				</div>
			</div>
		)
	}
}

export default Settings;
