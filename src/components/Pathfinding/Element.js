import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import '../../css/Pathfinding.css';

export const StatusTypes = {
    DEFAULT: "Empty",
    WALL: "Wall",
    GUESS: "Guess",
    SOLVE: "Solve",
    START: "Start",
    END: "End",
}


export default class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Status: props.status,
            Distance: Int8Array.Infinity
        }
    }

    setDistance = (d) => {
        this.setState(
            { Distance: d }
        )
    }

    onClick() {
        if (this.state.Status === StatusTypes.DEFAULT) {
            this.setState({
                Status: StatusTypes.WALL,
            });

        } else if (this.state.Status === StatusTypes.WALL) {
            this.setState({
                Status: StatusTypes.DEFAULT,
            });
        }
        console.log("onchanging");
        this.props.onChange(this.state.Status);
    }

    onOver(mouseState) {
        if (mouseState.buttons === 1) {
            if (this.state.Status === StatusTypes.DEFAULT) {
                this.setState({
                    Status: StatusTypes.WALL,
                });
                this.props.onChange(this.state.Status);
            }
        }
    }

    onDragOver() {
        if (this.state.Status === StatusTypes.DEFAULT) {
            this.setState({
                Status: StatusTypes.WALL,
            });
            this.props.onChange(this.state.Status);
        }
    }

    render() {
        return (
            <Box id={this.props.position[0] + " " + this.props.position[1]} className="element" onDragOver={() => this.onDragOver()} onMouseEnter={(button) => this.onOver(button)} onClick={() => this.onClick()} status={this.state.Status} key={uuid()} width={this.props.size} height={this.props.size} />
        )
    }
}

Element.propTypes = {
    status: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
    position: PropTypes.array.isRequired,
    distance: PropTypes.number,
}
