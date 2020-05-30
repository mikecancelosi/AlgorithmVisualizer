import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../../css/Pathfinding.css';

export default class PathfindingHeader extends Component {
    render() {
        return (
            <div className="pathingHeader">
                <div id="PathingAlgorithm" className="headerItem">
                    <FormControl className="dropdown">
                        <Select labelId="Algorithm" id="algorithm-select" defaultValue="Dijkstra">
                            <MenuItem value={"Dijkstra"}>Dijkstra's Algorithm</MenuItem>
                            <MenuItem value={"A*"}>A* Search</MenuItem>
                            <MenuItem value={"Swarm"}>Swarm Search</MenuItem>
                            <MenuItem value={"Breadth-first"}>Breadth-first Search</MenuItem>
                            <MenuItem value={"Depth-first"}>Depth-first Search</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div id="MazeGen" className="headerItem">
                    <FormControl className="dropdown">
                        <Select labelId="Maze" id="maze-select" defaultValue="Custom">
                            <MenuItem value={"Custom"}>Custom</MenuItem>
                            <MenuItem value={"Recursive"}>Recursive Division</MenuItem>
                            <MenuItem value={"Random"}>Random</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}
