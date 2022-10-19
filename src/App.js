import React from 'react';
import QRCode from "react-qr-code";
import "./App.css"
// import QR from './QR';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-16 mb-3 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl font-medium text-gray-900">My Share<br className="hidden lg:inline-block" />
              </h1>
              <span className="font-[20] subtitle sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Make Sharing Easy</span>
              <p className="mb-8 leading-relaxed read">Scan the QR code from your device to share any data including files such as images, sounds, documents etc. and any text, links on your devices in just one click.</p>
              <div div className="flex justify-center scanqr">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Scan Code</button>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <div className="container">
                <div className="qrCode ">
                  <QRCode className="qr"
                    size={200}
                    value="FgrReloaded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <QR /> */}
        <div className="App">
        <section className="App-section">
          <div className="App-section-title"> Html5-qrcode React demo</div>
          <br />
          <br />
          <br />
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
          <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
      </>

    )
  }
  onNewScanResult(decodedText, decodedResult) {
    console.log(
      "App [result]", decodedResult);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default App;
