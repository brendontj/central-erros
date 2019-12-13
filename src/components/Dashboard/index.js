import React, { Component } from 'react';
import api from "../../services/api";

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
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'


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
        
        this.setState({ logs: response.data.data});
    };

    async handle(newState) {
        await this.setState(newState)
        this.loadLogs()
        await this.setState({valor: " ", chave: " ", buscarPor: 'Buscar por'});
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
                        <Dropdown.Item eventKey="1" value="level" onClick ={e => this.setState({ chave: "level", buscarPor: 'Level' })}>Level</Dropdown.Item>
                        <Dropdown.Item eventKey="2" value="descricao" onClick ={e => this.setState({ chave: "descricao", buscarPor: 'Descrição' })}>Descrição</Dropdown.Item>
                        <Dropdown.Item eventKey="3" value="origem" onClick ={e => this.setState({ chave: "origem", buscarPor: 'Origem' })} >Origem</Dropdown.Item>
                    </DropdownButton>

                    <Form inline>
                        <FormControl type="text" placeholder="Buscar" className="mr-sm-2" onChange={e => this.setState({ valor: e.target.value })}/>
                        <Button variant="outline-primary" className="search-button" onClick={() => this.handle()}>Buscar</Button>

                    </Form>

                </ButtonToolbar>


                {this.state.logs.map(log => (




                    <article key={log.id} className="MainBody">

                        <Row>
                            <Col xs lg="2">

                                <Card className="text-center">
                                    <Card.Body>
                                        <Card.Title>Nro Ocorrencias</Card.Title>
                                        <Card.Text>
                                            <strong>{log.eventos}</strong>
                                        </Card.Text>

 
                                    </Card.Body>
                                    <Card.Body>
                                    <Card.Title>
                                            {(function () {
                                                switch (log.level) {
                                                    case 'error':
                                                        return <Badge variant="danger">Error</Badge> ;
                                                    case 'debug':
                                                        return <Badge variant="info">Debug</Badge>;
                                                    default:
                                                        return <Badge variant="warning">Warning</Badge>;
                                                    }
                                                }
                                            )()}
                                     </Card.Title>
                                    </Card.Body>

                                    <Card.Body>
                                    <Card.Title>
                                            {(function () {
                                                switch (log.level) {
                                                    case 'error':
                                                        return <Spinner animation="grow" variant="danger" /> ;
                                                    case 'debug':
                                                        return <Spinner animation="grow" variant="info" />;
                                                    default:
                                                        return <Spinner animation="grow" variant="warning" />;
                                                    }
                                                }
                                            )()}
                                     </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col >
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
                            </Col >

                        </Row>

                    </article>
                ))}


            </Container>
        );
    }
}