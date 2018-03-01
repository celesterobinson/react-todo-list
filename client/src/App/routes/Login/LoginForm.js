import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/auth";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.inputs);
        this.clearInputs();
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    render() {
        let { username, password } = this.state.inputs;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input onChange={this.handleChange} name="username" value={username} placeholder="Username" type="text" />
                    <input onChange={this.handleChange} name="password" value={password} placeholder="password" type="password" />
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { login })(LoginForm);
