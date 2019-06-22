import React from 'react';
import './CustomMsg.css';

const CustomMsg = ({mainmsg, confirm, cancel, confirmfunc, cancelfunc}) => {
    return (
        <div className="custommsg">
            <div className="custommsg-main">
                {mainmsg}
            </div>
            <div className="custommsg-btn">
                <div onClick={()=>confirmfunc()}>{confirm}</div>
                <div onClick={()=>cancelfunc()}>{cancel}</div>
            </div>
        </div>
    );
}

export default CustomMsg;
