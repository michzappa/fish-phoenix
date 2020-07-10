import React from "react";

interface ShowHandProps {
  playerName?: string;
  hand: string[];
}

interface ShowHandState {}
class ShowHand extends React.Component<ShowHandProps, ShowHandState> {
  constructor(props: ShowHandProps) {
    super(props);

    this.state = {};
  }

  cardSortMap = new Map<String, number>([
    ["2-H", 1],
    ["3-H", 2],
    ["4-H", 3],
    ["5-H", 4],
    ["6-H", 5],
    ["7-H", 6],
    ["9-H", 7],
    ["10-H", 8],
    ["J-H", 9],
    ["Q-H", 10],
    ["K-H", 11],
    ["A-H", 12],
    ["2-D", 13],
    ["3-D", 14],
    ["4-D", 15],
    ["5-D", 16],
    ["6-D", 17],
    ["7-D", 18],
    ["9-D", 19],
    ["10-D", 20],
    ["J-D", 21],
    ["Q-D", 22],
    ["K-D", 23],
    ["A-D", 24],
    ["2-S", 25],
    ["3-S", 26],
    ["4-S", 27],
    ["5-S", 28],
    ["6-S", 29],
    ["7-S", 30],
    ["9-S", 31],
    ["10-S", 32],
    ["J-S", 33],
    ["Q-S", 34],
    ["K-S", 35],
    ["A-S", 36],
    ["2-C", 37],
    ["3-C", 38],
    ["4-C", 39],
    ["5-C", 40],
    ["6-C", 41],
    ["7-C", 41],
    ["9-C", 43],
    ["10-C", 44],
    ["J-C", 45],
    ["Q-C", 46],
    ["K-C", 47],
    ["A-C", 48],
    ["8-H", 49],
    ["8-D", 50],
    ["8-S", 51],
    ["8-C", 52],
    ["B-J", 53],
    ["R-J", 54],
  ]);

  render() {
    return (
      <div>
        <h1>{this.props.playerName}'s Hand</h1>
        <p className="App-intro">{this.props.hand.join(", ")}</p>
      </div>
    );
  }
}

export default ShowHand;
