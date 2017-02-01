import React, {Component} from 'react';

export default class Humidity extends Component {
    render() {
        return (
            <div id="humidity">
                <img src="/graphics/Circle-icons-water.svg" id="humidity-icon" />
                {this.props.Humidity}%
            </div>
        );
    }
}