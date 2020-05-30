import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import '../../css/Pathfinding.css';

export default class Element extends Component {
    render() {
        return (
            <Box className="element" key={uuid()} width={this.props.size} height={this.props.size} />
        )
    }
}

Element.propTypes = {
    position: PropTypes.array,
    size: PropTypes.number,
    onClick: PropTypes.func
}
