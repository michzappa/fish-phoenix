defmodule FishPhxWeb.PlayerController do
  use FishPhxWeb, :controller

  alias FishPhx.Players
  alias FishPhx.Rooms
  alias FishPhx.Cards
  alias FishPhxWeb.RoomController

  defp make_player_map_from_changeset(player) do
    %{
      id: player.id,
      name: player.name,
      hand: player.hand,
      team_id: player.team_id,
      room_id: player.room_id
    }
  end

  def index(conn, _params) do
    players = Players.list_players()
    players = Enum.map(players, &make_player_map_from_changeset/1)
    json(conn, players)
  end

  def show(conn, %{"id" => id}) do
    player = Players.get_player!(id)
    player = make_player_map_from_changeset(player)
    json(conn, player)
  end

  def can_ask_for(conn, %{"id" => id}) do
    player = Players.get_player!(id)
    cards_can_ask_for = Cards.player_can_ask_for_cards(player.hand)
    json(conn, %{can_ask_for: cards_can_ask_for})
  end

  def team(conn, %{"id" => id}) do
    player_ids = Players.get_players_on_team(id)

    players =
      Enum.map(player_ids, fn id -> make_player_map_from_changeset(Players.get_player!(id)) end)

    json(conn, players)
  end

  def create(conn, %{"room_name" => room_name, "player_name" => player_name}) do
    case Rooms.add_player_to_room(room_name, player_name, false) do
      {:error, reason} -> json(conn, %{error: reason})
      player -> json(conn, make_player_map_from_changeset(player))
    end
  end

  def update(conn, %{
        "asking_id" => asking_id,
        "asked_id" => asked_id,
        "card" => card,
        "room_id" => room_id
      }) do
    case Players.check_if_asked_player_has_any_cards(asking_id, asked_id, card, room_id) do
      {:error, reason} -> json(conn, %{error: reason})
      {:ok, room} -> json(conn, RoomController.make_room_map_from_changeset(room))
    end
  end
end
