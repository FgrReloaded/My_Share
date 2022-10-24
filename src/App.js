import React, { useState } from 'react';
import QRCode from "react-qr-code";
import "./App.css"
import { QrReader } from 'react-qr-reader';
import randomatic from 'randomatic';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Service from './Service';
import Home from './Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/my-share/room=:room" element={<Service />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>

    </>

  )
}

export default App;