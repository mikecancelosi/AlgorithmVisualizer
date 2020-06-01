import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../../css/Pathfinding.css';

import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { Algorithms, Mazes } from './Pathfinding';



export default class PathfindingHeader extends Component {

    renderAlgorithms() {
        let itemList = [];
        for (let item in Algorithms) {
            itemList.push(<MenuItem key={uuid()} value={item}>{Algorithms[item]}</MenuItem>);
        }
        return itemList;
    }

    renderMazes() {
        let itemList = [];
        for (let item in Mazes) {
            itemList.push(<MenuItem key={uuid()} value={item}>{Mazes[item]}</MenuItem>);
        }
        return itemList;
    }

    render() {
        return (
            <div className="pathingHeader">
                <div id="PathingAlgorithm" className="headerItem">
                    <FormControl className="dropdown">
                        <Select labelId="Algorithm" id="algorithm-select" defaultValue={Object.entries(Algorithms)[0][0]} onChange={(e, value) => this.props.onAlgoChange(null, e)}>
                            {this.renderAlgorithms()}
                        </Select>
                    </FormControl>
                </div>
                <div id="MazeGen" className="headerItem">
                    <FormControl className="dropdown">
                        <Select labelId="Maze" id="maze-select" defaultValue={Object.entries(Mazes)[0][0]} onChange={(e, value) => this.props.onMazeChange(null, e)} >
                            {this.renderMazes()}
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}

Element.propTypes = {
    onMazeChange: PropTypes.func,
    onAlgoChange: PropTypes.func,
}
