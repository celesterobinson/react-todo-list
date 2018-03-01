import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/auth";

function Navbar(props) {
    const isAuthenticated = props.isAuthenticated;
    return (
        <div className="navbar-wrapper">
            {isAuthenticated ? null : <div className="links"><Link to="/">Login</Link></div>}
            {isAuthenticated ? null : <div className="links"><Link to="/signup">Sign Up</Link></div>}
            {isAuthenticated ? null : <div className="links"><Link to="/todos">Todos</Link></div>}
            {isAuthenticated ? null : <div><button onClick={props.logout}>Logout</button></div>}
        </div>
    )
}

export default connect(state => state.user, { logout })(Navbar);
