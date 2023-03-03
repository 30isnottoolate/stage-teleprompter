import React from 'react';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

class TextList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		} else if (event.key.toLowerCase() === "b" && !event.repeat) {
			this.handleButtonBUp();
		} else if (event.key.toLowerCase() === "c" && !event.repeat) {
			this.handleButtonCDown();
		}
	}

	handleKeyUp = (event) => {
		if (event.key.toLowerCase() === "a") {
			this.handleButtonAKeyUp();
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

	handleButtonAKeyUp = () => {
		if (this.state.keyHold) {
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
				this.props.changeMode("home");
			} else {
				this.props.changeMode("read");
			}
		}
	}

	handleButtonBUp = () => {
		if (this.props.textIndex > 0) {
			this.props.changeTextIndex(this.props.textIndex - 1);
		} else {
			this.props.changeTextIndex(this.props.library.texts.length - 1);
		}
	}

	handleButtonCDown = () => {
		if (this.props.textIndex < this.props.library.texts.length - 1) {
			this.props.changeTextIndex(this.props.textIndex + 1);
		} else {
			this.props.changeTextIndex(0);
		}
	}

	render() {
		const { settings, library, textIndex } = this.props;

		let listPos = (1.75 - textIndex) * settings.fontSize * settings.lineHeight;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="text-list"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize + "rem",
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					className={"title " + (textIndex === 0 ? "visible" : "hidden")}
					style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight + "rem" }} >
					LIBRARY:
				</p>
				<ul
					style={{
						top: listPos + "rem",
						left: settings.fontSize * 0.69 + "rem",
						width: `calc(${responsiveWidth} - ${(settings.fontSize * 0.69)}rem)`
					}}
				>
					{library.texts.map((item, index) => <li key={index}>{item.title}</li>)}
				</ul>
				<Marker
					top={1.75 * settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonAKeyDown}
						mouseUpHandler={this.handleButtonAKeyUp}
						icon="selectHome"
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
		);
	}
}

export default TextList;
