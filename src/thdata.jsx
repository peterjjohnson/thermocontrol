import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default class THData extends Component {

    constructor(props) {
        super(props);
        this.incrementTemp = this.incrementTemp.bind(this);
        this.decrementTemp = this.decrementTemp.bind(this);
        socket.on('temp_data', this.props.onGetInfo);
    }

    render() {
        const {tempInfo} = this.props;
        return (
            <div>
                <h2>Temperature:</h2>
                <div id="temperature">{tempInfo.Temp}ºC</div>
                <h2>Humidity:</h2>
                <div id="humidity">{tempInfo.Humidity}%</div>
                <h2>Hold Temperature:</h2>
                <div id="hold-temp">{tempInfo.HoldTemp}ºC</div>
                <button onClick={this.incrementTemp}>+</button>
                <button onClick={this.decrementTemp}>-</button>
                <h2>Furnace State:</h2>
                <div id="furnace-state">{tempInfo.Furnace}</div>
            </div>
        );
    }

    incrementTemp() {
        socket.emit('incrementTemp');
    }

    decrementTemp() {
        socket.emit('decrementTemp');
    }
}
