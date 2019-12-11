import React, { Component } from 'react';
import api from "../../services/api";
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Dashboard extends Component {

    state = {
            logs: [],
            ambiente:"dev",
            order:"level",
            chave: "",
            valor: ""    
    };
    //Do this action when the when component born
    componentDidMount() {

        this.loadLogs();
       
    }

    async loadLogs () {
        const response = await api.get(`/logs?ambiente=${this.state.ambiente}&order=${this.state.order}&chave=${this.state.chave}&valor=${this.state.valor}`);
        this.setState({logs: response.data.data});
    };

   

    render() {
        return (
            
            <div className="log-list">
                <article>
                    <strong>Descricao do log</strong>
                    <p>Origem do log</p>
                    <p>Data do log</p>
                </article>
                {this.state.logs.map(log =>(
                    <article key={log.id}>
                    <strong key= {log.id} >{log.descricao}</strong>
                        <p className="log-origem">{log.origem}</p>
                        <p className="log-level">{log.level}</p>
                        <p className="log-eventos">{log.eventos}</p>
                        <p className="log-date">{log.created_at}</p>
                        <Link to={`/log/${log.id}` }> Detalhes </Link>
                    </article>
                ))}

                
            </div>
        );
    }
}