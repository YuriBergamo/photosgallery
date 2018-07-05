import React, { Component } from 'react';

//components
import './App.css';
import Layout from './app/Layout';

//auth
import AuthHOC from './app/components/AuthHOC';

class App extends Component {
  render() {
    return (
     <Layout />
    );
  }
}

export default AuthHOC(App);
// export default App;
