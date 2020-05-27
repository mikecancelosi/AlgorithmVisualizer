import React from 'react';
export default class Navigation extends React.Component {
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