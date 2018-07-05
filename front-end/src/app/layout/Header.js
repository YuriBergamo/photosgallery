import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthenticationService from "../components/services/AuthenticationService";


class Header extends React.Component {

    constructor(){
        super()
        this.singOut = this.singOut.bind(this);
    }

    state = {
        isActive: false,
    };

    toggleNav = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }))
    };

    singOut = (e) =>{
        e.preventDefault();
        new AuthenticationService().logout();
        window.location = '/login';
    };

    render() {
        return (
            <nav className="navbar is-primary"
                    aria-label="main navigation">

                <div className="navbar-brand">
                    <NavLink
                        activeClassName="is-active"
                        to="/"
                        className="navbar-item">
                        <span className="header_title">Photo Gallery</span>
                    </NavLink>
                </div>
                <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                    <div className="navbar-end">
                        <a className="navbar-item" onClick={this.singOut}>
                          <span className="icon" style={{ marginRight: 5 }}>
                            <i className="fa fa-times"></i>
                          </span>
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;
