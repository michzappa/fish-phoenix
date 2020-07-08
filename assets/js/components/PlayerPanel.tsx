import React from "react";
import { Team, Player } from "../data";

interface PlayerPanelProps {
  teamScore: number;
  teammates: Player[];
  opponentScore: number;
  opponents: Player[];
}

interface PlayerPanelState {}
// shows the teammates and opponents of the player of this app
class PlayerPanel extends React.Component<PlayerPanelProps, PlayerPanelState> {
  constructor(props: PlayerPanelProps) {
    super(props);

    this.processTeammates = this.processTeammates.bind(this);
    this.processOpponents = this.processOpponents.bind(this);
  }

  render() {
    return (
      <div>
        <h2>
          Teammates: {this.processTeammates()} <br></br>Score:{" "}
          {this.props.teamScore}
        </h2>
        <h2>
          Opponents: {this.processOpponents()} <br></br>Score:{" "}
          {this.props.opponentScore}
        </h2>
      </div>
    );
  }

  // turns list of players into a string
  processTeammates() {
    if (this.props.teammates) {
      const teammateNames = this.props.teammates.map((player) => player.name);
      return teammateNames.join(", ");
    }
  }

  // turns list of players into a string
  processOpponents() {
    if (this.props.opponents) {
      const opponentNames = this.props.opponents.map((player) => player.name);
      return opponentNames.join(", ");
    }
  }
}

export default PlayerPanel;
