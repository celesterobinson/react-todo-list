import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Login from "./routes/Login/LoginForm";
import Signup from "./routes/Signup/SignupForm";
import Todos from "./routes/Todos";
import ProtectedRoute from "./routes/ProtectedRoute/index";

class App extends Component {
    render() {
        const isAuthenticated = this.props.user.isAuthenticated;
        return (
            <div className="app-wrapper">
                <Navbar />
                <div className="main">
                    <Switch>
                        <Route exact path="/" render={(props) => {
                            return isAuthenticated ?
                                <Redirect to="/todos" /> :
                                <Login {...props} />
                        }} />
                        <Route path="/signup" render={(props) => {
                            return isAuthenticated ?
                                <Redirect to="/todos" /> :
                                <Signup {...props} />
                        }} />
                        <ProtectedRoute path="/todos" component={Todos} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => state, {})(App));
