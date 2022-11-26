import React from 'react';
import icons from '../utilities/icons';

class ControlButton extends React.Component {
    render() {
        const {fontSize, stateColor, mouseDownHandler, mouseUpHandler, icon} = this.props;
        let svgSize = 50 + fontSize * 0.25;

        return (
            <button
                style={{ borderColor: stateColor }}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
            >
                <svg
                    width={(icon === "selectSettings" || icon === "selectList") ? svgSize * 2.25 : svgSize}
                    height={svgSize}
                    fill={stateColor}
                    viewBox={`0 0 ${(icon === "selectSettings" || icon === "selectList") ? 36 : 16} 16`}
                >
                    {icons[icon]}
                </svg>
            </button>
        );
    }
}

export default ControlButton;
