import React, {Component} from 'react';

export default class Temp extends Component {
    render() {
        return (
            <div id="temperature" class="">
                {this.props.Temp}ºC
            </div>
        );
    }
}