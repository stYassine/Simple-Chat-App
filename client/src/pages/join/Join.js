import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join =() => {

    const [name,setName] =useState('');
    const [room,setRoom] =useState('');
    return(
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <div className="heading">
                <h1>Join</h1>
            </div>
            <div>
                <input type="text" value={name} placeholder="Name" className="joinInput" onChange={(evt) => setName(evt.target.value)} />
            </div>
            <div>
                <input type="text" value={room} placeholder="Room" className="joinInput mt-20" onChange={(evt) => setRoom(evt.target.value)} />
            </div>
            <Link 
                onClick={(evt) => (!name || !room) ? evt.preventDefault() : null }
                to={`/chat?room=${room}&name=${name}`}>
                <button className="button mt-20" type="submit">Sign In</button>
            </Link>
        </div>
    </div>
    );
    
};

export default Join;