import React, { Component } from 'react';

import logo from '../assets/login_icon.png';

//services
import AuthenticationService from './components/services/AuthenticationService'


class Logon extends Component{

    constructor() {
        super();
        this.state = {username: '', password:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthenticationService();
    }

    handleFormSubmit(e){
        e.preventDefault();
        console.log(this.state.username  + " - " + this.state.password);
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render(){

        return (
            <div className="columns is-vcentered">
                <div className="login column is-4 ">
                    <form className="section" onSubmit={this.handleFormSubmit}>
                        <div className="field">
                            <label className="label">Username*</label>
                            <div className="control has-icons-right">
                                 <input className="input"
                                        name="username"
                                        placeholder="Username"
                                        required
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.username}/>
                                  <span className="icon is-small is-right">
                                    <i className="fa fa-user"></i>
                                  </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password*</label>
                            <div className="control has-icons-right">
                                  <input className="input"
                                         placeholder="Password"
                                         required
                                         name="password"
                                         onChange={this.handleChange}
                                         type="password"
                                         value={this.state.password}/>
                                  <span className="icon is-small is-right">
                                    <i className="fa fa-key"></i>
                                  </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Repeat Password*</label>
                            <div className="control has-icons-right">
                                <input className="input"
                                       placeholder="Password"
                                       required
                                       name="password2"
                                       onChange={this.handleChange}
                                       type="password"
                                       value={this.state.password}/>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-key"></i>
                                  </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Type*</label>
                            <div className="control select is-fullwidth">
                                <select
                                    name="type"
                                    required
                                    value={this.state.type}
                                    onChange={this.handleChange}>
                                    <option value="bride">Bride</option>
                                    <option value="bridegroom">Bridegroom</option>
                                    <option value="friend">Friend</option>
                                </select>
                            </div>
                        </div>
                        <div className="has-text-centered">
                            <button className="button is-vcentered is-primary" type="submit">Create User</button>
                        </div>
                    </form>
                </div>
                <div className="interactive-bg column is-8">
                </div>
            </div>
        )
    }
}

export default Logon