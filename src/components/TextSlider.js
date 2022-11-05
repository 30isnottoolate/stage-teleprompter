import React from 'react';
import '../Teleprompter.css';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

class TextSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			timer: "",
			position: 0,
			currentText: "Loading...",
			endReached: false,
			keyHold: false,
			keyDownTime: ""
		};

		this.slideRef = React.createRef();
	}

	componentDidMount() {
		this.fetchText(this.props.state.textIndex);

		document.addEventListener("keydown", this.handleKeyPress);
		document.addEventListener("keyup", this.handleKeyHold);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.currentText !== prevState.currentText) {
			let noEmptyLinesTextHeight = this.slideRef.current.offsetHeight - this.props.state.fontSize * this.props.state.lineHeight * this.countEmptyLines(this.state.currentText);
			let intervalValue = (this.state.currentText.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / this.props.state.textSpeed);
			let intervalID = setInterval(() => { this.moveSlide(); }, intervalValue);

			clearInterval(this.state.timer);

			this.setState({
				timer: intervalID
			});
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
		document.removeEventListener("keydown", this.handleKeyPress);
		document.removeEventListener("keyup", this.handleKeyHold);
	}

	countEmptyLines = (input) => {
		return (input.match(/^[ ]*$/gm) || []).length;
	}

	fetchText = (index) => {
		fetch(this.props.state.data.texts["text_" + index].url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.text())
			.then(data => {
				this.setState({
					position: this.props.state.fontSize * this.props.state.lineHeight,
					currentText: data,
					endReached: false,
					keyHold: false,
					keyDownTime: ""
				});
			})
			.catch(() => console.log("Text missing."));
	}

	handleKeyPress = (event) => {
		this.setState((prevState) => {
			if (!prevState.keyHold) {
				if (event.key === "a" || event.key === "b" || event.key === "c") {
					return {
						keyHold: true,
						keyDownTime: (new Date()).getTime()
					}
				}
			}
		});
	}

	handleKeyHold = (event) => {
		this.setState((prevState, prevProps) => {
			let holdButtonCondition = ((new Date()).getTime() - prevState.keyDownTime) > this.props.state.holdButtonTime;
			let holdButtonReset = { keyHold: false, keyDownTime: "" };

			if (prevState.keyHold) {
				if (event.key === "a") {
					if (holdButtonCondition) {
						this.handleButtonASet();
					} else {
						return holdButtonReset;
					}
				} else if (event.key === "b") {
					if (holdButtonCondition) {
						this.handleButtonBList();
					}
					else {
						return holdButtonReset;
					}
				} else if (event.key === "c") {
					if (this.state.endReached) {
						if (holdButtonCondition) {
							if (this.props.state.textIndex < this.props.state.textCount) {
								this.fetchText(prevProps.state.textIndex + 1);
								this.props.index(prevProps.state.textIndex + 1);
							} else {
								this.fetchText(1);
								this.props.index(1);
							}
						} else {
							return holdButtonReset;
						}
					} else {
						return {
							active: !prevState.active,
							keyHold: false,
							keyDownTime: ""
						}
					}
				}
			}
		});
	}

	moveSlide = () => {
		this.setState((prevState) => {
			if (prevState.active) {
				if (this.slideRef.current.offsetHeight > (prevState.position * (-1) +
					(this.props.state.fontSize * this.props.state.lineHeight * 2)) &&
					(prevState.position) <= (this.props.state.fontSize * this.props.state.lineHeight)) {
					return {
						position: prevState.position - 1
					}
				} else {
					return {
						active: false,
						position: prevState.position + 1,
						endReached: true
					}
				}
			}
		});
	}

	handleButtonASet = () => this.props.mode("set");

	handleButtonBList = () => this.props.mode("select");

	handleButtonCStartStop = () => {
		this.setState((prevState) => ({
			active: !prevState.active
		}));
	}

	render() {
		let stateColor = this.props.colors[this.props.state.colorIndex].code;
		let respWidth;
		let slideStyle;

		if (this.props.state.orientation === "vertical") {
			respWidth = "100vh";
		} else respWidth = "100vw";

		if (this.props.state.textSpeed < 50) {
			slideStyle = "top";
		} else slideStyle = "none";

		const buttonCLabel = () => {
			if (this.state.endReached) {
				return "next";
			} else {
				if (this.state.active) {
					return "pause";
				} else return "play";
			}
		}

		return (
			<div
				id="text-slide"
				className={this.props.state.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: this.props.state.fontSize,
					color: stateColor,
					lineHeight: this.props.state.lineHeight
				}}>
				<p
					id="text-marker"
					style={{
						top: (this.props.state.fontSize * this.props.state.lineHeight),
						left: (this.props.state.fontSize * 0.19)
					}}>&#129170;
				</p>
				<div
					id="slide"
					ref={this.slideRef}
					style={{
						top: this.state.position,
						width: `calc(${respWidth} - ${(this.props.state.fontSize * 0.69)}px)`,
						fontSize: this.props.state.fontSize,
						left: (this.props.state.fontSize * 0.69),
						transitionProperty: slideStyle
					}} >
					<p
						id="text"
						dangerouslySetInnerHTML={{ __html: this.state.currentText }} />
				</div>
				<div
					id="control"
					className={this.state.active ? "transparent" : "visible"}
					style={{ width: respWidth }}>
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
						clickHandler={this.handleButtonCStartStop}
						icon={buttonCLabel()}
					/>
				</div>
			</div>
		)
	}
}

export default TextSlider;
