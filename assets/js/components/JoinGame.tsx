import React from "react";
import { Button } from "react-bootstrap";
import axios from "../axios";

interface JoinGameProps {
  setPlayerState: Function;
}

interface JoinGameState {
  roomToBeMade: string;
  roomToBeJoined: string;
  joiningPlayerName: string;
}
export default class JoinGame extends React.Component<
  JoinGameProps,
  JoinGameState
> {
  constructor(props: JoinGameProps) {
    super(props);
    this.state = {
      roomToBeMade: "",
      roomToBeJoined: "",
      joiningPlayerName: "",
    };

    this.addRoomClick = this.addRoomClick.bind(this);
    this.deleteRoomClick = this.deleteRoomClick.bind(this);
    this.joinRoomClick = this.joinRoomClick.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <input
              placeholder="Room Name"
              type="text"
              name="Room name"
              value={this.state.roomToBeMade}
              onChange={this.updateRoomToBeMadeState.bind(this)}
            />
            <Button variant="primary" size="lg" onClick={this.addRoomClick}>
              Add Room
            </Button>
            <Button variant="primary" size="lg" onClick={this.deleteRoomClick}>
              Delete Room
            </Button>
          </form>
        </div>
        <div>
          <form>
            <input
              placeholder="Room Name"
              type="text"
              name="Room name"
              value={this.state.roomToBeJoined}
              onChange={this.updateJoiningRoomState.bind(this)}
            />
            <input
              placeholder="Player Name"
              type="text"
              name="Player name"
              value={this.state.joiningPlayerName}
              onChange={this.updateJoiningPlayerState.bind(this)}
            />
            <Button variant="primary" size="lg" onClick={this.joinRoomClick}>
              Submit
            </Button>
          </form>
        </div>
        <div></div>
      </div>
    );
  }

  updateRoomToBeMadeState(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ roomToBeMade: event.target.value });
  }

  updateJoiningRoomState(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ roomToBeJoined: event.target.value });
  }

  updateJoiningPlayerState(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ joiningPlayerName: event.target.value });
  }

  // posts the room represented by the state of this component
  addRoomClick() {
    if (this.state.roomToBeMade !== "" && this.state.roomToBeMade !== null) {
      axios
        .post("/rooms/", {
          name: this.state.roomToBeMade,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          }
          this.setState({
            roomToBeMade: "",
            roomToBeJoined: "",
            joiningPlayerName: "",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // deletes the room represented by the state of this component
  deleteRoomClick() {
    axios
      .delete(`/rooms/${this.state.roomToBeMade}`)
      .then((res) => {
        this.setState({
          roomToBeMade: "",
          roomToBeJoined: "",
          joiningPlayerName: "",
        });
      })
      .catch((err) => console.log(err));
  }

  // posts the player to the room represented by the state of this component, if it
  // is not already full
  joinRoomClick() {
    let roomName = this.state.roomToBeJoined;
    let playerName = this.state.joiningPlayerName;

    if (roomName && playerName) {
      axios
        .post("/players/", {
          room_name: this.state.roomToBeJoined,
          player_name: this.state.joiningPlayerName,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            this.props.setPlayerState(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }
}
