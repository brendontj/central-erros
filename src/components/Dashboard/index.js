import React, { Component } from 'react';
import api from "../../services/api";
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'


import './styles.css';

export default class Dashboard extends Component {


    constructor(props) {
        super(props)
        this.state = {
            logs: [],
            ambiente: "dev",
            order: "level",
            chave: "",
            valor: "",
            filtroPor: 'Desenvolvimento',
            ordenarPor: 'Ordenar por',
            buscarPor: 'Buscar por'

        }
    }

    //Do this action when the when component born
    componentDidMount() {

        this.loadLogs();

    }


    async loadLogs() {

        const response = await api.get(`/logs?ambiente=${this.state.ambiente}&order=${this.state.order}&chave=${this.state.chave}&valor=${this.state.valor}`);
        console.log(response.data.data);
        this.setState({ logs: response.data.data });
    };

    async handle(newState) {
        await this.setState(newState)
        this.loadLogs()
    }

    render() {

        return (


            <Container className="log-list">
                <ButtonToolbar className='Toolbar-find'>
                    <DropdownButton
                        className='Toolbar-itens'
                        drop='down'
                        title={`${this.state.filtroPor}`}
                        id="dropdown-button-drop-down"

                    >
                        <Dropdown.Item onClick={() => this.handle({ ambiente: "dev", filtroPor: 'Desenvolvimento' })}>Desenvolvimento</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handle({ ambiente: "produção", filtroPor: 'Produção' })}>Produção</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handle({ ambiente: "homologação", filtroPor: 'Homologação' })}>Homologação</Dropdown.Item>

                    </DropdownButton>

                    <DropdownButton
                        className='Toolbar-itens'
                        drop='down'
                        title={`${this.state.ordenarPor}`}
                        id="dropdown-button-drop-down"

                    >
                        <Dropdown.Item eventKey="1" value="level" onClick={() => this.handle({ order: "level", ordenarPor: 'Level' })}>Level</Dropdown.Item>
                        <Dropdown.Item eventKey="2" value="eventos" onClick={() => this.handle({ order: "eventos", ordenarPor: 'Frequência' })}>Frequência</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        className='Toolbar-itens'
                        drop='down'

                        title={`${this.state.buscarPor}`}
                        id="dropdown-button-drop-down"

                    >
                        <Dropdown.Item eventKey="1" value="level" onClick={() => this.handle({ chave: "level", buscarPor: 'Level' })}>Level</Dropdown.Item>
                        <Dropdown.Item eventKey="2" value="descricao" onClick={() => this.handle({ chave: "descricao", buscarPor: 'Descrição' })}>Descrição</Dropdown.Item>
                        <Dropdown.Item eventKey="3" value="origem" onClick={() => this.handle({ chave: "origem", buscarPor: 'Origem' })}>Origem</Dropdown.Item>
                    </DropdownButton>

                    <Form inline>
                        <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
                        <Button variant="outline-primary" className="search-button">Buscar</Button>

                    </Form>

                </ButtonToolbar>


                {this.state.logs.map(log => (
                    <article key={log.id} className= "MainBody">


                        <Card className="text-center">
                      
                            <Card.Body>
                                <Card.Title>[Origem] ->{log.origem}</Card.Title>
                                <Card.Text>
                                [Descricao] -> {log.descricao}
                                </Card.Text>
                                
                                <Button variant="outline-primary" className="search-button" >Arquivar</Button>
                                <Button variant="outline-primary" className="search-button" >Deletar</Button>
                                <Link to={`/log/${log.id}`}> Detalhes </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">{log.created_at}</Card.Footer>
                        </Card>

                      
                    </article>
                ))}


            </Container>
        );
    }
}