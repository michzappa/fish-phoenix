import React from "react";

interface ShowTurnNameProps {
  turn: string;
}
class ShowTurnName extends React.Component<ShowTurnNameProps> {
  render() {
    return (
      <div>
        <h1>Current Turn: {this.props.turn}</h1>
      </div>
    );
  }
}

export default ShowTurnName;
