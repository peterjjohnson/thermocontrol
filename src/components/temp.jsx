import React, {Component} from 'react';

export default class Temp extends Component {
    render() {
        return (
            <div id="temperature">
                {this.props.Temp}ºC
            </div>
        );
    }
}