import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

export default class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
        }
    }

    onClick() {
        if (this.state.status === "Default") {
            this.setState({
                status: "Wall",
            });

        } else if (this.state.status === "Wall") {
            this.setState({
                status: "Default",
            });
        }
    }

    onOver(mouseState) {
        if (mouseState.buttons === 1) {
            if (this.state.status === "Default") {
                this.setState({
                    status: "Wall",
                });
            }
        }
    }

    onDragOver() {
        if (this.state.status === "Default") {
            this.setState({
                status: "Wall",
            });
        }
    }

    render() {
        return (
            <Box id={this.props.position[0] + " " + this.props.position[1]}
                className="element" onDragOver={() => this.onDragOver()}
                onMouseEnter={(button) => this.onOver(button)}
                onClick={() => this.onClick()}
                status={this.state.status}
                key={uuid()}
                width={this.props.size} height={this.props.size} />
        )
    }
}

Element.propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
}
