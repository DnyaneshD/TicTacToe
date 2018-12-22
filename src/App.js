import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import "./App.css";

class App extends Component {
  state = this.initialState();

  handleClick(value) {
    const { firstPlayer, blocksState } = this.state;

    if (blocksState[value] > 2) {
      return;
    }

    if (!firstPlayer) {
      blocksState[value] = 1;
    } else {
      blocksState[value] = 2;
    }

    this.setState({ firstPlayer: !firstPlayer });
    this.checkWinner();
  }

  handleClose = () => {
    this.setState(this.initialState());
  };

  render() {
    const { draw, winner } = this.state;

    let result = null;

    if (winner) {
      result = `Winnner of the match is ${winner}`;
    }

    if (draw) {
      result = `Last match was draw`;
    }

    const inlineCss = {
      display: "inline"
    };

    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        <div className="game">
          <table>
            <tbody>{this.createTable(this.state.blocksState)}</tbody>
          </table>
        </div>

        <Modal show={this.state.showResult} onHide={this.handleClose}>
          <Modal.Body>
            <div>
              <h4 style={inlineCss}>{result}</h4>
              <button
                type="button"
                className="btn btn-light pull-right"
                onClick={this.handleClose}>
                Restart
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  getBackgroundColour(value) {
    switch (value) {
      case 1:
        return "green";

      case 2:
        return "blue";

      default:
        return "";
    }
  }

  checkWinner() {
    const { blocksState } = this.state;
    const count = blocksState.filter(x => x !== 0).length;
    if (count >= 5) {
      if (
        this.equalityCheck(1, [0, 1, 2]) ||
        this.equalityCheck(1, [0, 3, 6]) ||
        this.equalityCheck(1, [0, 4, 8]) ||
        this.equalityCheck(1, [1, 4, 7]) ||
        this.equalityCheck(1, [3, 4, 5]) ||
        this.equalityCheck(1, [6, 7, 8]) ||
        this.equalityCheck(1, [2, 4, 6])
      ) {
        this.setState({ winner: "x", showResult: true });
        return;
      } else if (
        this.equalityCheck(2, [0, 1, 2]) ||
        this.equalityCheck(2, [0, 3, 6]) ||
        this.equalityCheck(2, [0, 4, 8]) ||
        this.equalityCheck(2, [1, 4, 7]) ||
        this.equalityCheck(2, [3, 4, 5]) ||
        this.equalityCheck(2, [6, 7, 8]) ||
        this.equalityCheck(2, [2, 4, 6])
      ) {
        this.setState({ winner: "o", showResult: true });
        return;
      }
    }

    if (count === 9) {
      this.setState({ draw: true, showResult: true });
    }

    return;
  }

  initialState() {
    return {
      firstPlayer: false,
      blocksState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      winner: "",
      showResult: false,
      draw: false
    };
  }

  equalityCheck(match, ...indexes) {
    const { blocksState } = this.state;
    return indexes[0].every(i => blocksState[i] === match);
  }

  createTable(colors) {
    const rows = [];

    let arrayIndex = 0;

    for (let i = 0; i < 3; i++) {
      const tds = [];
      for (let j = 0; j < 3; j++) {
        tds.push(
          <Block
            key={arrayIndex}
            index={arrayIndex}
            color={this.getBackgroundColour(colors[arrayIndex])}
            onClick={this.handleClick.bind(this, arrayIndex)}
          />
        );

        arrayIndex++;
      }
      rows.push(<tr key={arrayIndex}>{tds}</tr>);
    }

    return rows;
  }
}

function Block(props) {
  let text = "";

  if (props.color === "green") {
    text = "X";
  } else if (props.color === "blue") {
    text = "O";
  }

  return (
    <td
      style={{
        color: props.color,
        fontSize: "65px"
      }}
      onClick={props.onClick}>
      {text}
    </td>
  );
}

export default App;
