import React from "react";

class Marker extends React.Component {
    render() {
        return (
            <svg
                className="text-marker"
                height={this.props.fontSize}
                fill={this.props.stateColor}
                style={{boxSizing: "content-box", top: this.props.top, left: this.props.left, padding: `${this.props.fontSize * (this.props.lineHeight - 1) / 2} 0`}}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z"/>
            </svg>
        );
    }
}

export default Marker;
