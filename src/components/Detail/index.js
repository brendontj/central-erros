import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default class Detail extends Component {

    state = {
        log_detail: {},
    };

    async componentDidMount() {

        const { id } = this.props.match.params;
        const response = await api.get(`/logs/${id}`);
        console.log(response.data);
        this.setState({ log_detail: response.data });
    }


    render() {
        const { log_detail } = this.state;
        return (
            <div className="log-info">
                <Link to="/log/"> Voltar </Link>

                <h1>{log_detail.titulo}</h1>
                <h2>{log_detail.ambiente} </h2>
                <p> {log_detail.descricao} </p>
                <p> {log_detail.detalhe} </p>
                <p> {log_detail.eventos}</p>
                <p> {log_detail.updated_at}</p>

            </div>
        );

    }
}