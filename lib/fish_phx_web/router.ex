defmodule FishPhxWeb.Router do
  use FishPhxWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", FishPhxWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/rooms", FishPhxWeb do
    pipe_through :api

    get "/", RoomController, :index
    get "/:id", RoomController, :show
    post "/", RoomController, :create
    delete "/:name", RoomController, :delete
  end

  scope "/teams", FishPhxWeb do
    pipe_through :api

    get "/", TeamController, :index
    get "/:id", TeamController, :show
    get "/:id/players", PlayerController, :team
    put "/:id", TeamController, :update
  end

  scope "/players", FishPhxWeb do
    pipe_through :api

    get "/", PlayerController, :index
    get "/:id", PlayerController, :show
    post "/", PlayerController, :create
    put "/", PlayerController, :update
  end

  # Other scopes may use custom stacks.
  # scope "/api", FishPhxWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: FishPhxWeb.Telemetry
    end
  end
end
