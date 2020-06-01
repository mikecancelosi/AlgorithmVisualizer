import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import '../../css/Pathfinding.css';

export const StatusTypes = {
    DEFAULT: 1,
    WALL: 2,
    START: 3,
    END: 4
}


export default class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Status: props.status,
        }
    }

    onClick() {
        if (this.state.Status === StatusTypes.DEFAULT) {
            this.setState({
                Status: StatusTypes.WALL,
            });
            this.props.onChange();
        } else if (this.state.Status === StatusTypes.WALL) {
            this.setState({
                Status: StatusTypes.DEFAULT,
            });
            this.props.onChange();
        }
    }

    onOver(mouseState) {
        if (mouseState.buttons === 1) {
            if (this.state.Status === StatusTypes.DEFAULT) {
                this.setState({
                    Status: StatusTypes.WALL,
                });
                this.props.onChange();
            }
        }
    }

    onDragOver() {
        if (this.state.Status === StatusTypes.DEFAULT) {
            this.setState({
                Status: StatusTypes.WALL,
            });
            this.props.onChange();
        }
    }

    render() {
        return (
            <Box className="element" onDragOver={() => this.onDragOver()} onMouseEnter={(button) => this.onOver(button)} onClick={() => this.onClick()} status={this.state.Status} key={uuid()} width={this.props.size} height={this.props.size} />
        )
    }
}

Element.propTypes = {
    status: PropTypes.number,
    size: PropTypes.number,
    onChange: PropTypes.func,
}
