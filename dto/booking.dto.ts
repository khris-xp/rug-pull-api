export type BookingDto = {
  user: string;
  board_game_id: string;
  room_id: string;
  table_id: string;
  start_time: Date;
  end_time: Date;
  status: string;
  duration: number;
  amount_player: number;
  total_price: number;
};
