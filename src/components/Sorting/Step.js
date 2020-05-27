import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';



function DrawBox(boxWidth, value) {
    return (
        <Box key={value} width={boxWidth} height={boxWidth} style={{ backgroundColor: 'rgb(' + value + ',' + value + ',' + value + ')' }} />
    );
}

export class Step extends Component {

    createBlocks = () => {
        let blockArray = [];
        for (let i = 0; i < this.props.blockValues.length; i++) {
            let convValue = this.props.blockValues[i] * 255;
            const blockInstance = DrawBox(this.props.size, convValue);
            blockArray.push(blockInstance);
        }
        return blockArray;
    }

    render() {
        return (
            <div className="Step">
                {this.createBlocks()}
            </div>
        );
    }
}

Step.propTypes = {
    blockValues: PropTypes.array.isRequired
}

export default Step
