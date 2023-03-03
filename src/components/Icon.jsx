import React from 'react';
import icons from '../utilities/icons';

class Icon extends React.Component {
    render() {
        const {fontSize, lineHeight} = this.props;

        let padding = fontSize * (lineHeight - 1) / 2;

        return (
            <li className="item-icon" style={{ height: fontSize * lineHeight + "rem" }}>
                <svg
                    height={fontSize + "rem"}
                    fill={this.props.stateColor}
                    style={{
                        boxSizing: "content-box",
                        padding: `${padding}ren ${2 * padding}rem`
                    }}
                    viewBox="0 0 16 16">
                    {icons[this.props.icon]}
                </svg>
                <p> - {this.props.text}</p>
            </li>
        );
    }
}

export default Icon;
