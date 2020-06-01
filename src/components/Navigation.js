import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: !window.location.href.includes("paths"),
        }
    }


    render() {
        return (
            <div id="navigation" style={navStyle}>
                <div className="menu-list" >
                    <Link className="menu-list-item" style={this.state.sorting ? linkStyleActive : linkStyle} onClick={() => this.setState({ sorting: true })} to="/"> Sorting </Link>
                    <Link className="menu-list-item" style={this.state.sorting ? linkStyle : linkStyleActive} onClick={() => this.setState({ sorting: false })} to="/paths"> Pathfinding </Link>
                </div >
            </div >

        )
    }
}

const navStyle = {
    backgroundColor: '#eee',
    boxShadow: '0px 2px 24px 0px rgba(0,0,0,.15)',
    width: '100%',
    height: '80px',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
}

const linkStyle = {
    marginRight: '40px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#222',
    fontSize: '20px',
    height: '100%',
    textAlign: 'center',
}

const linkStyleActive = {
    marginRight: '40px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#222',
    fontSize: '20px',
    height: '100%',
    textAlign: 'center',
    borderTop: '4px solid #ffaa3b',
}


