import React from 'react';
import icons from '../utilities/icons';

class ControlButton extends React.Component {
    render() {
        let svgSize = 50 + this.props.fontSize * 0.25;
        
        return (
            <button
                style={{ borderColor: this.props.stateColor }}
                onClick={this.props.clickHandler}
                onMouseDown={this.props.mouseDownHandler}
                onMouseUp={this.props.mouseUpHandler}
            >
                <svg
                    width={(this.props.icon === "selectSettings" || this.props.icon === "selectList") ? svgSize * 2.25 : svgSize}
                    height={svgSize}
                    fill={this.props.stateColor}
                    viewBox={`0 0 ${(this.props.icon === "selectSettings" || this.props.icon === "selectList") ? 36 : 16} 16`}
                >
                    {icons[this.props.icon]}
                </svg>
            </button>
        );
    }
}

export default ControlButton;
