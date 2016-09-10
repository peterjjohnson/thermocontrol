import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

export default class THData extends Component {

    constructor(props) {
        super(props);
        this.fetchTempInfo = this.fetchTempInfo.bind(this);
    }

    render() {
        const {tempInfo} = this.props;
        return (
            <div>
                <h2>Temperature:</h2>
                <div id="temperature">{tempInfo.Temp}ºC</div>
                <h2>Humidity:</h2>
                <div id="humidity">{tempInfo.Humidity}%</div>
            </div>
        );
    }

    fetchTempInfo() {
        $.ajax({
            url: '/getinfo',
            dataType: 'json',
            success: (tempInfo) => {
                this.props.store.dispatch({type: 'UPDATE_INFO', tempInfo: tempInfo});
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
