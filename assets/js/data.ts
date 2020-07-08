export class Player {
  id!: number;
  name!: string;
  hand!: string[];
  team_id!: number;
  room_id!: number;
}

export class Team {
  id!: number;
  claims!: string[];
  room_id!: number;
}

export class Room {
  id!: number;
  name!: string;
  cards!: string[];
  move!: string;
  turn!: string;
}
