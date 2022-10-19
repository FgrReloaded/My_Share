import React, { Component } from 'react'
import QrReader from 'react-qr-scanner';


export default class QR extends Component {
    constructor(props) {
        super(props);
        this.state = {
          result: "Hold QR code in front",
        }
        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(result) {
        this.setState({
          result: result
        })
      }
  render() {
    return (
        <React.Fragment>
        <QrReader
          delay={100} onScan={this.handleScan}
        />
        <p>{this.state.result}</p>

      </React.Fragment>
    )
  }
}
