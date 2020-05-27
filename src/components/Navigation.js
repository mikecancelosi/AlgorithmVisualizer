import React from 'react';

export default function Navigation() {
    return (
        <div style={menuStyle} id="navigation">
            <div style={menuLeft}>
                <ul style={menuList}>
                    <li style={menuListItem}><a style={menuLink} href="#">Sorting</a></li>
                    <li style={menuListItem}><a style={menuLink} href="#">Pathfinding</a></li>
                </ul>
            </div>
        </div>
    )
}

const menuStyle = {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 24px 0px rgba(0,0,0,.15)',
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 40px',
    position: 'relative',
}

const menuLeft = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
}

const menuList = {
    listStyleType: 'none',
    padding: '0',
    height: '100%',
    margin: '0px',
    marginRight: '40px',
}
const menuListItem = {
    display: 'inline-block',
    height: '100%',
    marginRight: '20px',
}

const menuLink = {
    color: '#3a3e47',
    display: 'inline - block',
    height: '100%',
    fontSize: '16px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '700',
    padding: '0 3px',
}
