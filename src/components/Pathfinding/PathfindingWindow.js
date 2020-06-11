import React, { Component } from 'react';
import Element from './Element';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { Solve } from '../../Dijkstra';
import { Mazes, Algorithms } from './Pathfinding';
import Box from '@material-ui/core/Box';

export const StatusTypes = {
    DEFAULT: "Empty",
    WALL: "Wall",
    GUESS: "Guess",
    SOLVE: "Solve",
    START: "Start",
    END: "End",
}


export default class PathfindingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMovingStart: false,
            isMovingGoal: false,
            elementCount: getElementCount(),
            elementArray: this.createElementGrid(),
        }
    }

    getElementCount() {
        let gridSize = Math.floor(window.innerWidth, window.innerHeight) / 1.5;
        const elementSize = 25;
        let elementCount = Math.floor(gridSize / elementSize);
        return elementCount;
    }


    SolveForPath() {
        const startIndex = [0, 0];
        const endIndex = [this.state.elementArray[0].length, this.state.elementArray.length];
        switch (this.props.AlgoType) {
            case Algorithms.A:
                break;
            case Algorithms.SWARM:
                break;
            case Algorithms.BREADTH:
                break;
            case Algorithms.DEPTH:
                break;
            default:
                Solve(this.state.elementArray, startIndex, endIndex);
        }
    }

    render() {
        return (
            <div className="grid">

            </div>
        )
    }
}


PathfindingWindow.propTypes = {
    MazeType: PropTypes.string,
    AlgoType: PropTypes.string,
}
