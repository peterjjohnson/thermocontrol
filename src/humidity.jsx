import React, {Component} from 'react';

export default class Humidity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {Humidity} = this.props;
        return (
            <div id="humidity" class="">
                {Humidity}%
            </div>
        );
    }
}