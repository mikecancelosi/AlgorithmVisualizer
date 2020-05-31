import React, { Component } from 'react';
import Element from './Element';
import uuid from 'react-uuid';

export default class PathfindingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementArr: [],
        }
        this.createArr();
    }

    OnElementClick = (pos) => {
        console.log(pos[0], pos[1]);
    }

    createArr() {
        let windowWidth = window.innerWidth / 2;
        const elementSize = 15;
        let elementCount = Math.floor(windowWidth / elementSize);
        for (let i = 0; i < elementCount; i++) {
            let row = []
            for (let j = 0; j < elementCount; j++) {
                row.push(<Element key={uuid()} position={[i, j]} size={elementSize} onClick={(pos) => this.OnElementClick(pos)} />)
            }
            this.state.elementArr.push(row);
        }
    }

    renderArr() {
        const arr = this.state.elementArr;
        let divs = [];
        for (let index = 0; index < arr.length; index++) {
            divs.push(<div className="row">{arr[index]}</div>);
        }
        return divs;
    }

    render() {
        return (
            <div className="pathingWindow">
                <div className="grid">
                    {this.renderArr()}
                </div>
            </div>
        )
    }
}
