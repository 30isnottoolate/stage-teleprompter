import React from 'react';
import DOMPurify from 'dompurify';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

class Reader extends React.Component {
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
		this.setState({ position: 0.25 * this.props.settings.fontSize * this.props.settings.lineHeight });
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
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

		document.removeEventListener("keydown", this.handleKeyDown);
		document.removeEventListener("keyup", this.handleKeyUp);
	}

	handleActivityChange = () => {
		let currentText = this.props.library.texts[this.props.textIndex].content;

		let noEmptyLinesTextHeight = this.slideRef.current.offsetHeight - this.props.settings.fontSize *
			this.props.settings.lineHeight * this.countEmptyLines(currentText);

		let intervalValue = (currentText.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) *
			(100 / this.props.settings.textSpeed);

		clearInterval(this.state.timer);

		if (this.state.active) {
			this.setState({
				timer: setInterval(() => this.setState((prevState) => ({ position: prevState.position - 1 })), intervalValue)
			});
		}
	}

	handlePositionChange = () => {
		this.setState((prevState) => {
			if (prevState.position < 2.75 * this.props.settings.fontSize * this.props.settings.lineHeight -
				this.slideRef.current.offsetHeight) {
				return {
					active: false,
					endReached: true
				}
			}
		});
	}

	handeTextIndexChange = () => {
		this.setState({
			position: 0.25 * this.props.settings.fontSize * this.props.settings.lineHeight,
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

	handleKeyDown = (event) => {
		this.setState((prevState) => {
			if (!prevState.keyHold) {
				if (event.key.toLowerCase() === "a" || event.key.toLowerCase() === "b") {
					return {
						keyHold: true,
						keyDownTime: (new Date()).getTime()
					}
				} else if (event.key.toLowerCase() === "c" && !event.repeat) {
					if (!this.state.endReached) {
						return {
							active: !prevState.active
						}
					} else {
						return {
							keyHold: true,
							keyDownTime: (new Date()).getTime()
						}
					}
				}
			}
		});
	}

	handleKeyUp = (event) => {
		this.setState((prevState) => {
			let holdButtonCondition = ((new Date()).getTime() - prevState.keyDownTime) > this.props.settings.holdButtonTime;
			let holdButtonReset = { keyHold: false, keyDownTime: 0 };

			if (prevState.keyHold) {
				if (event.key.toLowerCase() === "a") {
					if (holdButtonCondition) {
						this.handleButtonASet();
					} else {
						return holdButtonReset;
					}
				} else if (event.key.toLowerCase() === "b") {
					if (holdButtonCondition) {
						this.handleButtonBList();
					}
					else {
						return holdButtonReset;
					}
				} else if (event.key.toLowerCase() === "c") {
					if (holdButtonCondition) {
						this.nextText();
					} else {
						return holdButtonReset;
					}
				}
			}
		});
	}

	handleButtonASet = () => this.props.changeMode("home");

	handleButtonBList = () => this.props.changeMode("list");

	handleButtonCStartStop = () => {
		if (this.state.endReached) {
			this.nextText();
		} else this.setState(prevState => ({ active: !prevState.active }));
	}

	displayText = () => {
		if (this.props.library.texts[this.props.textIndex]) {
			let currentText = this.props.library.texts[this.props.textIndex];
			return '<div class="title" style="padding-bottom: ' +
				0.5 * this.props.settings.fontSize * this.props.settings.lineHeight + 'px;">' +
				currentText.title + '</div>' +
				currentText.content.replace(/{r{/g, "<span class='red-mark'>").replace(/}r}/g, "</span>")
					.replace(/{g{/g, "<span class='green-mark'>").replace(/}g}/g, "</span>")
					.replace(/{b{/g, "<span class='blue-mark'>").replace(/}b}/g, "</span>");
		} else return "Loading...";
	}

	render() {
		const { active, position, endReached } = this.state;
		const { settings } = this.props;

		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = settings.orientation === "vertical" ? "100vh" : "100vw";

		return (
			<div
				id="reader"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<Marker
					top={1.75 * settings.fontSize * settings.lineHeight}
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
							DOMPurify.sanitize(this.displayText())
					}} />
				</div>
				<div
					id="control"
					className={active ? "transparent" : "visible"}
					style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonASet}
						icon="home"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonBList}
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

export default Reader;
