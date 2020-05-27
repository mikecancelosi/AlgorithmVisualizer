import React from 'react';
import './index.css';
import Navigation from "./components/Navigation";
import SortingVisualizer from './components/Sorting/SortingVisualizer';
import Pathfinding from './components/Pathfinding/Pathfinding';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Navigation id="Nav" />
                    <Route exact path="/" component={SortingVisualizer} />
                    <Route path="/paths" component={Pathfinding} />
                </div>
            </Router>
        );
    };
}

