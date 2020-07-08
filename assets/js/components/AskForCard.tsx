import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../data";
import axios from "../axios";

interface AskForCardProps {
  roomID?: number;
  currentTurn?: string;
  playerID?: number;
  playerName?: string;
  opponents: Player[];
}
interface AskForCardState {
  opponentAsked?: number;
  desiredCard: string;
}
// an interface to ask an opponent player for a specific card
class AskForCard extends React.Component<AskForCardProps, AskForCardState> {
  constructor(props: AskForCardProps) {
    super(props);

    this.state = { desiredCard: "" };

    this.askForCard = this.askForCard.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Ask a Player for a Card</h1>
        <form>
          <select
            id="choose opponent"
            onChange={this.updatePlayerAskedState.bind(this)}
          >
            <option value="choose opponent">Select Opponent</option>
            <option
              value={this.props.opponents[0] ? this.props.opponents[0].id : 0}
            >
              {this.props.opponents[0] ? this.props.opponents[0].name : ""}
            </option>
            <option
              value={this.props.opponents[1] ? this.props.opponents[1].id : 0}
            >
              {this.props.opponents[1] ? this.props.opponents[1].name : ""}
            </option>
            <option
              value={this.props.opponents[2] ? this.props.opponents[2].id : 0}
            >
              {this.props.opponents[2] ? this.props.opponents[2].name : ""}
            </option>
          </select>
          <input
            placeholder="Card"
            type="text"
            id="card"
            value={this.state.desiredCard}
            onChange={this.updatedesiredCardState.bind(this)}
          />
          <Button variant="primary" size="lg" onClick={this.askForCard}>
            Ask for Card
          </Button>
        </form>
      </div>
    );
  }

  // sets the playerAsked state
  updatePlayerAskedState(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ opponentAsked: Number(event.target.value) });
  }

  // sets the desired card state
  updatedesiredCardState(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ desiredCard: event.target.value.toUpperCase() });
  }

  // uses the state to ask the player for the desired card
  askForCard() {
    // console.log({
    //   asking_id: this.props.playerID,
    //   asked_id: this.state.opponentAsked,
    //   card: this.state.desiredCard,
    //   room_id: this.props.roomID,
    // });
    if (this.props.playerName == this.props.currentTurn) {
      axios
        .put("/players", {
          asking_id: this.props.playerID,
          asked_id: this.state.opponentAsked,
          card: this.state.desiredCard,
          room_id: this.props.roomID,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          }
        });
    } else {
      alert("It is not your turn");
    }
    //@ts-ignore
    document.getElementById("card")!.value = "";
    //@ts-ignore
    document.getElementById("choose opponent")!.value = "choose opponent";
    this.setState({ desiredCard: "" });
  }
}

export default AskForCard;
