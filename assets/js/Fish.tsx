import React from "react";
import axios from "./axios";

import { Room, Team, Player } from "./data";
import Logo from "./components/Logo";
import JoinGame from "./components/JoinGame";
import PlayerPanel from "./components/PlayerPanel";
import ShowHand from "./components/ShowHand";
import ShowLastMove from "./components/ShowLastMove";
import ShowTurnName from "./components/ShowTurnName";
import AskForCard from "./components/AskForCard";
import MakeClaim from "./components/MakeClaim";

interface FishProps {}
interface FishState {
  player_id?: number;
  player_name?: string;
  hand: string[];
  room_id?: number;
  team_id?: number;
  room?: Room;

  cardsCanBeAskedFor: string[];

  team?: Team;
  teammates?: Player[];
  opponentTeam?: Team;
  opponents?: Player[];

  roomNames: string[];
}
class Fish extends React.Component<FishProps, FishState> {
  constructor(props: FishProps) {
    super(props);

    this.state = { roomNames: [], hand: [], cardsCanBeAskedFor: [] };
    this.setPlayerState = this.setPlayerState.bind(this);
    this.getAllRooms = this.getAllRooms.bind(this);
    this.updateHand = this.updateHand.bind(this);
    this.getTeam = this.getTeam.bind(this);
    this.getOpponentTeam = this.getOpponentTeam.bind(this);
    this.refreshState = this.refreshState.bind(this);
  }

  componentDidMount() {
    this.getAllRooms();

    setInterval(this.refreshState, 500);
  }

  refreshState() {
    this.getAllRooms();
    this.updateHand();
    this.getTeam();
    this.getOpponentTeam();
  }

  // updates the state with all the room names and the Room object of this app, if it exists
  getAllRooms() {
    axios.get("/rooms").then((res) => {
      const roomNames = res.data.map((room: Room) => room.name);
      this.setState({ roomNames });
      if (this.state.room_id) {
        const room = res.data.find(
          (room: Room) => room.id == this.state.room_id
        );
        this.setState({ room });
      }
    });
  }

  // updates the hand of this app's player
  updateHand() {
    if (this.state.player_id) {
      axios.get(`/players/${this.state.player_id}`).then((res) => {
        this.setState({ hand: res.data.hand });
      });

      axios.get(`/players/${this.state.player_id}/can_ask_for`).then((res) => {
        this.setState({ cardsCanBeAskedFor: res.data.can_ask_for });
      });
    }
  }

  // updates state with information related to the team of the app
  getTeam() {
    if (this.state.team_id) {
      axios.get(`/teams/${this.state.team_id}`).then((res) => {
        const team: Team = res.data;

        this.setState({ team });
      });

      axios.get(`/teams/${this.state.team_id}/players`).then((res) => {
        const teammates = res.data;
        this.setState({ teammates });
      });
    }
  }

  // updates state with information related to the opponent team of the app
  getOpponentTeam() {
    if (this.state.team_id) {
      const opponent_team_id =
        this.state.team_id % 2 == 0
          ? this.state.team_id - 1
          : this.state.team_id + 1;
      axios.get(`/teams/${opponent_team_id}`).then((res) => {
        const opponentTeam: Team = res.data;

        this.setState({ opponentTeam });
      });

      axios.get(`/teams/${opponent_team_id}/players`).then((res) => {
        const opponents = res.data;
        this.setState({ opponents });
      });
    }
  }

  displayJoinRoomPanel() {
    if (this.state.player_id == undefined) {
      return (
        <div className="game-information">
          <JoinGame
            roomNames={this.state.roomNames}
            setPlayerState={this.setPlayerState}
          />
        </div>
      );
    }
  }

  render() {
    //console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <Logo />
          {this.displayJoinRoomPanel()}
        </header>

        <div className="game-information">
          <div className="game-stat">
            <h1>Room: {this.state.room?.name}</h1>
          </div>
          <div className="game-stat">
            <PlayerPanel
              teammates={this.state.teammates ? this.state.teammates : []}
              teamScore={this.state.team ? this.state.team.claims.length : 0}
              opponents={this.state.opponents ? this.state.opponents : []}
              opponentScore={
                this.state.opponentTeam
                  ? this.state.opponentTeam.claims.length
                  : 0
              }
            />
          </div>
          <div className="game-stat">
            <ShowHand
              hand={this.state.hand}
              playerName={this.state.player_name}
            />
          </div>
          <div className="game-stat">
            <ShowLastMove move={this.state.room ? this.state.room.move : ""} />
          </div>
          <div className="game-stat">
            <ShowTurnName turn={this.state.room ? this.state.room.turn : ""} />
          </div>
        </div>

        <div>
          <AskForCard
            roomID={this.state.room?.id}
            currentTurn={this.state.room?.turn}
            playerID={this.state.player_id}
            playerName={this.state.player_name}
            opponents={this.state.opponents ? this.state.opponents : []}
            cardsCanBeAskedFor={this.state.cardsCanBeAskedFor}
          />
          <MakeClaim
            teamID={this.state.team_id}
            teammates={this.state.teammates ? this.state.teammates : []}
          />
        </div>
      </div>
    );
  }

  setPlayerState(player: Player) {
    this.setState({
      player_id: player.id,
      player_name: player.name,
      hand: player.hand,
      room_id: player.room_id,
      team_id: player.team_id,
    });
  }
}

export default Fish;
