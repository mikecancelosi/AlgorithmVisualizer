import React, { Component } from 'react';
import Element from './Element';
import uuid from 'react-uuid';
import { StatusTypes } from './Element';
import PropTypes from 'prop-types';
import Dijkstra from '../../Dijkstra';

export default class PathfindingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementArray: this.createElementGrid(),
            solving: false,
        }

    }

    Solve() {
        const startIndex = [0, 0];
        const endIndex = [this.state.elementArray[0].length, this.state.elementArray.length];
        Dijkstra.Solve(this.state.elementArray, startIndex, endIndex);


    }

    onElementChange = (newState) => {
        if (newState === StatusTypes.WALL || newState === StatusTypes.DEFAULT) {
            this.Solve();
        }
    }

    createElementGrid() {
        let gridSize = Math.floor(window.innerWidth, window.innerHeight) / 1.5;
        const elementSize = 25;
        let elementCount = Math.floor(gridSize / elementSize);
        let divs = [];
        for (let i = 0; i < elementCount; i++) {
            let row = []
            for (let j = 0; j < elementCount; j++) {
                let status = StatusTypes.DEFAULT;
                if (i === 0 && j === 0) {
                    status = StatusTypes.START;
                } else if (i === elementCount - 1 && j === elementCount - 1) {
                    status = StatusTypes.END;
                }

                row.push(<Element key={uuid()} status={status} size={elementSize} position={[i, j]} onChange={() => this.onElementChange} />)
            }
            divs.push(<div key={uuid()} className="row">{row}</div>)

        }
        return divs;
    }
    render() {
        return (
            <div className="pathingWindow">
                <div className="grid">
                    {this.state.elementArray}
                </div>
            </div>
        )
    }
}


Element.propTypes = {
    MazeType: PropTypes.string,
    AlgoType: PropTypes.string,
}
