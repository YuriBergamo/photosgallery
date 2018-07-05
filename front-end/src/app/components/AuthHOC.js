import React, {Component} from 'react'
import AuthenticationService from './services/AuthenticationService'

export default function AuthHOC(AuthComponent){
    const Auth = new AuthenticationService();
    return class AuthWrapped extends Component {

        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }else {
                try {
                    const user = Auth.getToken();
                    this.setState({
                        user: user
                    })
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }

        render(){
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user}/>
                )
            }
            return null
        }
    }
}