import React from 'react';

function Loading(props) {
    return (
        <div className="profile-card-container">
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status" style={{color:"#2ecc71"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;