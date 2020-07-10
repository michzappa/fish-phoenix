defmodule FishPhxWeb.CardController do
  use FishPhxWeb, :controller

  alias FishPhx.Cards
  # sends back json of all the cards in the given halfsuitID
  def show(conn, %{"id" => id}) do
    cards = Cards.get_cards_in_halfsuit(String.to_integer(id))
    json(conn, %{cards: cards})
  end
end
