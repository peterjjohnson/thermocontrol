import React, {Component} from 'react';
import {render} from 'react-dom';
import THData from './thdata.jsx';

class Main extends Component {
    render() {
        return (
            <div>
                <h1>ThermoControl</h1>
                <THData pollInterval={2000}/>
            </div>
        );
    }
}

render(<Main/>, document.getElementById('thermocontrol'));