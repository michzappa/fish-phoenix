defmodule FishPhx.TeamController do
  use FishPhxWeb, :controller
  alias FishPhx.Teams

  defp make_team_map_from_changeset(team) do
    %{id: team.id, claims: team.claims, room_id: team.room_id}
  end

  def index(conn, _params) do
    teams = Teams.list_teams()
    teams = Enum.map(teams, &make_team_map_from_changeset/1)
    json(conn, teams)
  end

  def show(conn, %{"id" => id}) do
    team = Teams.get_team!(id)
    team = make_team_map_from_changeset(team)
    json(conn, team)
  end

  def update(conn, %{"id" => id, "player_card_map" => player_card_map}) do
    IO.inspect(player_card_map)

    case Teams.make_claim(id, player_card_map) do
      :not_in_play -> json(conn, %{error: "the specified cards are not all in play"})
      :invalid -> json(conn, %{error: "invalid claim"})
      {:ok, team} -> json(conn, make_team_map_from_changeset(team))
    end
  end
end
