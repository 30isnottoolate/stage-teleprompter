import React from 'react';
import '../Teleprompter.css';
import Marker from './Marker';
import ControlButton from './ControlButton';

class TextList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
				} else if (event.key === "b" && !event.repeat) {
					this.handleButtonBUp();
				} else if (event.key === "c" && !event.repeat) {
					this.handleButtonCDown();
				}
			}
		});
	}

	handleKeyHold = (event) => {
		this.setState((prevState) => {
			if (prevState.keyHold) {
				if (event.key === "a") {
					if (((new Date()).getTime() - this.state.keyDownTime) > this.props.state.holdButtonTime) {
						this.props.mode("set");
					} else {
						this.handleButtonASelectSet();
					}
				}
			}
		});
	}

	handleButtonASelectSet = () => this.props.mode("read");

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
		let respWidth;
		let list = "";

		if (this.props.state.orientation === "vertical") {
			respWidth = "100vh"
		} else respWidth = "100vw";

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
				list = list + `<li key=${i}>${this.props.state.data.texts[item].title}</li>`;
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
						dangerouslySetInnerHTML={{ __html: list }}
						style={{
							top: listPos,
							left: (this.props.state.fontSize * 0.69),
							width: `calc(${respWidth} - ${(this.props.state.fontSize * 0.69)}px)`
						}} />
					<Marker
						top={this.props.state.fontSize * this.props.state.lineHeight}
						left={this.props.state.fontSize * 0.19}
						fontSize={this.props.state.fontSize}
						lineHeight={this.props.state.lineHeight}
						stateColor={stateColor}
					/>
					<div id="control" style={{ width: respWidth }}>
						<ControlButton
							fontSize={this.props.state.fontSize}
							stateColor={stateColor}
							clickHandler={this.handleButtonASelectSet}
							icon="selectSettings"
						/>
						<ControlButton
							fontSize={this.props.state.fontSize}
							stateColor={stateColor}
							clickHandler={this.handleButtonBUp}
							icon="up"
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
}

export default TextList;
