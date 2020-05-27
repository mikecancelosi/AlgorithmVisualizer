import React from 'react';
import './index.css';
import Navigation from "./components/Navigation";
import SortingVisualizer from './components/Sorting/SortingVisualizer';


export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navigation id="Nav" />
                <SortingVisualizer />
            </div>
        );
    };
}

