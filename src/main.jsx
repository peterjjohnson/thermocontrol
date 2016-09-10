import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import THData from './thdata.jsx';
import {createStore} from 'redux';

const tempInfoStore = (state = {Temp: 'Initializing', Humidity: 'Initializing'}, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            return action.tempInfo
            break;
        default:
            return state;
    }
}

let store = createStore(tempInfoStore);

class Main extends Component {
    render() {
        return (
            <div>
                <h1>ThermoControl</h1>
                <THData tempInfo={store.getState()} store={store} pollInterval={2000}/>
            </div>
        );
    }
}

function render() {
    ReactDOM.render(
        <Main/>,
        document.getElementById('thermocontrol')
    );
}

render();
store.subscribe(render);