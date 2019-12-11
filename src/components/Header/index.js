import React, { Component } from 'react';
import api from "../../services/api";
import { getToken } from "../../services/auth";
import { logout } from "../../services/auth";
import './styles.css';
import { withRouter, Link } from 'react-router-dom';



class Header extends Component {


    state = {
        dataAuth: [],
        token: ''
    }

    //Do this action when the when component born
    componentDidMount() {
        this.pickCredentials();
    }

    async pickCredentials() {
        const response = await api.get(`/user`);
        this.setState({dataAuth: response.data.user});
        const token = getToken();
        this.setState({token: token});
    };

    log_off() {
        logout();        
    }


    render() {
        return (
        <div id="header-div">
            <header id="header-logo">
                LogFy
            </header>
            <p> Email: {this.state.dataAuth.email}</p>
            <p> Token: {this.state.token} </p>
            {/* <button onClick= {this.log_off} > Logout </button> */}
            <Link to="/login" className="btn btn-primary" onClick={this.log_off}>Logout</Link>
        </div>
        );

    }
}

export default withRouter(Header);