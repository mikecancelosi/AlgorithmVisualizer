import React, { Component } from 'react';
import Element from './Element';
import uuid from 'react-uuid';
import { StatusTypes } from './Element';
import PropTypes from 'prop-types';

export default class PathfindingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementArray: this.createElementGrid(),
            solving: false,
        }

    }

    Solve() {

    }

    onElementChange = (newState) => {
        if (newState === StatusTypes.WALL || newState === StatusTypes.DEFAULT) {
            this.Solve();
        }
    }

    createElementGrid() {
        let windowWidth = window.innerWidth / 2;
        const elementSize = 15;
        let elementCount = Math.floor(windowWidth / elementSize);
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

                row.push(<Element key={uuid()} status={status} size={elementSize} onChange={() => this.onElementChange} />)
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
