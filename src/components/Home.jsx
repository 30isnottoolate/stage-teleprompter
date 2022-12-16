import React from 'react';
import colors from '../utilities/colors';
import Image from './Image';
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
		const { settings, libraryStatus } = this.props;

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
					className="title"
					style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight }} >
					KV Stage Teleprompter
				</p>
				<div className="content">
					{libraryStatus === "checking" &&
						<Image
							icon="checking"
							fontSize={settings.fontSize}
							lineHeight={settings.lineHeight}
							stateColor={stateColor}
						/>}
					{libraryStatus === "valid" &&
						<Image
							icon="valid"
							fontSize={settings.fontSize}
							lineHeight={settings.lineHeight}
							stateColor={stateColor}
						/>}
					{libraryStatus === "invalid" &&
						<Image
							icon="invalid"
							fontSize={settings.fontSize}
							lineHeight={settings.lineHeight}
							stateColor={stateColor}
						/>}
					{libraryStatus === "missing" &&
						<Image
							icon="missing"
							fontSize={settings.fontSize}
							lineHeight={settings.lineHeight}
							stateColor={stateColor}
						/>}
					<p style={{ fontSize: settings.fontSize * 0.75 }}>{libraryStatus === "checking" ? "CHECKING LIBRARY..." :
						libraryStatus === "missing" ? "LIBRARY MISSING" :
							libraryStatus === "invalid" ? "LIBRARY INVALID" :
								"LIBRARY READY"
					}</p>
				</div>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonASet}
						icon="settings"
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonBList}
						icon={this.props.libraryStatus === "valid" ? "list" : "refresh"}
					/>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseUpHandler={this.handleButtonCInfo}
						icon="info"
					/>
				</div>
			</div>
		);
	}
}

export default Home;
