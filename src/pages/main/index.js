import React, { Component } from 'react';
import api from "../../services/api";
import queryString from 'query-string';
import Dashboard from '../../components/Dashboard'
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header';

class Main extends Component {

   

    render() {
        return (
            <React.Fragment>
                <Header {...this.props}/>
                <Dashboard {...this.props}/>
            </React.Fragment>
        );
    }
}

export default withRouter(Main);