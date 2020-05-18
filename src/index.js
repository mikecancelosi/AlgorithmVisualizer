import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { palette } from '@material-ui/system';
import Box from '@material-ui/core/Box';

function DrawBox(boxWidth, value) {
  return (
    <Box width={boxWidth} height={boxWidth} style={{ float: "left", backgroundColor: 'rgb(' + value + ',' + value + ',' + value + ')' }} />
  );
}


//#region "Sorting"

function BubbleSortStep(arr) {
  let steps = [];
  steps.push(arr.slice());
  let sorting = true;
  while (sorting) {
    let swapped = false;
    const arrCpy = steps[steps.length - 1];
    let newArray = arrCpy.slice();
    for (let i = 1; i <= newArray.length; i++) {
      if (arrCpy[i] < newArray[i - 1]) {
        swapped = true;
        let temp = newArray[i];
        newArray[i] = newArray[i - 1];
        newArray[i - 1] = temp;
      }
    }
    if (swapped) {
      steps.push(newArray.slice());
    } else {
      sorting = false;
    }
  }

  return steps;
}


function InsertionSortStep(arr) {
  let swapped = false;
  let newArray = arr;
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] < newArray[i - 1]) {
      swapped = true;
      let temp = newArray[i];
      newArray[i] = newArray[i - 1];
      newArray[i - 1] = temp;
    }
  }
  if (swapped) {
    return newArray;
  }
  else {
    return null;
  }
}



function GenerateDataSet(count) {
  let increment = (1 / count).toFixed(6);
  let set = [];
  for (let i = 1; i <= count; i++) {
    set.push(i * increment);
  }
  set = shuffle(set);

  return set;
}

function shuffle(array) {
  let newArray = array;

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
//#endregion


class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nCount: 15,
      sortMethod: "Bubble",
    }
  }

  HandleInputChange = (nCount, sortMethod) => {
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
        <SortingWindow arr={GenerateDataSet(this.state.nCount)} sort={this.state.sortMethod} />
      </div>
    );
  };
}

function SortingInput(props) {
  return (
    <div className="center" id="SortingInput">
      <div class="sortInput">
        <div class="nSlider" >
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
          <FormControl class="dropdown">
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


class SortingWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
  }

  RenderSort() {
    if (!this.state.mounted) {
      document.getElementById("root").style.height = "100%"
    } else {
      let steps = [];

      if (this.props.arr) {

        switch (this.props.sort) {
          case "Bubble":
            steps = BubbleSortStep(this.props.arr);
            break;
          case "Insertion":
            steps = InsertionSortStep(this.props.arr);
            break;
          default:
            return null;
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
      let size = Math.min((clWidth / steps.length), (clHeight / this.props.arr.length));
      for (let i = 0; i < steps.length; i++) {
        const element = steps[i];
        cols.push(<Column size={size} blockValues={element} />);
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

class Column extends React.Component {

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
      <div className="Column">
        {this.createBlocks()}
      </div>
    );
  }
}


class Navigation extends React.Component {
  render() {
    return (
      <div className="menu" id="navigation">
        <div class="menu-left">
          <ul class="menu-list">
            <li class="menu-list-item"><a class="menu-link menu-link--active" href="#">Sorting</a></li>
            <li class="menu-list-item"><a class="menu-link" href="#">Pathfinding</a></li>
          </ul>
        </div>
      </div>
    );
  };
}

class App extends React.Component {

  GetVisualizerSize() {

  }

  render() {
    return (
      <div className="container">
        <Navigation id="Nav" />
        <Visualizer />
      </div>
    );
  };
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
