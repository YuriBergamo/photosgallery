import React from 'react';
import ReactDOM from 'react-dom';

//css
import './index.css';

//components
import App from './App';
import Login from './app/Login'
import Logon from './app/Logon'
import Helmet from 'react-helmet'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//registerService
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <div>
            <Helmet
                title="Photos Gallery"
                script={[
                    { 'src': 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'},
                ]}
                link={[
                    {'rel':'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
                ]}
            />
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logon" component={Logon} />
        </div>
    </Router>

), document.getElementById('root'));

registerServiceWorker();
