import React from 'react';
import './index.css';
import Navigation from "./components/Navigation";


export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navigation id="Nav" />
            </div>
        );
    };
}

