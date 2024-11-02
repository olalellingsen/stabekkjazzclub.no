import { db } from "@/firebaseAdmin";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { EventCard } from "../components/EventCard";

export interface EventProps {
  id: string;
  title: string;
  date: Timestamp;
  description: string;
  tickets: string;
  venue: string;
  venueLink: string;
  img?: string;
}

async function Events() {
  const querySnapshot = await db.collection("events").get();
  const events = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as EventProps[];

  const upcomingEvents = events
    .filter((event) => event.date.toDate() > new Date())
    .sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());

  const previousEvents = events
    .filter((event) => event.date.toDate() < new Date())
    .sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());

  return (
    <section>
      <h1 className="text-center">Kommende konserter</h1>
      <br />
      <ul className="grid gap-4 sm:grid-cols-2">
        {upcomingEvents.map((event) => (
          <li key={event.id}>
            <EventCard {...event} />
          </li>
        ))}
      </ul>
      <br />
      <br />

      <h2>Tidligere konserter</h2>
      <ul className="">
        {previousEvents.map((event) => (
          <li
            key={event.id}
            className="flex flex-wrap gap-4 border-b border-gray-7 my-2"
          >
            <p>{event.date.toDate().toLocaleDateString()}</p>
            <p>{event.title}</p>
          </li>
        ))}
      </ul>
      <br />
    </section>
  );
}

export default Events;
