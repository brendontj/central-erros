import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
            <Container className="log-info">
                <Link to="/log/"> Voltar </Link>

                <Card className="text-center">

                    <Card.Header>Detalhes</Card.Header>
                    <Card.Body>
                        <Card.Title>Titulo</Card.Title>
                        <Card.Text>
                            {log_detail.titulo}
                        </Card.Text>

                        <Card.Title>Ambiente</Card.Title>
                        <Card.Text>
                            {log_detail.ambiente}
                        </Card.Text>

                        <Card.Title>Descricao</Card.Title>
                        <Card.Text>
                            {log_detail.descricao}  
                        </Card.Text>

                        <Card.Title>Detalhes</Card.Title>
                        <Card.Text>
                            {log_detail.detalhe}
                        </Card.Text>
                        <Card.Title>Ultima atualizacao</Card.Title>
                        <Card.Footer className="text-muted">{log_detail.updated_at}</Card.Footer>
                    </Card.Body>
                 
                </Card>
               

            </Container>
        );

    }
}