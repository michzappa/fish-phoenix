defmodule FishPhx.Repo do
  use Ecto.Repo,
    otp_app: :fish_phx,
    adapter: Ecto.Adapters.Postgres
end
