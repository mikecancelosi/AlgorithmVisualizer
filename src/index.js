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
import { indigo } from '@material-ui/core/colors';

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

//#region MergeSort
function MergeSortStep(arr, len, steps) {
  if (arr.length <= 1) {
    return arr;
  }
  else {
    let arrayRef = arr.slice();

    let mid = Math.floor(arrayRef.length / 2);
    let leftArray = arrayRef.slice(0, mid);
    let rightArray = arrayRef.slice(mid);

    let left = MergeSortStep(leftArray.slice(), len, steps).slice();
    let right = MergeSortStep(rightArray.slice(), len, steps).slice();

    // Account for singles
    if (left.length == 1 && right.length != 1) {
      if (steps.length > 1) {
        steps[1].push(left[0]);
      } else {
        steps.push(left.slice());
      }
    }

    //Account for steps that need to be added in twice.
    let leftStep = stepsAway(left);
    let rightStep = stepsAway(right);
    if (leftStep < rightStep) {
      if (steps.length > rightStep) {
        for (let i = 0; i < left.length; i++) {
          steps[rightStep].push(left[i]);
        }
      } else {
        steps.push(left.slice());
      }
    }

    let mergeArray = merge(left.slice(), right.slice(), steps);


    return mergeArray;
  }

}

function stepsAway(arr) {
  const length = arr.length;
  let stepIndex = 0;
  let exponent = 0;
  while (stepIndex == 0) {
    exponent = exponent + 1;
    if (Math.pow(2, exponent) >= length) {
      stepIndex = exponent;
    }
  }
  return stepIndex;

}

function merge(arr1, arr2, steps) {
  let sorted = [];

  // Merge and sort the two arrays
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sorted.push(arr1.shift());
    } else {
      sorted.push(arr2.shift());
    }
  };
  let output = sorted.concat(arr1.slice().concat(arr2.slice()));

  // Add to steps.
  let stepIndex = stepsAway(output);

  if (steps.length > stepIndex) {
    for (let i = 0; i < output.length; i++) {
      steps[stepIndex].push(output[i]);
    }
  } else {
    steps.push(output.slice());
  }

  return output;
}
//#endregion


//#region QuickSort
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function QuickSortStep(items, left, right, steps) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (index - 1 > left) { //more elements on the left side of the pivot
      QuickSortStep(items, left, index - 1, steps);
    }
    if (index < right) { //more elements on the right side of the pivot
      QuickSortStep(items, index, right, steps);
    }
  }
  if (JSON.stringify(steps[steps.length - 1]) != JSON.stringify(items)) {
    steps.push(items.slice());
  }
  return items;
}
//#endregion




function SelectionSortStep(arr, steps) {

  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;

      steps.push(arr.slice());
    }
  }

  return arr;
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
            BubbleSortStep(this.props.arr, steps);
            break;
          case "Insertion":
            InsertionSortStep(this.props.arr, steps);
            break;
          case "Merge":
            MergeSortStep(this.props.arr, this.props.arr.length, steps);
            break;
          case "Quick":
            QuickSortStep(this.props.arr, 0, this.props.arr.length - 1, steps);
            break;
          default:
            SelectionSortStep(this.props.arr, steps);
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
