import React from 'react';
import colors from '../utilities/colors';
import ControlButton from './ControlButton';

class Home extends React.Component {

	componentDidMount() {
		document.addEventListener("keyup", this.handleKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keyup", this.handleKeyUp);
	}

	handleKeyUp = (event) => {
		if (event.key === "a") {
			this.handleButtonASet();
		} else if (event.key === "b") {
			this.handleButtonBList();
		} else if (event.key === "c") {
			this.handleButtonCInfo();
		}
	}

	handleButtonASet = () => this.props.changeMode("set");

	handleButtonBList = () => {
		if (this.props.libraryStatus === "valid") {
			this.props.changeMode("list");
		} else this.props.fetchLibrary();
	}

	handleButtonCInfo = () => this.props.changeMode("info");

	render() {
		const { settings } = this.props;

		let stateColor = colors[settings.colorIndex].code;
		let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

		return (
			<div
				id="home"
				className={settings.orientation === "vertical" ? "rotate-cw" : ""}
				style={{
					fontSize: settings.fontSize,
					color: stateColor,
					lineHeight: settings.lineHeight
				}}>
				<p
					id="head-line">
					KV Stage Teleprompter
				</p>
				<p
					id="sub-line"
					style={{
						position: "absolute",
						left: (settings.fontSize * 0.69)
					}}>
				</p>
				<div id="control" style={{ width: responsiveWidth }}>
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
						icon={this.props.libraryStatus === "valid" ? "list" : "refresh"}
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={this.handleButtonCInfo}
						icon="info"
					/>
				</div>
			</div>
		);
	}
}

export default Home;
