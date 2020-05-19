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
    <Box key={value} width={boxWidth} height={boxWidth} style={{ backgroundColor: 'rgb(' + value + ',' + value + ',' + value + ')' }} />
  );
}


//#region "Sorting"

function BubbleSortStep(arr, steps) {
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


function InsertionSortStep(arr, steps) {
  for (let i = 1; i < arr.length; i++) {
    let newArray = steps[steps.length - 1].slice();
    let currentvalue = newArray[i]
    let position = i

    while (position > 0 && newArray[position - 1] > currentvalue) {
      newArray[position] = newArray[position - 1]
      position = position - 1
    }

    newArray[position] = currentvalue
    steps.push(newArray.slice());
  }

  return steps;
}

function MergeSortStep(arr, len, steps, stepIndex) {
  let stepindexInc = stepIndex + 1;
  if (arr.length <= 1) {
    if (steps.length > stepindexInc) {
      steps[stepindexInc].push(arr[0]);
    } else {
      steps.push(arr.slice());
    }
    return arr;
  }
  else {
    let arrayRef = arr.slice();

    let mid = Math.floor(arrayRef.length / 2);
    let leftArray = arrayRef.slice(0, mid);
    let rightArray = arrayRef.slice(mid);

    let left = MergeSortStep(leftArray, len, steps, stepindexInc);
    let right = MergeSortStep(rightArray, len, steps, stepindexInc);
    let mergeArray = merge(left, right);

    if (steps.length > stepindexInc) {
      for (let i = 0; i < mergeArray.length; i++) {
        steps[stepindexInc].push(mergeArray[i]);
      }
    } else {
      steps.push(mergeArray.slice());
    }

    return mergeArray;
  }

}

function merge(arr1, arr2) {
  let sorted = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sorted.push(arr1.shift());
    } else {
      sorted.push(arr2.shift());
    }
  };
  let output = sorted.concat(arr1.slice().concat(arr2.slice()));

  return output;
}


function QuickSortStep(arr) {
  let steps = [];

  for (let i = 1; i < arr.length; i++) {
    let newArray = steps[steps.length - 1].slice();
    let currentvalue = newArray[i]
    let position = i

    while (position > 0 && newArray[position - 1] > currentvalue) {
      newArray[position] = newArray[position - 1]
      position = position - 1
    }

    newArray[position] = currentvalue
    steps.push(newArray.slice());
  }

  return steps;
}

function SelectionSortStep(arr) {
  let steps = [];

  for (let i = 1; i < arr.length; i++) {
    let newArray = steps[steps.length - 1].slice();
    let currentvalue = newArray[i]
    let position = i

    while (position > 0 && newArray[position - 1] > currentvalue) {
      newArray[position] = newArray[position - 1]
      position = position - 1
    }

    newArray[position] = currentvalue
    steps.push(newArray.slice());
  }

  return steps;
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
        steps.push(this.props.arr.slice());

        switch (this.props.sort) {
          case "Bubble":
            steps = BubbleSortStep(this.props.arr, steps);
            break;
          case "Insertion":
            steps = InsertionSortStep(this.props.arr, steps);
            break;
          case "Merge":
            MergeSortStep(this.props.arr, this.props.arr.length, steps, 0);
            break;
          case "Quick":
            steps = QuickSortStep(this.props.arr);
            break;
          default:
            steps = SelectionSortStep(this.props.arr);
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

class Step extends React.Component {

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


class Navigation extends React.Component {
  render() {
    return (
      <div className="menu" id="navigation">
        <div className="menu-left">
          <ul className="menu-list">
            <li className="menu-list-item"><a className="menu-link menu-link--active" href="#">Sorting</a></li>
            <li className="menu-list-item"><a className="menu-link" href="#">Pathfinding</a></li>
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
