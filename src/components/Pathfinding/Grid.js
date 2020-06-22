import React, { Component } from 'react';
import Element from './Element';
import PropTypes from 'prop-types';
import { Solve } from '../../Dijkstra';
import { Mazes, Algorithms } from './Pathfinding';

export const StatusTypes = {
    DEFAULT: "Empty",
    WALL: "Wall",
    GUESS: "Guess",
    SOLVE: "Solve",
    START: "Start",
    END: "End",
}

const ElementSize = 25;

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMovingStart: false,
            isMovingGoal: false,
            elementCount: 0,
            elementArray: [],
        }
        this.state.elementCount = this.getElementCount();
        this.state.elementArray = this.createElementGrid();
    }

    getElementCount() {
        let gridSize = Math.floor(window.innerWidth, window.innerHeight) / 1.5;
        let elementCount = Math.floor(gridSize / ElementSize);
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
                Solve(this.state.elementCount, startIndex, endIndex);
        }
    }

    createElementGrid() {
        let rows = [];
        const count = this.state.elementCount;
        for (let i = 0; i < count; i++) {
            let row = [];
            for (let j = 0; j < count; j++) {
                let status = "Default";
                if (i === j && j === 0) {
                    status = "Start";
                } else if (i === count - 1 && j === count - 1) {
                    status = "End";
                }
                row.push(<Element position={[j, i]} size={ElementSize} status={status} />)
            }
            rows.push(<div className="row">{row}</div>);
        }
        return rows;
    }


    render() {
        return (
            <div>
                <button onClick={this.SolveForPath()}>Solve</button>
                <div className="grid">
                    {this.state.elementArray}
                </div>
            </div>
        )
    }
}


Grid.propTypes = {
    MazeType: PropTypes.string,
    AlgoType: PropTypes.string,
}
