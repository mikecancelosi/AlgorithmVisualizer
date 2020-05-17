import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Sorter from './sorting.js';


function DrawBox(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );  
} 

class Visualizer extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      nCount: 3,
      sortMethod: "Bubble",
      arr: []
    }
  }

  HandleInputChange = (nCount, sortMethod) => {
    if(nCount){
      this.setState({
        nCount: nCount,
      });
    }
    if(sortMethod){      
      const sortValue = sortMethod.target.value;   
      this.setState({ 
          sortMethod: sortValue
      });
    }  

    this.setState({
      arr: Sorter.GenerateDataSet(this.state.nCount)
    });    

  }
 
  render(){
    return(
      <div id = "Visualizer">
        <SortingInput onChange = {this.HandleInputChange}/>
        <SortingWindow arr = {this.state.arr} />
      </div>
    );
  };
}

function SortingInput(props){
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
              onChangeCommitted = { (e,value) => props.onChange(value,null)}
              />
          </div>
          <div id = "SortAlgorithm">
            <FormControl class= "dropdown">
              <Select labelId="Algorithm" id="algorithm-select" defaultValue="Bubble" onChange={(e,value) => props.onChange(null,e)}>
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
    arr : [],
    steps : []
    }
    this.Sort();
  }  

  Sort(){
    for (let i = 0; i < this.state.steps.length; i++) {
      const element = this.state.steps[i];
      
      
    }
  }

  RenderSteps = () => {
    let rows = [];
    for (let i =0 ; i< this.state.steps.length;i++){
      const element = this.state.steps[i];
      rows.push(<Row blockValues = {element}/>);
    }
    return rows;
  }

  render(){
    return(
      <div className = "SortingWindow">
        {this.RenderSteps()}  
      </div>
    )
  }
}

class Row extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      blockValues: [],
      blocks: []
    };
  }

  createBlocks = () => {
    for (let i = 0;i < this.state.blockValues.length;i++)
    {

    }

  }

  render(){
    return(
      <div className="Row">
     
      </div>
    );
  }
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
