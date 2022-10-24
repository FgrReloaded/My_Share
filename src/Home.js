import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import QRCode from "react-qr-code";
import "./App.css";
import { QrReader } from 'react-qr-reader';
import randomatic from 'randomatic';
import { useNavigate } from 'react-router-dom';

function Home() {
  const socketRef = useRef();
  const navigate = useNavigate();
  const host = "http://localhost:2000";
  const room = randomatic('*', 15);
  const [data, setData] = useState("Scanned Result");
  const [scanBtn, setScanBtn] = useState("Scan Code");
  const [showScan, setShowScan] = useState(false);
  const [result, setResult] = useState("None");
  const showScanner = () => {
    if (!showScan) {
      setShowScan(true);
      setScanBtn("Close Scanner");
    } else {
      setShowScan(false);
      setScanBtn("Scan Code");
      setData("Scanned Result");
    }
  }
  const copyText = () => {
    navigator.clipboard.writeText(data);
  }
  const sendData = () => {
    navigate(`/my-share/room=${data}`, { replace: true });
  }
  useEffect(() => {
    socketRef.current = io(host, {
      query: { room }
    });
    // socketRef.current.on('allUsersData', ({ users }) => {
    //   setUsers(users)
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
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 pt-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-16 mb-3 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl font-medium text-gray-900">My Share<br className="hidden lg:inline-block" />
            </h1>
            <span className="font-[20] subtitle sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Make Sharing Easy</span>
            <p className="mb-8 leading-relaxed read">Scan the QR code from your device to share any data including files such as images, sounds, documents etc. and any text, links on your devices in just one click.</p>
            <div div className="flex justify-center scanqr">
              <button onClick={showScanner} className={`inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}>{scanBtn}</button>
            </div>
          </div>{!showScan && (<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <div className="container">
              <div className="qrCode">
                <QRCode className="qr"
                  size={200}
                  value="My Name is Saloni Kumari and I am Idiot Girl that everyone knows how stupid I am."
                />
              </div>
            </div>
          </div>)}

        </div>
      </section>
      {showScan && (
        <section className='scanner'>
          <div className="flex items-center border-b border-teal-500 py-2 mb-15">
            <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" aria-label="">{data}</div>
            <a target="_blank" rel="noreferrer" href={data} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Goto
            </a>
            <button onClick={copyText} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Copy
            </button>
          </div>
          <QrReader
            constraints={{ facingMode: "environment" }}
            delay={300}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                sendData();
              }
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }} />
        </section>
      )}
    </>

  )
}

export default Home;