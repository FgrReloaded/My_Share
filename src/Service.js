import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';

function Service(props) {
  const socketRef = useRef();
  const { room } = props.match.params;
    const url = "http://localhost:2000/";
  useEffect(() => {
    socketRef.current = io(url, {
        query: { room }
    });
    // socketRef.current.on('allUsersData', ({ users }) => {
    //     setUsers(users)
    // })

    socketRef.current.on("send message", (message) => {
        const incomingMessage = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id,
        };
        // setMessages((messages) => [...messages, incomingMessage]);
    });
}, [room]);
  return (
    <>
        hello
    </>
  )
}

export default Service