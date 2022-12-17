import React from 'react';
import colors from '../utilities/colors';
import Marker from './Marker';
import Icon from './Icon';
import ControlButton from './ControlButton';

class InfoPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			infoIndex: 1
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
		if (event.key.toLowerCase() === "b" && !event.repeat) {
			this.handleButtonBUp();
		} else if (event.key.toLowerCase() === "c" && !event.repeat) {
			this.handleButtonCDown();
		}
	}

	handleKeyUp = (event) => {
		if (event.key.toLowerCase() === "a") {
			this.handleButtonAHome();
		}
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
					infoIndex: 13
				}
			}
		});
	}

	handleButtonCDown = () => {
		this.setState((prevState) => {
			if (prevState.infoIndex < 13) {
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
		const { infoIndex } = this.state;
		const { settings } = this.props;

		let listPos = (2.75 - infoIndex) * settings.fontSize * settings.lineHeight;
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
					className={"title " + (infoIndex <= 2 ? "visible" : "hidden")}
					style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight }} >
					How to use?
				</p>
				<Marker
					top={1.75 * settings.fontSize * settings.lineHeight}
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
					<Icon
						icon="up"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="up"
					/>
					<Icon
						icon="down"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="down"
					/>
					<Icon
						icon="right"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="increase"
					/>
					<Icon
						icon="left"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="decrease"
					/>
					<Icon
						icon="play"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="play"
					/>
					<Icon
						icon="pause"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="pause"
					/>
					<Icon
						icon="next"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="next"
					/>
					<Icon
						icon="home"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="home"
					/>
					<Icon
						icon="list"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="library"
					/>
					<Icon
						icon="settings"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="settings"
					/>
					<Icon
						icon="select"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="select"
					/>
					<Icon
						icon="refresh"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="refresh"
					/>
					<Icon
						icon="info"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
						text="info"
					/>
				</ul>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonAHome}
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
