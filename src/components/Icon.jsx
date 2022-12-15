import React from 'react';
import icons from '../utilities/icons';

class Icon extends React.Component {
    render() {
        const {fontSize, lineHeight} = this.props;

        let padding = fontSize * (lineHeight - 1) / 2;

        return (
            <li className="item-icon" style={{ height: fontSize * lineHeight }}>
                <svg
                    height={fontSize}
                    fill={this.props.stateColor}
                    style={{
                        boxSizing: "content-box",
                        padding: `${padding}px ${2 * padding}px`
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
