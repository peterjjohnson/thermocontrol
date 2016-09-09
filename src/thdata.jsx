import React, {Component} from 'react';
import $ from 'jquery';

export default class THData extends Component {

    constructor(props) {
        super(props);
        this.state = {Temp: 'loading...', Humidity: 'loading...'};
        THData.context = this;
    }

    render() {
        return (
            <div>
                <h2>Temperature:</h2>
                <div id="temperature">{THData.context.state.Temp}ºC</div>
                <h2>Humidity:</h2>
                <div id="humidity">{THData.context.state.Humidity}%</div>
            </div>
        );
    }

    fetchTempInfo() {
        $.ajax({
            url: '/getinfo',
            dataType: 'json',
            success: (tempInfo) => {
                THData.context.setState(tempInfo);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    componentDidMount() {
        this.fetchTempInfo();
        setInterval(this.fetchTempInfo, this.props.pollInterval);
    }
}