import React, { Component } from 'react';
import logo from '../assets/login_icon.png';

//services
import AuthenticationService from './components/services/AuthenticationService'


class Login extends Component{

    constructor() {
        super();
        this.state = {username: '', password:"", redirect: false};
        this.handleChange = this.handleChange.bind(this);
        this.logon = this.logon.bind(this);
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
                //TODO make better alert
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

    logon(event){
        event.preventDefault();
        this.props.history.push(`/logon`)
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
                        <div className="has-text-centered">
                            <img className="login-logo" src={logo} />
                        </div>

                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-right">
                                 <input className="input"
                                        name="username"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.username}/>
                                  <span className="icon is-small is-right">
                                    <i className="fa fa-user"></i>
                                  </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-right">
                                  <input className="input"
                                         name="password"
                                         onChange={this.handleChange}
                                         type="password"
                                         value={this.state.password}/>
                                  <span className="icon is-small is-right">
                                    <i className="fa fa-key"></i>
                                  </span>
                            </div>
                        </div>
                        <div className="has-text-centered">
                            <button className="button is-vcentered is-primary" type="submit">Login</button>
                        </div>
                        <div className="has-text-centered">
                            <a onClick={this.logon}> Don't you have an account? Sign up.</a>
                        </div>
                    </form>
                </div>
                <div className="interactive-bg column is-8">
                </div>
            </div>
        )
    }
}

export default Login