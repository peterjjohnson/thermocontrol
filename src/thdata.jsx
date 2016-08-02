import React, {Component} from 'react';

export default class THData extends Component {
    render() {
        return (
            <div>
                <h2>Temperature:</h2>
                <div id="temperature"></div>
                <h2>Humidity:</h2>
                <div id="humidity"></div>
            </div>
        );
    }
}