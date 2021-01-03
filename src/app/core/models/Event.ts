export interface Event {
  id: number;

  description: string;

  startAt: string;
  endAt: string;
}
export interface EventForm {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
