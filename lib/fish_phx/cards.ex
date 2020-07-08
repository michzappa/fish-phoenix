defmodule FishPhx.Cards do
  alias FishPhx.Players

  @cardmap %{
    "2-H" => 0,
    "3-H" => 0,
    "4-H" => 0,
    "5-H" => 0,
    "6-H" => 0,
    "7-H" => 0,
    "9-H" => 1,
    "10-H" => 1,
    "J-H" => 1,
    "Q-H" => 1,
    "K-H" => 1,
    "A-H" => 1,
    "2-D" => 2,
    "3-D" => 2,
    "4-D" => 2,
    "5-D" => 2,
    "6-D" => 2,
    "7-D" => 2,
    "9-D" => 3,
    "10-D" => 3,
    "J-D" => 3,
    "Q-D" => 3,
    "K-D" => 3,
    "A-D" => 3,
    "2-S" => 4,
    "3-S" => 4,
    "4-S" => 4,
    "5-S" => 4,
    "6-S" => 4,
    "7-S" => 4,
    "9-S" => 5,
    "10-S" => 5,
    "J-S" => 5,
    "Q-S" => 5,
    "K-S" => 5,
    "A-S" => 5,
    "2-C" => 6,
    "3-C" => 6,
    "4-C" => 6,
    "5-C" => 6,
    "6-C" => 6,
    "7-C" => 6,
    "9-C" => 7,
    "10-C" => 7,
    "J-C" => 7,
    "Q-C" => 7,
    "K-C" => 7,
    "A-C" => 7,
    "8-H" => 8,
    "8-D" => 8,
    "8-S" => 8,
    "8-C" => 8,
    "B-J" => 8,
    "R-J" => 8
  }

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
    Map.fetch!(@cardmap, card1) == Map.fetch!(@cardmap, card2)
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
