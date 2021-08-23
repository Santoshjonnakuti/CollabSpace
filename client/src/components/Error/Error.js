import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Error.css";

const Error = () => {
    return (
        <div className="error-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
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

export default Error
