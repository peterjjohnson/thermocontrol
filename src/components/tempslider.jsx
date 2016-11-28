import React, {Component} from 'react';

export default class TempSlider extends Component {
    render() {
        return (
            <div id="temp-slider">
                <input
                    id = "set-temp"
                    type = "range"
                    value = {this.props.HoldTemp}
                    min = "15"
                    max="25"
                    step="0.5"
                    onInput = { event => { this.props.onSetTemp(event.target.value) } } />
            </div>
        );
    }
}