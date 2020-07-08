defmodule FishPhxWeb.PageController do
  use FishPhxWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
