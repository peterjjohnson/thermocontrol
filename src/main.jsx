import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import THData from './thdata.jsx';
import {createStore} from 'redux';

let modifiedTemp = false;

const tempInfoStore = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            if (action.tempInfo.HoldTemp != state.HoldTemp && modifiedTemp) {
                action.tempInfo.HoldTemp = state.HoldTemp;
            } else if (action.tempInfo.HoldTemp == state.HoldTemp && modifiedTemp) {
                modifiedTemp = false;
            }
            return action.tempInfo
        case 'INCREASE_TEMP':
            state.HoldTemp = action.tempInfo.HoldTemp;
            modifiedTemp = true;
            return state;
        case 'DECREASE_TEMP':
            state.HoldTemp = action.tempInfo.HoldTemp;
            modifiedTemp = true;
            return state;
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
                <THData
                    tempInfo={store.getState()}
                    onGetInfo={(tempInfo) => store.dispatch({ type: 'UPDATE_INFO', tempInfo: tempInfo })}
                    onIncreaseTemp={(tempInfo) => store.dispatch({ type: 'INCREASE_TEMP', tempInfo: tempInfo })}
                    onDecreaseTemp={(tempInfo) => store.dispatch({ type: 'DECREASE_TEMP', tempINfo: tempInfo })}
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