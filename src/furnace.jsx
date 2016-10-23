import React, {Component} from 'react';

export default class Furnace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {Furnace} = this.props;
        return (
            <div id="furnace" class="">
                {Furnace}
            </div>
        );
    }
}