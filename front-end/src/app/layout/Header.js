import React from 'react'
import { NavLink } from 'react-router-dom'

class Header extends React.Component {

    state = {
        isActive: false,
    };

    toggleNav = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }))
    };

    render() {
        return (
            <nav className="navbar has-shadow is-primary"
                    aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink
                        activeClassName="is-active"
                        to="/"
                        className="navbar-item">
                        <span className="header_title">Photo Gallery</span>
                    </NavLink>
                    <button className="button navbar-burger header_nav" onClick={this.toggleNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                    <div className="navbar-start">
                        <a className="navbar-item">
                          <span className="icon" style={{ marginRight: 5 }}>
                            <i className="fa fa-upload"></i>
                          </span>
                            Upload new photos
                        </a>
                    </div>
                    <div className="navbar-end">
                        <NavLink
                            activeClassName="is-active"
                            to="aboutus"
                            className="navbar-item">
                          <span className="icon" style={{ marginRight: 5 }}>
                            <i className="fas fa-fire"></i>
                          </span>
                          To Approved
                        </NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;
