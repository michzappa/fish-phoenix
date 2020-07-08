defmodule FishPhxWeb.PageController do
  use FishPhxWeb, :controller

  plug :put_layout, "app.html"

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
