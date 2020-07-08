defmodule FishPhxWeb.RoomController do
  use FishPhxWeb, :controller

  alias FishPhx.Rooms

  def make_room_map_from_changeset(room) do
    %{id: room.id, name: room.name, move: room.move, turn: room.turn}
  end

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    rooms = Enum.map(rooms, &make_room_map_from_changeset/1)
    json(conn, rooms)
  end

  def show(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    room = Map.merge(make_room_map_from_changeset(room), %{cards: room.cards})
    json(conn, room)
  end

  def create(conn, %{"name" => name}) do
    case Rooms.create_room(name) do
      :error -> json(conn, %{error: "duplicate room name, creation failed"})
      room -> json(conn, make_room_map_from_changeset(room))
    end
  end

  def delete(conn, %{"name" => name}) do
    Rooms.delete_room!(name)
    json(conn, %{message: "deleted room #{name}"})
  end
end
