# FishPhoenix

The backend for my fish project rewritten in Elixir and the Phoenix Web Framework.

Endpoints:

- GET /rooms - all rooms
- GET /rooms/:id - room with given id
- POST /rooms - adds room with {name} as request body
- DELETE /rooms/:name - deletes room with given name, deletes teams and players in room as well.
- GET /teams - all teams
- GET /teams/:id - team with given id
- PUT /teams/:id - updates the claims of the specified team, body is {player_id: [array of cards as strings], ...} for each player on the team
- GET /players - all players
- GET /players/:id - player with given id
- POST /players - adds player with request body {room_name, player_name}
- PUT /players - attempts to exchange card between players with request body
  {asking_id, asked_id, card, room_id}

To start your Phoenix server:

- Install postgres on your machine
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Install Node.js dependencies with `npm install` inside the `assets` directory
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

