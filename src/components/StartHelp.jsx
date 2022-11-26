import React from 'react';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

class StartHelp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			helpIndex: 1,
			keyHold: false,
			keyDownTime: 0
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
					if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
						this.handleButtonASet();
					} else {
						return {
							keyHold: false,
							keyDownTime: 0
						}
					}
				} else if (event.key === "b") {
					if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
						this.handleButtonBList();
					} else {
						return {
							keyHold: false,
							keyDownTime: 0
						}
					}
				}
			}
		});
	}

	handleButtonASet = () => this.props.changeMode("set");

	handleButtonBList = () => this.props.changeMode("select");

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
		const {helpIndex} = this.state;
		const {settings} = this.props;

		let listPos = (3 - helpIndex) * settings.fontSize * settings.lineHeight;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="text-list"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					id="head-line"
					className={helpIndex <= 2 ? "visible" : "hidden"}>
					KV Teleprompter
				</p>
				<p
					id="sub-line"
					className={helpIndex === 1 ? "visible" : "hidden"}
					style={{
						position: "absolute",
						left: (settings.fontSize * 0.69)
					}}>
					Control symbols:
				</p>
				<Marker
					top={2 * settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<ul
					style={{
						top: listPos,
						left: settings.fontSize * 0.69,
						width: responsiveWidth
					}}>
					<li>&#9651;&#9661; - Previous / Next</li>
					<li>&#9665;&#9655; - Change setting</li>
					<li>&#9655;&#9634; - Start / Stop</li>
					<li>&#9636; - Text List</li>
					<li>&#8984; - Settings</li>
				</ul>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonASet}
						icon="settings"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonBList}
						icon="list"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonCDown}
						icon="down"
					/>
				</div>
			</div>
		)
	}
}

export default StartHelp;
