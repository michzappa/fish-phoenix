import React from "react";

interface ShowLastMoveProps {
  move: string;
}
class ShowLastMove extends React.Component<ShowLastMoveProps> {
  render() {
    return (
      <div>
        <h1>Last move: {this.props.move}</h1>
      </div>
    );
  }
}

export default ShowLastMove;
