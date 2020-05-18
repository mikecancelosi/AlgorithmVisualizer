import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


function DrawBox(value) {
  return (
    <button className="square">
      {value}
    </button>
  );
}

//#region "Sorting"

function BubbleSortStep(arr) {
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
      <div id="Visualizer">
        <SortingInput onChange={this.HandleInputChange} />
        <SortingWindow arr={GenerateDataSet(this.state.nCount)} />
      </div>
    );
  };
}

function SortingInput(props) {
  return (
    <div className="center">
      <div class="sortInput">
        <div class="nSlider" >
          <Typography id="range-slider" >Items to sort </Typography>
          <Slider
            defaultValue={15}
            min={3}
            max={1000}
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

  RenderSort() {
    let steps = [];

    if (this.props.arr) {
      let sorting = true;
      steps.push(this.props.arr.slice());
      while (sorting) {
        const newArray = BubbleSortStep(this.props.arr);
        if (newArray) {
          steps.push(newArray.slice());
        } else {
          sorting = false;
        }
      }

    } else {
      alert("Array to be sorted is null.");
    }

    return this.RenderSteps(steps);

  }

  RenderSteps(steps) {
    if (steps) {
      let rows = [];
      for (let i = 0; i < steps.length; i++) {
        const element = steps[i];
        rows.push(<Row blockValues={element} />);
      }
      return rows;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="SortingWindow">
        {this.RenderSort()}
      </div>
    )
  }
}

class Row extends React.Component {

  createBlocks = () => {
    let blockArray = [];
    for (let i = 0; i < this.props.blockValues.length; i++) {
      const blockInstance = DrawBox(this.props.blockValues[i]);
      blockArray.push(blockInstance);
    }
    return blockArray;
  }

  render() {
    return (
      <div className="Row">
        {this.createBlocks()}
      </div>
    );
  }
}


class Navigation extends React.Component {
  render() {
    return (
      <div className="container center">
        <div className="menu">
          <div class="menu-left">
            <ul class="menu-list">
              <li class="menu-list-item"><a class="menu-link menu-link--active" href="#">Sorting</a></li>
              <li class="menu-list-item"><a class="menu-link" href="#">Pathfinding</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
}

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <Navigation />
        <Visualizer />
      </div>
    );
  };
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
