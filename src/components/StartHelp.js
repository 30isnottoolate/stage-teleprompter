import React from 'react';
import '../Teleprompter.css';
import ControlButton from './ControlButton';
import Marker from './Marker';

class StartHelp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			helpIndex: 1,
			keyHold: false,
			keyDownTime: ""
		};
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress);
		document.addEventListener("keyup", this.handleKeyHold);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress);
		document.removeEventListener("keyup", this.handleKeyHold);
	}

	handleKeyPress = (event) => {
		this.setState((prevState) => {
			if (!prevState.keyHold) {
				if (event.key === "a") {
					return {
						keyHold: true,
						keyDownTime: (new Date()).getTime()
					}
				} else if (event.key === "b") {
					return {
						keyHold: true,
						keyDownTime: (new Date()).getTime()
					}
				} else if (event.key === "c" && !event.repeat) {
					if (this.state.helpIndex < 5) {
						return {
							helpIndex: prevState.helpIndex + 1
						}
					} else {
						return {
							helpIndex: 1
						}
					}
				}
			}
		});
	}

	handleKeyHold = (event) => {
		this.setState((prevState) => {
			if (prevState.keyHold) {
				if (event.key === "a") {
					if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
						this.handleButtonASet();
					} else {
						return {
							keyHold: false,
							keyDownTime: ""
						}
					}
				} else if (event.key === "b") {
					if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
						this.handleButtonBList();
					} else {
						return {
							keyHold: false,
							keyDownTime: ""
						}
					}
				}
			}
		});
	}

	handleButtonASet = () => this.props.mode("set");

	handleButtonBList = () => this.props.mode("select");

	handleButtonCDown = () => {
		this.setState((prevState) => {
			if (this.state.helpIndex < 5) {
				return {
					helpIndex: prevState.helpIndex + 1
				}
			} else {
				return {
					helpIndex: 1
				}
			}
		})
	}

	render() {
		let listPos = (3 - this.state.helpIndex) * this.props.state.fontSize * this.props.state.lineHeight;
		let stateColor = this.props.colors[this.props.state.colorIndex].code;
		let respWidth;

		if (this.props.state.orientation === "vertical") {
			respWidth = "100vh";
		} else respWidth = "100vw";

		return (
			<div
				id="text-list"
				className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: this.props.state.fontSize,
					color: stateColor,
					lineHeight: this.props.state.lineHeight
				}}>
				<p
					id="head-line"
					className={this.state.helpIndex <= 2 ? "visible" : "hidden"}>
					KV Teleprompter
				</p>
				<p
					id="sub-line"
					className={this.state.helpIndex === 1 ? "visible" : "hidden"}
					style={{
						position: "absolute",
						left: (this.props.state.fontSize * 0.69)
					}}>
					Control symbols:
				</p>
				<Marker
					top={2 * this.props.state.fontSize * this.props.state.lineHeight}
					left={this.props.state.fontSize * 0.19}
					fontSize={this.props.state.fontSize}
					lineHeight={this.props.state.lineHeight}
					stateColor={stateColor}
				/>
				<ul
					style={{
						top: listPos,
						left: this.props.state.fontSize * 0.69,
						width: respWidth
					}}>
					<li>&#9651;&#9661; - Previous / Next</li>
					<li>&#9665;&#9655; - Change setting</li>
					<li>&#9655;&#9634; - Start / Stop</li>
					<li>&#9636; - Text List</li>
					<li>&#8984; - Settings</li>
				</ul>
				<div id="control" style={{ width: respWidth }}>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonASet}
						icon="settings"
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonBList}
						icon="list"
					/>
					<ControlButton
						fontSize={this.props.state.fontSize}
						stateColor={stateColor}
						clickHandler={this.handleButtonCDown}
						icon="down"
					/>
				</div>
			</div>
		)
	}
}

export default StartHelp;
