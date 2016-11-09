import React, {Component} from 'react';

export default class TempSlider extends Component {
    render() {
        return (
            <div id="temp-slider">
                <input
                    id = "set-temp"
                    type = "range"
                    value = {this.props.HoldTemp}
                    min = "10"
                    max="30"
                    step="0.5"
                    onChange = { event => { this.props.onSetTemp(event.target.value) } } />
            </div>
        );
    }
}