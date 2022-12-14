import React from 'react';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

class InfoPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			infoIndex: 1,
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
				} else if (event.key === "b" && !event.repeat) {
					if (this.state.infoIndex > 1) {
						return {
							infoIndex: prevState.infoIndex - 1
						}
					} else {
						return {
							infoIndex: 5
						}
					}
				} else if (event.key === "c" && !event.repeat) {
					if (this.state.infoIndex < 5) {
						return {
							infoIndex: prevState.infoIndex + 1
						}
					} else {
						return {
							infoIndex: 1
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
						this.handleButtonAHome();
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

	handleButtonAHome = () => this.props.changeMode("home");

	handleButtonBUp = () => {
		this.setState((prevState) => {
			if (prevState.infoIndex > 1) {
				return {
					infoIndex: prevState.infoIndex - 1
				}
			} else {
				return {
					infoIndex: 5
				}
			}
		});
	}

	handleButtonCDown = () => {
		this.setState((prevState) => {
			if (prevState.infoIndex < 5) {
				return {
					infoIndex: prevState.infoIndex + 1
				}
			} else {
				return {
					infoIndex: 1
				}
			}
		});
	}

	render() {
		const {infoIndex} = this.state;
		const {settings} = this.props;

		let listPos = (2.5 - infoIndex) * settings.fontSize * settings.lineHeight;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="info-page"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					className={"title " + (infoIndex <= 2 ? "visible" : "hidden")}>
					How to use?
				</p>
				<Marker
					top={1.5 * settings.fontSize * settings.lineHeight}
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
						mouseDownHandler={this.handleButtonAHome}
						icon="home"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonBUp}
						icon="up"
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

export default InfoPage;
