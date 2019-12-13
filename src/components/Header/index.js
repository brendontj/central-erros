import React, { Component , eventKey, onClick} from 'react';
import api from "../../services/api";
import { getToken } from "../../services/auth";
import { logout } from "../../services/auth";
import './styles.css';
import { withRouter, Link } from 'react-router-dom';
// import { Container } from '../auth/SignUp/styles';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import { thisExpression } from '@babel/types';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button'




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
        this.setState({ dataAuth: response.data.user });
        const token = getToken();
        this.setState({ token: token });
    };

    log_off() {
        logout();
    }



    render() {
        
        return (
            <Container>
                <Row className="header-logo">
                    <Col>
                        <Image src="../logo_transparent.png" roundedCircle className="logo-log " />

                    </Col>
                </Row>

                <Row>
                    <Col className="header-infos">
                        
                        <Accordion >
                            <Card className="card" bg='light' border="dark">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Informacoes de sessao
                                     </Accordion.Toggle>
                                </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                            <Card.Body className="card">Email: {this.state.dataAuth.email}</Card.Body>
                                            
                                    </Accordion.Collapse>
                            </Card>
                                    <Card className="card" bg='light' border="dark" >
                                        {/* <Card.Header> */}
                                            {/* <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Click me!
                                            </Accordion.Toggle> */}
                                        {/* </Card.Header> */}
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className="card">Token: {this.state.token}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                        </Accordion>


                        <Link to="/login" className="header-button" varian="outline-info" onClick={this.log_off}>Logout</Link>
                    </Col>

                </Row>

            </Container>
                        );
                
                    }
                }
                
export default withRouter(Header);