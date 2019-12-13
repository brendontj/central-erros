import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard'
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header';

class Main extends Component {

   

    render() {
        return (
            <React.Fragment>
                <Header />
                <Dashboard />
            </React.Fragment>
        );
    }
}

export default withRouter(Main);