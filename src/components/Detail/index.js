import React, { Component, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Overlay from 'react-bootstrap/Overlay'
import { getToken } from "../../services/auth";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Popover from 'react-bootstrap/Popover'

export default class Detail extends Component {

    state = {
        log_detail: {},
    };

    async componentDidMount() {

        const { id } = this.props.match.params;
        const response = await api.get(`/logs/${id}`);
        
        this.setState({ log_detail: response.data });
    }


    render() {
        const { log_detail } = this.state;

        function Example() {
            const [show, setShow] = useState(false);
            const [target, setTarget] = useState(null);
            const ref = useRef(null);
            const token = getToken();
          
            const handleClick = event => {
              setShow(!show);
              setTarget(event.target);
            };
          
            return (
              <ButtonToolbar ref={ref}>
                <Button className='buttonToken' onClick={handleClick}>Token</Button>
          
                <Overlay
                  show={show}
                  target={target}
                  placement="right"
                  container={ref.current}
                  containerPadding={20}
                  
                >
                  <Popover id="popover-contained">
                    <Popover.Title as="h6">{token}</Popover.Title>
                    
                  </Popover>
                </Overlay>
              </ButtonToolbar>
            );
          }


        return (
            <Container className="log-info">
                <Link to="/log/"> Voltar </Link>
                <Row>
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                         <Card.Header><strong><h1>Detalhes do Log</h1></strong></Card.Header>
                            
                            </Card.Body>
                    </Card>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <Card >

                    
                    <Card.Body>
                        <Card.Title>Titulo</Card.Title>
                        <Card.Text>
                            {log_detail.titulo}
                        </Card.Text>

                        <Card.Title>Ambiente</Card.Title>
                        <Card.Text>
                                {(function () {
                                if(log_detail.ambiente === 'dev') {
                                    return 'Desenvolvimento';
                                }
                                else if(log_detail.ambiente ==='produção'){
                                    return 'Produção';
                                }
                                else {
                                    return 'Homologação';
                                }
                                })()}
                           
                        </Card.Text>

                        <Card.Title>Descricao</Card.Title>
                        <Card.Text>
                            {log_detail.descricao}  
                        </Card.Text>

                        <Card.Title>Detalhes</Card.Title>
                        <Card.Text>
                            {log_detail.detalhe}
                        </Card.Text>
                
                    </Card.Body>
                 
                </Card>

                    </Col>
                    <Col xs lg="3">
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center">
                                {(function () {
                                                        switch (log_detail.level) {
                                                            case 'error':
                                                                return <Badge variant="danger">Error</Badge>;
                                                            case 'debug':
                                                                return <Badge variant="info">Debug</Badge>;
                                                            default:
                                                                return <Badge variant="warning">Warning</Badge>;
                                                            }
                                                        }
                                                    )()}
                                </Card.Title>


                            </Card.Body>

                            <Card.Body className="text-center">
                                        <Card.Title>Eventos</Card.Title>
                                        <Card.Text>
                                            <strong>{log_detail.eventos}</strong>
                                        </Card.Text>

 
                            </Card.Body>

                            <Card.Body className="text-center">
                                        <Card.Title>Coletado por:</Card.Title>
                                      
                                        <Example />
                                      

 
                            </Card.Body>


                            <Card.Body className="text-center">
                                <Card.Title>Ultima atualizacao</Card.Title>
                                <Card.Footer className="text-muted">{log_detail.updated_at}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        );

    }
}