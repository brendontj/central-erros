import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import api from "../../../services/api";
import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/register", { email, password });
        this.props.history.push("/login");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <Container>
        
        <Form onSubmit={this.handleSignUp}>
        <Image src="../logo_transparent.png" roundedCircle className="logo-log "/>
          {this.state.error && <p>{this.state.error}</p>}
        
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Cadastrar </button>
          <hr />
          <Link to="/login">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);