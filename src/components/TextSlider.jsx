import React from 'react';
import DOMPurify from 'dompurify';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

class TextSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			timer: () => { },
			position: 0,
			endReached: false,
			keyHold: false,
			keyDownTime: 0
		};

		this.slideRef = React.createRef();
	}

	componentDidMount() {
		this.setState({ position: this.props.settings.fontSize * this.props.settings.lineHeight })

		document.addEventListener("keydown", this.handleKeyPress);
		document.addEventListener("keyup", this.handleKeyHold);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.active !== prevState.active) {
			this.handleActivityChange();
		}

		if (this.state.position !== prevState.position) {
			this.handlePositionChange();
		}

		if (this.props.textIndex !== prevProps.textIndex) {
			this.handeTextIndexChange();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);

		document.removeEventListener("keydown", this.handleKeyPress);
		document.removeEventListener("keyup", this.handleKeyHold);
	}

	handleActivityChange() {
		let currentText = this.props.library.texts[this.props.textIndex].content;

		let noEmptyLinesTextHeight = this.slideRef.current.offsetHeight - this.props.settings.fontSize *
			this.props.settings.lineHeight * this.countEmptyLines(currentText);
			
		let intervalValue = (currentText.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / this.props.settings.textSpeed);

		clearInterval(this.state.timer);

		if (this.state.active) {
			this.setState({
				timer: setInterval(() => this.setState((prevState) => ({ position: prevState.position - 1 })), intervalValue)
			});
		}
	}

	handlePositionChange() {
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

	handeTextIndexChange() {
		this.setState({
			position: this.props.settings.fontSize * this.props.settings.lineHeight,
			endReached: false,
			keyHold: false,
			keyDownTime: 0
		});
	}

	countEmptyLines = (input) => {
		return (input.match(/^[ ]*$/gm) || []).length;
	}

	nextText = () => {
		if (this.props.textIndex < this.props.library.texts.length - 1) {
			this.props.changeTextIndex(this.props.textIndex + 1);
		} else this.props.changeTextIndex(0);
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
		this.setState((prevState) => {
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

	handleButtonASet = () => this.props.changeMode("start");

	handleButtonBList = () => this.props.changeMode("select");

	handleButtonCStartStop = () => {
		if (this.state.endReached) {
			this.nextText();
		} else this.setState(prevState => ({ active: !prevState.active }));
	}

	render() {
		const { active, position, endReached } = this.state;
		const { library, textIndex, settings } = this.props;

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
					<p id="text" dangerouslySetInnerHTML={{
						__html:
							DOMPurify.sanitize(library.texts[textIndex].content ? library.texts[textIndex].content : "Loading...")
					}} />
				</div>
				<div
					id="control"
					className={active ? "transparent" : "visible"}
					style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonASet}
						icon="home"
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
