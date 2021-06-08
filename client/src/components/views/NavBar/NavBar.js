import React from 'react'
import './Sections/navbar.css';
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'

function NavBar() {
    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            <div className="menu__logo">
                <a href="/">MovieApp</a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightMenu />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
