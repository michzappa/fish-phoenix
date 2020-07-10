import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../data";
import axios from "../axios";

interface MakeClaimProps {
  teamID?: number;
  teammates: Player[];
}

interface MakeClaimState {
  teammate1Cards: string[];
  teammate2Cards: string[];
  teammate3Cards: string[];

  selectedHalfsuit?: number;
}
class MakeClaim extends React.Component<MakeClaimProps, MakeClaimState> {
  constructor(props: MakeClaimProps) {
    super(props);

    this.state = { teammate1Cards: [], teammate2Cards: [], teammate3Cards: [] };

    this.makeClaim = this.makeClaim.bind(this);
  }

  claimNameIDMap = new Map<string, number>([
    ["Low Hearts", 0],
    ["High Hearts", 1],
    ["Low Diamonds", 2],
    ["High Diamonds", 3],
    ["Low Spades", 4],
    ["High Spades", 5],
    ["Low Clubs", 6],
    ["High Clubs", 7],
    ["Eights and Jokers", 8],
  ]);

  generateHalfSuitOptions(): JSX.Element[] {
    const options: JSX.Element[] = [];
    this.claimNameIDMap.forEach((value, key) => {
      options.push(<option value={value}>{key}</option>);
    });
    return options;
  }

  render() {
    return (
      <div>
        <h1>
          Make Claim, enter cards for each teammate<br></br> separated by commas
        </h1>
        <select
          id="choose halfsuit"
          onChange={this.setSelectedHalfSuitState.bind(this)}
        >
          <option value="choose halfsuit">Choose Halfsuit</option>
          {this.generateHalfSuitOptions()}
        </select>
        <form>
          <label htmlFor="name1">
            {this.props.teammates[0] ? this.props.teammates[0].name : ""}
          </label>
          <input
            placeholder="cards"
            type="text"
            id="name1"
            value={this.state.teammate1Cards}
            onChange={this.setTeammate1ClaimState.bind(this)}
          />
          <label htmlFor="name2">
            {this.props.teammates[1] ? this.props.teammates[1].name : ""}
          </label>
          <input
            placeholder="cards"
            type="text"
            id="name2"
            value={this.state.teammate2Cards}
            onChange={this.setTeammate2ClaimState.bind(this)}
          />
          <label htmlFor="name3">
            {this.props.teammates[2] ? this.props.teammates[2].name : ""}
          </label>
          <input
            placeholder="cards"
            type="text"
            id="name3"
            value={this.state.teammate3Cards}
            onChange={this.setTeammate3ClaimState.bind(this)}
          />
          <Button variant="primary" size="lg" onClick={this.makeClaim}>
            Submit Claim
          </Button>
        </form>
      </div>
    );
  }

  // sets the state for the selected halfsuit
  setSelectedHalfSuitState(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedHalfsuit: Number(event.target.value) });
  }
  // sets a state for the cards claimed to be had by teammate 1
  setTeammate1ClaimState(event: React.ChangeEvent<HTMLInputElement>) {
    let listOfCards = event.target.value.toUpperCase().split(/,[\s]*/);
    this.setState({ teammate1Cards: listOfCards });
  }

  // sets a state for the cards claimed to be had by teammate 2
  setTeammate2ClaimState(event: React.ChangeEvent<HTMLInputElement>) {
    let listOfCards = event.target.value.toUpperCase().split(/,[\s]*/);
    this.setState({ teammate2Cards: listOfCards });
  }

  // sets a state for the cards claimed to be had by teammate 3
  setTeammate3ClaimState(event: React.ChangeEvent<HTMLInputElement>) {
    let listOfCards = event.target.value.toUpperCase().split(/,[\s]*/);
    this.setState({ teammate3Cards: listOfCards });
  }

  // takes the cards claimed in the state and attempts to make the claim,
  // if it is a good claim the cards are removed from the players' hands
  // and added to this team's claims tally
  makeClaim() {
    if (this.props.teammates.length == 3) {
      const claimSubmission = new Map<Number, string[]>();

      claimSubmission.set(
        this.props.teammates[0].id,
        this.state.teammate1Cards
      );
      claimSubmission.set(
        this.props.teammates[1].id,
        this.state.teammate2Cards
      );
      claimSubmission.set(
        this.props.teammates[2].id,
        this.state.teammate3Cards
      );
      //console.log(claimSubmission);

      const playerCardMap = Object.fromEntries(claimSubmission);
      //console.log(playerCardMap);

      axios
        .put(`/teams/${this.props.teamID}`, {
          player_card_map: playerCardMap,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            alert("Good claim!");
          }
        });
    }
    //@ts-ignore
    document.getElementById("name1")!.value = "";
    //@ts-ignore
    document.getElementById("name2")!.value = "";
    //@ts-ignore
    document.getElementById("name3")!.value = "";
    this.setState({
      teammate1Cards: [],
      teammate2Cards: [],
      teammate3Cards: [],
    });
  }
}

export default MakeClaim;
