defmodule FishPhx.Cards do
  alias FishPhx.Players

  @cardmap %{
    "2-Hearts" => {0, 0},
    "3-Hearts" => {0, 1},
    "4-Hearts" => {0, 2},
    "5-Hearts" => {0, 3},
    "6-Hearts" => {0, 4},
    "7-Hearts" => {0, 5},
    "9-Hearts" => {1, 0},
    "10-Hearts" => {1, 1},
    "J-Hearts" => {1, 2},
    "Q-Hearts" => {1, 3},
    "K-Hearts" => {1, 4},
    "A-Hearts" => {1, 5},
    "2-Diamonds" => {2, 0},
    "3-Diamonds" => {2, 1},
    "4-Diamonds" => {2, 2},
    "5-Diamonds" => {2, 3},
    "6-Diamonds" => {2, 4},
    "7-Diamonds" => {2, 5},
    "9-Diamonds" => {3, 0},
    "10-Diamonds" => {3, 1},
    "J-Diamonds" => {3, 2},
    "Q-Diamonds" => {3, 3},
    "K-Diamonds" => {3, 4},
    "A-Diamonds" => {3, 5},
    "2-Spades" => {4, 0},
    "3-Spades" => {4, 1},
    "4-Spades" => {4, 2},
    "5-Spades" => {4, 3},
    "6-Spades" => {4, 4},
    "7-Spades" => {4, 5},
    "9-Spades" => {5, 0},
    "10-Spades" => {5, 1},
    "J-Spades" => {5, 2},
    "Q-Spades" => {5, 3},
    "K-Spades" => {5, 4},
    "A-Spades" => {5, 5},
    "2-Clubs" => {6, 0},
    "3-Clubs" => {6, 1},
    "4-Clubs" => {6, 2},
    "5-Clubs" => {6, 3},
    "6-Clubs" => {6, 4},
    "7-Clubs" => {6, 5},
    "9-Clubs" => {7, 0},
    "10-Clubs" => {7, 1},
    "J-Clubs" => {7, 2},
    "Q-Clubs" => {7, 3},
    "K-Clubs" => {7, 4},
    "A-Clubs" => {7, 5},
    "8-Hearts" => {8, 0},
    "8-Diamonds" => {8, 1},
    "8-Spades" => {8, 2},
    "8-Clubs" => {8, 3},
    "Black Joker" => {8, 4},
    "Red Joker" => {8, 5}
  }

  # sorts cards by halfsuit and order
  def sort_cards(cards) do
    Enum.sort(cards, fn card1, card2 -> order_two_cards(card1, card2) end)
  end

  def order_two_cards(card1, card2) do
    {suit1, order1} = Map.get(@cardmap, card1)
    {suit2, order2} = Map.get(@cardmap, card2)

    cond do
      suit1 < suit2 -> true
      suit1 > suit2 -> false
      true -> order1 < order2
    end
  end

  # return the cards that can be asked by a player with the given hand
  def player_can_ask_for_cards(hand) do
    halfsuits_in_hand(hand)
    # getting all the cards in all the halfsuits of each card in the hand
    |> Enum.flat_map(&get_cards_in_halfsuit_from_map/1)
    |> Enum.map(fn {card, _id} -> card end)
    # removing cards in the hand
    |> Enum.filter(fn card -> not Enum.member?(hand, card) end)
    |> sort_cards()
  end

  # returns all the cards in the specified halfsuitid
  def get_cards_in_halfsuit(halfsuit_id) do
    get_cards_in_halfsuit_from_map(halfsuit_id)
    |> Enum.map(fn {card, _id} -> card end)
    |> sort_cards()
  end

  def get_cards_in_halfsuit_from_map(halfsuit_id) do
    Enum.filter(@cardmap, fn {_card, {id, _order}} -> id == halfsuit_id end)
  end

  # returns a list of the halfsuit ids in the given hand
  def halfsuits_in_hand(hand) do
    Enum.map(hand, fn card -> elem(Map.get(@cardmap, card), 0) end)
    |> Enum.uniq()
  end

  # returns if all the cards currently exist in players hands in the current room
  def cards_are_in_play(room_id, cards) do
    List.foldr(cards, true, fn card, acc ->
      acc && is_card_in_play(room_id, card)
    end)
  end

  def is_card_in_play(room_id, card) do
    players_in_room = Players.get_players_in_room(room_id)
    hands_in_room = Enum.map(players_in_room, fn id -> Players.get_player!(id).hand end)
    IO.inspect(hands_in_room)

    List.foldr(hands_in_room, false, fn hand, acc ->
      IO.inspect(hand)
      acc || Enum.member?(hand, card)
    end)
  end

  # returns if the given hand has a card in the same halfsuit as the given card that is not the given card
  def can_ask_for_card(hand, card) do
    case Enum.member?(hand, card) do
      true ->
        false

      false ->
        has_same_halfsuit(hand, card)
    end
  end

  # determines if the given hand has a card in the same halfsuit as the given card
  def has_same_halfsuit(hand, card) do
    Enum.reduce(
      hand,
      false,
      fn card_in_hand, acc ->
        acc or in_same_halfsuit(card_in_hand, card)
      end
    )
  end

  # returns a boolean if the two given cards are mapped to the same halfsuit value in the module attribute map
  def in_same_halfsuit(card1, card2) do
    elem(Map.get(@cardmap, card1), 0) == elem(Map.get(@cardmap, card2), 0)
  end

  # returns whether all the given cards are in the same halfsuit
  def all_in_same_halfsuit([first_card | rest_of_hand]) do
    Enum.reduce(rest_of_hand, true, fn card, acc -> acc && in_same_halfsuit(first_card, card) end)
  end

  def get_shuffled_deck() do
    cards = Map.keys(@cardmap)
    Enum.shuffle(cards)
  end
end
