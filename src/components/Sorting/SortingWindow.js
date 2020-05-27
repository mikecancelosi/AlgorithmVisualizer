import React, { Component } from 'react'
import Step from './Step';
import Sorting from '../../Sorting';
import PropTypes from 'prop-types';

export class SortingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
    }

    RenderSort() {
        const { arr, sort } = this.props;
        if (!this.state.mounted) {
            document.getElementById("root").style.height = "100%"
        } else {
            let steps = [];

            if (arr) {
                steps.push(arr.slice());

                switch (sort) {
                    case "Bubble":
                        Sorting.BubbleSortStep(arr, steps);
                        break;
                    case "Insertion":
                        Sorting.InsertionSortStep(arr, steps);
                        break;
                    case "Merge":
                        Sorting.MergeSortStep(arr, arr.length, steps);
                        break;
                    case "Quick":
                        Sorting.QuickSortStep(arr, 0, arr.length - 1, steps);
                        break;
                    default:
                        Sorting.SelectionSortStep(arr, steps);
                        break;
                }
            }
            else {
                alert("Array to be sorted is null.");
            }

            return this.RenderSteps(steps);
        }

    }

    componentDidMount() {
        this.setState({
            mounted: true
        })
    }

    RenderSteps(steps) {
        if (steps && document.getElementById('SortWindow')) {
            let cols = [];
            let clHeight = window.innerHeight - document.getElementById('navigation').clientHeight - document.getElementById('SortingInput').clientHeight - 30;
            let clWidth = document.getElementById('Visualizer').clientWidth;
            let size = Math.min((clHeight / steps.length), (clWidth / this.props.arr.length));
            for (let i = 0; i < steps.length; i++) {
                const element = steps[i];
                cols.push(<Step key={i} size={size} blockValues={element} />);
            }

            return cols;
        } else {
            return null;
        }

    }

    render() {
        return (
            <div id="SortWindow" className="SortingWindow center">
                {this.RenderSort()}
            </div>
        )
    }
}

SortingWindow.propTypes = {
    arr: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired
}

export default SortingWindow
