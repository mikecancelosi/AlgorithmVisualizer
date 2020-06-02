import React, { Component } from 'react'
import Header from './PathfindingHeader';
import PathfindingWindow from './PathfindingWindow';


export const Algorithms = {
    DIJKSTRA: "Dijkstra's Algorithm",
    A: "A* Search",
    SWARM: "Swarm Search",
    BREADTH: "Breadth-first Search",
    DEPTH: "Depth-first Search"
}
export const Mazes = {
    CUSTOM: "Custom",
    RECURSIVE: "Recursive Division",
    RANDOM: "Random",
}

export default class Pathfinding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Algorithm: Algorithms.DIJKSTRA,
            Maze: Mazes.CUSTOM
        }
    }

    onAlgoChange = (e, value) => {
        this.setState({
            Algorithm: value
        })
    }

    onMazeChange = (e, value) => {
        this.setState({
            Maze: value
        })
    }

    render() {
        return (
            <div>
                <Header
                    onAlgoChange={(e, value) => this.onAlgoChange(e, value)}
                    onMazeChange={(e, value) => this.onMazeChange(e, value)} />

                <PathfindingWindow MazeType={this.state.Maze} AlgoType={this.state.Algorithm} />
            </div>
        )
    }
}
