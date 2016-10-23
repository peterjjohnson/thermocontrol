import React, {Component} from 'react';

export default class Temp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {Temp} = this.props;
        return (
            <div id="temperature" class="">
                {Temp}ºC
            </div>
        );
    }
}