defmodule FishPhx do
  @moduledoc """
  FishPhx keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  import Ecto.Query, warn: false
  alias FishPhx.Repo
  alias FishPhx.Players.Player
  alias FishPhx.Teams.Team
  alias FishPhx.Rooms.Room

  def clear_database do
    Repo.delete_all(Player)
    Repo.delete_all(Team)
    Repo.delete_all(Room)
  end
end
