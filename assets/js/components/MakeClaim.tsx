import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../data";
import axios from "../axios";
import { Multiselect } from "multiselect-react-dropdown";

interface MakeClaimProps {
  teamID?: number;
  teammates: Player[];
}

interface MakeClaimState {
  teammate1Cards: string[];
  teammate2Cards: string[];
  teammate3Cards: string[];

  selectedHalfsuit?: number;
  selectedHalfsuitCards: string[];
  unselectedHalfsuitCards: string[];
}

class MakeClaim extends React.Component<MakeClaimProps, MakeClaimState> {
  constructor(props: MakeClaimProps) {
    super(props);

    this.state = {
      teammate1Cards: [],
      teammate2Cards: [],
      teammate3Cards: [],
      selectedHalfsuitCards: [],
      unselectedHalfsuitCards: [],
    };

    this.makeClaim = this.makeClaim.bind(this);
    this.updateDropDownTeammate1 = this.updateDropDownTeammate1.bind(this);
    this.updateDropDownTeammate2 = this.updateDropDownTeammate2.bind(this);
    this.updateDropDownTeammate3 = this.updateDropDownTeammate3.bind(this);
    this.unselectedHalfsuitOptions = this.unselectedHalfsuitOptions.bind(this);
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
      options.push(
        <option id={String(value)} value={value}>
          {key}
        </option>
      );
    });
    return options;
  }

  //@ts-ignore
  updateDropDownTeammate1(selectedList, changedItem) {
    console.log(selectedList, changedItem);
    this.setState({ teammate1Cards: selectedList });
    this.unselectedHalfsuitOptions();
  }

  //@ts-ignore
  updateDropDownTeammate2(selectedList, changedItem) {
    console.log(selectedList, changedItem);
    this.setState({ teammate2Cards: selectedList });
    this.unselectedHalfsuitOptions();
  }
  //@ts-ignore
  updateDropDownTeammate3(selectedList, changedItem) {
    console.log(selectedList, changedItem);
    this.setState({ teammate3Cards: selectedList });
    this.unselectedHalfsuitOptions();
  }

  unselectedHalfsuitOptions() {
    const options = this.state.selectedHalfsuitCards.filter((card) => {
      return !(
        this.state.teammate1Cards.includes(card) ||
        this.state.teammate2Cards.includes(card) ||
        this.state.teammate3Cards.includes(card)
      );
    });

    this.setState({ unselectedHalfsuitCards: options });
  }

  render() {
    return (
      <div>
        <h1>
          Select the halfsuit of your claim,<br></br> then select the cards for
          each player
        </h1>
        <select
          id="choose halfsuit"
          onChange={this.setSelectedHalfSuitState.bind(this)}
        >
          <option id="choose halfsuit option" value="choose halfsuit">
            Choose Halfsuit
          </option>
          {this.generateHalfSuitOptions()}
        </select>
        <div className="claim-dropdowns">
          <div>
            <label htmlFor="name1">
              {this.props.teammates[0] ? this.props.teammates[0].name : ""}
            </label>
            <Multiselect
              options={this.state.unselectedHalfsuitCards}
              isObject={false}
              onSelect={this.updateDropDownTeammate1}
              onRemove={this.updateDropDownTeammate1}
            />
          </div>
          <div>
            <label htmlFor="name2">
              {this.props.teammates[1] ? this.props.teammates[1].name : ""}
            </label>
            <Multiselect
              options={this.state.unselectedHalfsuitCards}
              isObject={false}
              onSelect={this.updateDropDownTeammate2}
              onRemove={this.updateDropDownTeammate2}
            />
          </div>

          <div>
            <label htmlFor="name3">
              {this.props.teammates[2] ? this.props.teammates[2].name : ""}
            </label>
            <Multiselect
              options={this.state.unselectedHalfsuitCards}
              isObject={false}
              onSelect={this.updateDropDownTeammate3}
              onRemove={this.updateDropDownTeammate3}
            />
          </div>
          <Button variant="primary" size="lg" onClick={this.makeClaim}>
            Submit Claim
          </Button>
        </div>
      </div>
    );
  }

  // sets the state for the selected halfsuit
  setSelectedHalfSuitState(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      selectedHalfsuit: Number(event.target.value),
    });
    axios.get(`/cards/${event.target.value}`).then((res) => {
      this.setState({
        selectedHalfsuitCards: res.data.cards,
        unselectedHalfsuitCards: res.data.cards,
      });
    });
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

      console.log(playerCardMap);
      axios
        .put(`/teams/${this.props.teamID}`, {
          player_card_map: playerCardMap,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          }
        });
    }
    this.setState({
      teammate1Cards: [],
      teammate2Cards: [],
      teammate3Cards: [],
    });
  }
}

export default MakeClaim;
