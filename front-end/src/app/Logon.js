import React, { Component } from 'react';

import logo from '../assets/login_icon.png';

//services
import AuthenticationService from './components/services/AuthenticationService'
import Connection from "./connections/Connection";



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
        console.log(this.state);
        if(this.state.password == this.state.password2){
            // create the user
            let newUser = {
                "username": this.state.username,
                "password": this.state.password,
                "type": this.state.typeUser
            };

            Connection.post("/users", newUser).then(res =>{
                console.log("OK", res);
                // create the authentication
                this.Auth.login(res.username,res.password)
                    .then(ok =>{
                        this.props.history.replace('/');
                    })
                    .catch(err =>{
                        alert(err);
                    });

            }).catch(error =>{
                alert(error)
            })
        }else{
            alert("The passwords aren't equals");
        }


    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                                       value={this.state.password2}/>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-key"></i>
                                  </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Type*</label>
                            <div className="control select is-fullwidth">
                                <select
                                    name="typeUser"
                                    required
                                    value={this.state.typeUser}
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