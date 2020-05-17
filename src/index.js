import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


function DrawBox(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {alert("Button val = " + props.value)}
      {props.value}
    </button>
  );
}

//#region "Sorting"
function swap(arr, first_Index, second_Index) {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function BubbleSortStep(arr) {
  var swapped = false;
  var newArray = arr;
  for (var i = 1; i < arr.length - 1; i++) {
    if (arr[i] < newArray[i - 1]) {
      swapped = true;
      var temp = newArray[i];
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
  var increment = (1 / count).toFixed(6);
  var set = [];
  for (var i = 1; i <= count; i++) {
    set.push(i * increment);
  }
  set = shuffle(set);

  return set;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//#endregion


class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nCount: 15,
      sortMethod: "Bubble",
      arr: []
    }
  }

  HandleInputChange = (nCount, sortMethod) => {
    if (nCount) {
      this.setState({
        nCount: nCount,
        arr: GenerateDataSet(this.state.nCount)
      });
    }
    if (sortMethod) {
      const sortValue = sortMethod.target.value;
      this.setState({
        sortMethod: sortValue,
        arr: GenerateDataSet(this.state.nCount)
      });
    }

  }

  render() {
    return (
      <div id="Visualizer">
        <SortingInput onChange={this.HandleInputChange} />
        <SortingWindow arr={this.state.arr} />
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

      while (sorting) {
        var newArray = BubbleSortStep(this.props.arr);
        if (newArray) {
          steps.push(newArray);
        } else {
          sorting = false;
        }
      }
      alert(steps.length);

    } else {
      alert("Array to be sorted is null.");
    }

    return this.RenderSteps(steps);

  }

  RenderSteps = (steps) => {
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
