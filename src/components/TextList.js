import React from 'react';
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
		document.addEventListener("keydown", this.handleKeyPress);
		document.addEventListener("keyup", this.handleKeyHold);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress);
		document.removeEventListener("keyup", this.handleKeyHold);
	}

	handleKeyPress = (event) => {
		if (event.key === "a") {
			this.handleButtonAPushDown();
		} else if (event.key === "b" && !event.repeat) {
			this.handleButtonBUp();
		} else if (event.key === "c" && !event.repeat) {
			this.handleButtonCDown();
		}
	}

	handleKeyHold = (event) => {
		if (event.key === "a") {
			this.handleButtonAPushUp();
		}
	}

	handleButtonAPushDown = () => {
		if (!this.state.keyHold) {
			this.setState(() => {
				return {
					keyHold: true,
					keyDownTime: (new Date()).getTime()
				}
			});
		}
	}

	handleButtonAPushUp = () => {
		if (this.state.keyHold) {
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.settings.holdButtonTime) {
				this.props.changeMode("set");
			} else {
				this.props.changeMode("read");
			}
		}
	}

	handleButtonBUp = () => {
		if (this.props.textIndex > 1) {
			this.props.changeTextIndex(this.props.textIndex - 1);
		} else {
			this.props.changeTextIndex(Object.keys(this.props.data.texts).length);
		}
	}

	handleButtonCDown = () => {
		if (this.props.textIndex < Object.keys(this.props.data.texts).length) {
			this.props.changeTextIndex(this.props.textIndex + 1);
		} else {
			this.props.changeTextIndex(1);
		}
	}

	render() {
		const {settings, data, textIndex, colors} = this.props;

		let listPos = (2 - textIndex) * settings.fontSize * settings.lineHeight;
		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";
		let list = [];

		if (Object.keys(data.texts).length === 0) { 
			return (
				<div
					id="text-list"
					style={{
						fontSize: settings.fontSize,
						color: stateColor
					}}>
					<p id="head-line">Loading text list...</p>
				</div>
			)
		} else {
			let i = 0;
			for (const item in data.texts) {
				list.push(<li key={i}>{data.texts[item].title}</li>);
				i++;
			}

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
						className={textIndex === 1 ? "visible" : "hidden"}>
						SELECT:
					</p>
					<ul
						style={{
							top: listPos,
							left: (settings.fontSize * 0.69),
							width: `calc(${responsiveWidth} - ${(settings.fontSize * 0.69)}px)`
						}}
					>
					{list.map(item => item)}	
					</ul>
					<Marker
						top={settings.fontSize * settings.lineHeight}
						left={settings.fontSize * 0.19}
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
					/>
					<div id="control" style={{ width: responsiveWidth }}>
						<ControlButton
							fontSize={settings.fontSize}
							stateColor={stateColor}
							mouseDownHandler={this.handleButtonAPushDown}
							mouseUpHandler={this.handleButtonAPushUp}
							icon="selectSettings"
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
}

export default TextList;
