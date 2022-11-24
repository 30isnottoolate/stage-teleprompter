import React from 'react';
import '../Teleprompter.css';
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
			if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
				this.props.changeMode("set");
			} else {
				this.props.changeMode("read");
			}
		}
	}

	handleButtonBUp = () => {
		if (this.props.state.textIndex > 1) {
			this.props.index(this.props.state.textIndex - 1);
		} else {
			this.props.index(this.props.state.textCount);
		}
	}

	handleButtonCDown = () => {
		if (this.props.state.textIndex < this.props.state.textCount) {
			this.props.index(this.props.state.textIndex + 1);
		} else {
			this.props.index(1);
		}
	}

	render() {
		let listPos = (2 - this.props.state.textIndex) * this.props.state.fontSize * this.props.state.lineHeight;
		let stateColor = this.props.colors[this.props.state.colorIndex].code;
		let responsiveWidth = (this.props.state.orientation === "vertical") ? "100vh" : "100vw";
		let list = [];

		if (this.props.state.textCount === 0) {
			return (
				<div
					id="text-list"
					style={{
						fontSize: this.props.state.fontSize,
						color: stateColor
					}}>
					<p id="head-line">Loading text list...</p>
				</div>
			)
		} else {
			let i = 0;
			for (const item in this.props.state.data.texts) {
				list.push(<li key={i}>{this.props.state.data.texts[item].title}</li>);
				i++;
			}

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
						className={this.props.state.textIndex === 1 ? "visible" : "hidden"}>
						SELECT:
					</p>
					<ul
						style={{
							top: listPos,
							left: (this.props.state.fontSize * 0.69),
							width: `calc(${responsiveWidth} - ${(this.props.state.fontSize * 0.69)}px)`
						}}
					>
					{list.map(item => item)}	
					</ul>
					<Marker
						top={this.props.state.fontSize * this.props.state.lineHeight}
						left={this.props.state.fontSize * 0.19}
						fontSize={this.props.state.fontSize}
						lineHeight={this.props.state.lineHeight}
						stateColor={stateColor}
					/>
					<div id="control" style={{ width: responsiveWidth }}>
						<ControlButton
							fontSize={this.props.state.fontSize}
							stateColor={stateColor}
							mouseDownHandler={this.handleButtonAPushDown}
							mouseUpHandler={this.handleButtonAPushUp}
							icon="selectSettings"
						/>
						<ControlButton
							fontSize={this.props.state.fontSize}
							stateColor={stateColor}
							mouseDownHandler={this.handleButtonBUp}
							icon="up"
						/>
						<ControlButton
							fontSize={this.props.state.fontSize}
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
