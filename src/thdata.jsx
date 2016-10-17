import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default class THData extends Component {

    // Start up
    constructor(props) {
        super(props);
        this.decrementTemp = this.decrementTemp.bind(this);
        this.incrementTemp = this.incrementTemp.bind(this);
        // Create a listener for temp_data events
        socket.on('temp_data', this.props.onGetInfo);
    }

    // Render the component
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

    // Emit incrementTemp event
    incrementTemp() {
        socket.emit('incrementTemp');
        this.props.onIncreaseTemp();
    }

    // Emit decrementTemp event
    decrementTemp() {
        socket.emit('decrementTemp');
        this.props.onDecreaseTemp();
    }
}
