import React from 'react';
import icons from '../utilities/icons';

class Image extends React.Component {
    render() {
        let padding = this.props.fontSize * (this.props.lineHeight - 1) / 2;

        return (
            <svg
                className="status-image"
                height={2 * this.props.fontSize + "rem"}
                fill={this.props.stateColor}
                style={{
                    padding: `${4 * padding}rem 0`
                }}
                viewBox="0 0 16 16">
                {icons[this.props.icon]}
            </svg>
        );
    }
}

export default Image;
