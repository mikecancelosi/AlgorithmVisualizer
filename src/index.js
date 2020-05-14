import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

function DrawBox(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );  
}


class Row extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      blocks: props.blocks
    };
  }

  render(){
    return(
    <button></button>
    );
  }
}


class Visualizer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      nCount: 3,
      sortMethod: "Bubble"
    }
  }

 
  render(){
    return(
      <div id = "Visualizer">
        <SortingInput/>
        <SortingWindow/>
      </div>
    );
  };
}

class SortingInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      nCount: 3,
    };
  }
  handleDragStop = (event, value) => {this.setState({nCount: value})};

  render(){
    return(
      <div className ="center">
        <div class = "sortInput">
          <div class = "nSlider" >   
            <Typography id="range-slider" >Items to sort </Typography>
            <Slider 
              defaultValue = {15}
              min = {3}
              max = {1000}
              valueLabelDisplay = "auto"
              step ={1}
              onChangeCommitted={this.handleDragStop}
              />
          </div>
          <SortingAlgorithmDropdown/>
        </div>
      </div>

    );
  }
}

function SortingAlgorithmDropdown(){
  return (
    <FormControl class= "dropdown">
        <Select labelId="Algorithm" id="algorithm-select" defaultValue="Bubble">
          <MenuItem value={"Bubble"}>Bubble Sort</MenuItem>
          <MenuItem value={"Insertion"}>Insertion Sort</MenuItem>
          <MenuItem value={"Merge"}>Merge Sort</MenuItem>          
          <MenuItem value={"Quick"}>Quick Sort</MenuItem>
          <MenuItem value={"Selection"}>Selection Sort</MenuItem>
        </Select>
      </FormControl>
  )
}

function SortingWindow(){
  return(
    <div></div>
  )
}

class Navigation extends React.Component{
  render(){
    return (
        <div className = "container center">
          <div className = "menu">
            <div class = "menu-left">
              <ul class = "menu-list">
                <li class = "menu-list-item"><a class="menu-link menu-link--active" href="#">Sorting</a></li>
                <li class = "menu-list-item"><a class="menu-link" href="#">Pathfinding</a></li>                
              </ul>
            </div>
          </div>
        </div>
    );
  };
}

class App extends React.Component{
  
  render(){
    return(      
      <div className = "container">
        <Navigation/>
        <Visualizer/>
      </div>
    );
  };
}

// ========================================
ReactDOM.render(<App/>,document.getElementById("root"));
