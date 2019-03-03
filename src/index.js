import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, long: null, errorMessage: null };

    constructor(props) {
        console.log('constructor');
        super(props);
    }
    renderContent() {
        if (this.state && this.state.errorMessage && !this.state.lat) {
            return (
                <div>
                    Error: {this.state.errorMessage}
                </div>
            )
        }
        else if (this.state && this.state.lat && !this.state.errorMessage)
            return <SeasonDisplay lat={this.state.lat} />;
        else
            return <Spinner text="Waiting for location" />;
    }
    render() {
        console.log('render');
        return (
            <div className="ui">
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        console.log('componentDidMount');

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({ lat: position.coords.latitude });
                this.setState({ long: position.coords.longitude });

            },
            (err) => {
                console.log(err);
                this.setState({ errorMessage: err.message });
            }
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);