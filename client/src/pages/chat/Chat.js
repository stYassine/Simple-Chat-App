import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import Infobar from '../../components/infoBar/Infobar';
import Messages from '../../components/messages/Messages';
import Input from '../../components/input/Input';
import TextContainer from '../../components/textContrainer/TextContainer';

let socket;

const Chat =({ location }) => {

    const [name, setName] =useState('');
    const [room, setRoom] =useState('');
    const [users, setUsers] =useState([]);
    const [message, setMessage] =useState('');
    const [messages, setMessages] =useState([]);
    const ENDPOINT ='localhost:5000';

    useEffect(() => {

        const {name, room} =queryString.parse(location.search);
        setName(name);
        setRoom(room);
        
        socket =io(ENDPOINT);

        socket.emit('join', { name, room }, (error) => {
            if(error) alert(error);
        });

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({users}) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [messages]);

    /// send Message
    const sendMessage =(evt) => {
        evt.preventDefault();
        console.log(message);
        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );

}

export default Chat;