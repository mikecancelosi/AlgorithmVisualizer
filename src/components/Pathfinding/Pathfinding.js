import React, { Component } from 'react'
import Header from './PathfindingHeader';
import PathfindingWindow from './PathfindingWindow';


export default class Pathfinding extends Component {
    render() {
        return (
            <div>
                <Header />
                <PathfindingWindow />
            </div>
        )
    }
}
