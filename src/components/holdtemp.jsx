import React, {Component} from 'react';

export default class HoldTemp extends Component {
    render() {
        const furnaceState = this.props.Furnace == 'ON' ? (<img src="/graphics/Circle-icons-flame.svg" id="furnace-icon" />) : (<span>&nbsp;</span>);
        return (
            <div id="hold-temp">
                <div id="furnace">
                    {furnaceState}
                </div>
                {this.props.HoldTemp}&#8451;
            </div>
        );
    }
}
