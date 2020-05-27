import React from 'react';
import '../../index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import SortingWindow from "./SortingWindow";
import Sorting from "../../Sorting";

function SortingInput(props) {
    return (
        <div className="center" id="SortingInput">
            <div className="sortInput">
                <div className="nSlider" >
                    <Typography id="range-slider" >Items to sort </Typography>
                    <Slider
                        defaultValue={15}
                        min={3}
                        max={100}
                        valueLabelDisplay="auto"
                        step={1}
                        onChangeCommitted={(e, value) => props.onChange(value, null)}
                    />
                </div>
                <div id="SortAlgorithm">
                    <FormControl className="dropdown">
                        <Select labelId="Algorithm" id="algorithm-select" defaultValue="Bubble" onChange={(e, value) => props.onChange(null, e)}>
                            <MenuItem value={"Bubble"}>Bubble Sort</MenuItem>
                            <MenuItem value={"Insertion"}>Insertion Sort</MenuItem>
                            <MenuItem value={"Merge"}>Merge Sort</MenuItem>
                            <MenuItem value={"Quick"}>Quick Sort</MenuItem>
                            <MenuItem value={"Selection"}>Selection Sort</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nCount: 15,
            sortMethod: "Bubble",
        }
    }

    HandleInputChange = (nCount, sortMethod) => {
        console.clear();
        if (nCount) {
            this.setState({
                nCount: nCount,
            });
        }
        if (sortMethod) {
            const sortValue = sortMethod.target.value;
            this.setState({
                sortMethod: sortValue,
            });
        }
    }

    render() {
        return (
            <div id="Visualizer" className="Visualizer">
                <SortingInput onChange={this.HandleInputChange} />
                <SortingWindow arr={Sorting.GenerateDataSet(this.state.nCount)} sort={this.state.sortMethod} />
            </div>
        );
    };
}