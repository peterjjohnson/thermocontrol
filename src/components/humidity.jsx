import React, {Component} from 'react';

export default class Humidity extends Component {
    render() {
        return (
            <div id="humidity" class="">
                {this.props.Humidity}%
            </div>
        );
    }
}