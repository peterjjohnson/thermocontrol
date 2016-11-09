import React, {Component} from 'react';

export default class HoldTemp extends Component {
    render() {
        return (
            <div id="hold-temp" class="">
                {this.props.HoldTemp}ºC
            </div>
        );
    }
}