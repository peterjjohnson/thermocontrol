import React, {Component} from 'react';

export default class HoldTemp extends Component {
    render() {
        return (
            <div id="hold-temp" class="">
                <div>
                    {this.props.HoldTemp}ºC
                </div>
                <div>
                    <input
                        id = "set-temp"
                        type = "range"
                        value = {this.props.HoldTemp}
                        min = "10"
                        max="30"
                        step="0.5"
                        onChange = { event => { this.props.onSetTemp(event.target.value) } } />
                </div>
            </div>
        );
    }
}