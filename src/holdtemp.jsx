import React, {Component} from 'react';

export default class HoldTemp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {HoldTemp} = this.props;
        return (
            <div id="hold-temp" class="">
                {HoldTemp}ºC
                <input
                    id = "set-temp"
                    type = "range"
                    value = {HoldTemp}
                    min = "10"
                    max="30"
                    step="0.5"
                    onChange = { event => { this.props.onSetTemp(event.target.value) } } />
            </div>
        );
    }
}