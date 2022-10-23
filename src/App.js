import React, { useState } from 'react';
import QRCode from "react-qr-code";
import "./App.css"
import { QrReader } from 'react-qr-reader';

function App() {
  const [data, setData] = useState("Scanned Result");
  const [scanBtn, setScanBtn] = useState("Scan Code");
  const [showScan, setShowScan] = useState(false);
  const showScanner = () => {
    if (!showScan) {
      setShowScan(true);
      setScanBtn("Close Scanner");
    } else {
      setShowScan(false);
      setScanBtn("Scan Code");
    }
  }
  const copyText = () => {
    navigator.clipboard.writeText(data);
  }


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
              <div className="qrCode ">
                <QRCode className="qr"
                  size={200}
                  value="My Self Nitish Kumar"
                />
              </div>
            </div>
          </div>)}

        </div>
      </section>
      {showScan && (
        <section section className='scanner'>
          <div className="flex items-center border-b border-teal-500 py-2 mb-15">
            <div className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" aria-label="">{data}</div>
            <a target="_blank" rel="noreferrer" href={data} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Goto
            </a>
            <button onClick={copyText} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Copy
            </button>
          </div>
          <span className='bord bord1'></span>
          <span className='bord bord2'></span>
          <span className='bord bord3'></span>
          <span className='bord bord4'></span>
          <QrReader
            constraints={{facingMode:"environment"}}         
            delay={300}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
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

export default App;
