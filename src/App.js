import React from 'react';
import './css/index.css';
import SortingVisualizer from './components/Sorting/SortingVisualizer';


export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <SortingVisualizer />
            </div>
        );
    };
}

