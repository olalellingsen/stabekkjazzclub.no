import { Timestamp } from "firebase/firestore";

export type EventProps = {
  id: string;
  title: string;
  date: Timestamp;
  description: string;
  tickets: string;
  venue: string;
  venueLink: string;
  img?: string;
};
