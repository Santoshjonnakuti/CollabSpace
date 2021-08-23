import React from 'react';
import { NavLink } from 'react-router-dom';
// import "./UnAuthorized.css";

const UnAuthorized = () => {
    return (
        <div className="error-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                401  UnAuthorized</h2>
                            <div className="error-details">
                                Login to your account to acces this page!
                            </div>
                            <div className="error-actions">
                                <NavLink to="/" className="btn btn-success btn-lg">
                                <span className="glyphicon glyphicon-home"></span>
                                    Take Me Home </NavLink><NavLink to="#!"
                                     className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UnAuthorized
