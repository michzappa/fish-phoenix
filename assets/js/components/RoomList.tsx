import React from "react";

interface RoomListProps {
  roomNames: string[];
}
interface RoomListState {}
class RoomList extends React.Component<RoomListProps, RoomListState> {
  constructor(props: RoomListProps) {
    super(props);

    this.processRoomsIntoList = this.processRoomsIntoList.bind(this);
  }
  render() {
    return (
      <div>
        Rooms:
        <ul>{this.processRoomsIntoList(this.props.roomNames)}</ul>
      </div>
    );
  }

  // returns an unordered list of all the rooms in the server,
  // from the prop which is a list of all these rooms
  processRoomsIntoList(roomNames: string[]): JSX.Element[] {
    let list: JSX.Element[] = [];
    // try {
    roomNames.forEach((room, index) => {
      list.push(<li key={index}>{room}</li>);
    });
    return list;
    // } catch (err) {
    //   console.log(err);
    // }
  }
}

export default RoomList;
