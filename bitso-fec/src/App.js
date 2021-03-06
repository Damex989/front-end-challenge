import React, { Component } from "react";
import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    book: "btc_mxn",
    ticker: {},
    books: null,
    orders: null,
    trades: null
  };

  componentDidMount() {
    const { book } = this.state;
    this.websocket.onopen = () => {
      this.websocket.send(
        JSON.stringify({ action: "subscribe", book, type: "trades" })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book,
          type: "diff-orders"
        })
      );
      this.websocket.send(
        JSON.stringify({ action: "subscribe", book, type: "orders" })
      );
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  render() {
    const { book } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={bitso_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bitso Exchange</h1>
        </header>
        <Dashboard book={book} websocket={this.websocket} />
      </div>
    );
  }
}

export default App;
