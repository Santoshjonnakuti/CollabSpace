import React, {useState} from 'react';
import logo from "../../images/favicon.ico";
function NoInternet(props) {
    const [Class, setClass] = useState(props.class);
    return(
        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center">
            <div className={Class} role="alert" aria-live="assertive" aria-atomic="true" style={{MozBoxShadow: "0 0 3px #888",
                WebKitBoxShadow: "0 0 3px #888",
                boxShadow: "0 0 3px #888"}}>
                    <div className="toast-header">
                        <img src={logo} className="rounded me-2" alt="Logo" width="auto" height="24px" />
                        <strong className="me-auto">CollabSpace</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Are You sure you want to Delete this Post ?
                    </div>
                    <div className="mt-2 pt-2 border-top d-flex justify-content-end">
                        <button type="button" className="btn btn-primary btn-sm me-3 mb-2"
                        disabled={props.button}>Yes</button>
                        <button type="button" className="btn-light mb-2 me-3" data-bs-dismiss="toast" 
                        style={{background:"#e0e0e0", border:"0px", borderRadius:"5px" }} disabled={props.button}
                        onClick={() => setClass("toast")}>No</button>
                    </div>
                </div>
        </div>
    )
}

export default NoInternet;
