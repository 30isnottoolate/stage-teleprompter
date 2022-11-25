import React from 'react';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

class TextSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			timer: () => {},
			position: 0,
			currentText: "Loading...",
			endReached: false,
			keyHold: false,
			keyDownTime: 0
		};

		this.slideRef = React.createRef();
	}

	componentDidMount() {
		this.fetchText(this.props.textIndex);

		document.addEventListener("keydown", this.handleKeyPress);
		document.addEventListener("keyup", this.handleKeyHold);
	}

	componentDidUpdate(prevProps, prevState) {
		if ((this.state.currentText !== prevState.currentText) || (this.state.active !== prevState.active)) {
			let noEmptyLinesTextHeight = this.slideRef.current.offsetHeight - this.props.settings.fontSize * 
				this.props.settings.lineHeight * this.countEmptyLines(this.state.currentText);
			let intervalValue = (this.state.currentText.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / this.props.settings.textSpeed);

			clearInterval(this.state.timer);

			if (this.state.active) {
				this.setState({
					timer: setInterval(() => this.setState((prevState) => ({position: prevState.position - 1})), intervalValue)
				});
			}
		} else if (this.state.position !== prevState.position) {
			this.setState((prevState) => {
				if (!(this.slideRef.current.offsetHeight > ((-1) * prevState.position + (this.props.settings.fontSize * this.props.settings.lineHeight * 2)) 
				&& (prevState.position) <= (this.props.settings.fontSize * this.props.settings.lineHeight))) {
					return {
						active: false,
						endReached: true
					}
				}
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
		fetch(this.props.data.texts["text_" + index].url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.text())
			.then(text => {
				this.setState({
					position: this.props.settings.fontSize * this.props.settings.lineHeight,
					currentText: text,
					endReached: false,
					keyHold: false,
					keyDownTime: 0
				});
			})
			.catch(() => console.log("Text missing."));
	}

	nextText = () => {
		if (this.props.textIndex < Object.keys(this.props.data.texts).length) {
			this.fetchText(this.props.textIndex + 1);
			this.props.changeTextIndex(this.props.textIndex + 1);
		} else {
			this.fetchText(1);
			this.props.changeTextIndex(1);
		}
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
			let holdButtonCondition = ((new Date()).getTime() - prevState.keyDownTime) > this.props.settings.holdButtonTime;
			let holdButtonReset = { keyHold: false, keyDownTime: 0 };

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
							this.nextText();
						} else {
							return holdButtonReset;
						}
					} else {
						return {
							active: !prevState.active,
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

	handleButtonCStartStop = () => {
		this.setState((prevState, prevProps) => {
			if (this.state.endReached) {
				this.nextText();
			} else {
				return {
					active: !prevState.active
				}
			}
		});
	}

	render() {
		const {active, position, currentText, endReached} = this.state;
		const {settings, colors} = this.props;

		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = settings.orientation === "vertical" ? "100vh" : "100vw";

		return (
			<div
				id="text-slide"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<Marker
					top={settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<div
					id="slide"
					ref={this.slideRef}
					style={{
						top: position,
						width: `calc(${responsiveWidth} - ${(1.5 * settings.fontSize * 0.69)}px)`,
						fontSize: settings.fontSize,
						left: (settings.fontSize * 0.69),
						transitionProperty: settings.textSpeed < 50 ? "top" : "none"
					}} >
					<p id="text">
						{currentText}
					</p>
				</div>
				<div
					id="control"
					className={active ? "transparent" : "visible"}
					style={{ width: responsiveWidth }}>
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
						mouseDownHandler={this.handleButtonCStartStop}
						icon={endReached ? "next" : active ? "pause" : "play"}
					/>
				</div>
			</div>
		);
	}
}

export default TextSlider;
