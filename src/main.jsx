import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import THData from './thdata.jsx';
import {createStore} from 'redux';

const tempInfoStore = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            return action.tempInfo
        case 'INCREASE_TEMP':
            state.HoldTemp += 0.5;
            return state;
        case 'DECREASE_TEMP':
            state.HoldTemp -= 0.5;
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
                    onGetInfo={(tempInfo) => store.dispatch({ type: 'UPDATE_INFO', tempInfo: tempInfo })}
                    onIncreaseTemp={() => store.dispatch({ type: 'INCREASE_TEMP' })}
                    onDecreaseTemp={() => store.dispatch({ type: 'DECREASE_TEMP' })}
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