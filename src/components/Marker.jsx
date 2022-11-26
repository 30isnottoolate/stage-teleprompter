import React from "react";

class Marker extends React.Component {
    render() {
        const {top, left, fontSize, lineHeight, stateColor} = this.props;

        return (
            <svg
                className="text-marker"
                height={fontSize}
                fill={stateColor}
                style={{boxSizing: "content-box", top: top, left: left, padding: `${fontSize * (lineHeight - 1) / 2} 0`}}
                viewBox="0 0 57 150">
                <path d="M 7.00,45.00 C 7.00,45.00 7.00,111.00 7.00,111.00 7.00,111.00 49.00,78.00 49.00,78.00 49.00,78.00 7.00,45.00 7.00,45.00 Z"/>
            </svg>
        );
    }
}

export default Marker;
