import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import THData from './thdata.jsx';
import {createStore} from 'redux';

const tempInfoStore = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            return action.tempInfo
        case 'SET_TEMP':
            state.HoldTemp = action.temp;
            return state;
        default:
            return state;
    }
}

const store = createStore(tempInfoStore);

class Main extends Component {
    render() {
        return (
            <div>
                <h1>ThermoControl</h1>
                <THData
                    tempInfo={store.getState()}
                    onGetInfo={tempInfo => store.dispatch({ type: 'UPDATE_INFO', tempInfo: tempInfo })}
                    onSetTemp={temp => store.dispatch({ type: 'SET_TEMP', temp: temp })}
                />
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