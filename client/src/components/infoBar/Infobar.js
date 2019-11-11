import React from 'react';

import './Infobar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar =({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} />
            <h3>{ room }</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"> <img src={closeIcon} /> </a>
        </div>
    </div>
);

export default InfoBar;