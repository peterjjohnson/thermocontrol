import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Temp from './temp.jsx';
import Humidity from './humidity.jsx';
import HoldTemp from './holdtemp.jsx';
import Furnace from './furnace.jsx';
import io from 'socket.io-client';
import {createStore} from 'redux';

// Connect to the server so we can send/receive data
const socket = io('http://localhost:3000');

// Handle actions on the store
const tempInfoStore = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            // We've got updated temp info
            return action.tempInfo
        case 'SET_TEMP':
            // Send the new temp to the server
            socket.emit('setTemp', action.temp);
            // Update the current hold temp to reflect what we just submitted
            state.HoldTemp = action.temp;
            return state;
        default:
            return state;
    }
}

const store = createStore(tempInfoStore);

// The Main component
class Main extends Component {
    // Start things off
    constructor(props) {
        super(props);
        // Create a listener for temp_data events from the server
        socket.on('temp_data', tempInfo => store.dispatch({ type: 'UPDATE_INFO', tempInfo: tempInfo }));
    }

    // Render the component and all sub components
    render() {
        const tempInfo = store.getState();
        return (
            <div>
                <Temp
                    Temp = {tempInfo.Temp} />
                <Humidity
                    Humidity = {tempInfo.Humidity} />
                <HoldTemp
                    HoldTemp = {tempInfo.HoldTemp}
                    onSetTemp = {temp => store.dispatch({ type: 'SET_TEMP', temp: temp })} />
                <Furnace
                    Furnace = {tempInfo.Furnace} />
            </div>
        );
    }
}

// Render everything into the specified element in the page
function render() {
    ReactDOM.render(
        <Main />,
        document.getElementById('thermocontrol')
    );
}

render();

// Subscribe our render method to the store so that we can display changes
store.subscribe(render);