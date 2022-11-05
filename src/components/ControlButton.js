import React from 'react';
import icons from '../utilities/icons';

class ControlButton extends React.Component {
    render() {
        return (
            <button
                style={{borderColor: this.props.stateColor}} 
                onClick={this.props.clickHandler}>
                <svg
                    width={(this.props.icon === "selectSettings" || this.props.icon === "selectList") ? 70 * 2.25 : 70}
                    height={80}
                    fill={this.props.stateColor}
                    viewBox={`0 0 ${(this.props.icon === "selectSettings" || this.props.icon === "selectList") ? 36 : 16} 16`}
                    dangerouslySetInnerHTML={{__html: icons[this.props.icon]}}>
                </svg>
            </button>
        );
    }
}

export default ControlButton;
