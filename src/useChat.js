import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import download from 'downloadjs';

const useChat = (roomId) => {
  let fileShare = {};
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient("https://my-share-back.herokuapp.com/", {
      query: { roomId },
    });
    socketRef.current.emit("join_room", roomId);
    
    socketRef.current.on("newChatMessage", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    socketRef.current.on("file-receive", (data)=>{
      const incomingFile = {
        ...data,
        ownedByCurrentUser: data.senderId === socketRef.current.id
      };
      setFiles((files)=>[...files, incomingFile]);
    })


    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit("newChatMessage", {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };
  const shareFile = (url, filedata)=>{
    socketRef.current.emit("file-send", {url, filedata, senderId: socketRef.current.id});
  }

  return { messages, sendMessage, shareFile, files };
};

export default useChat;