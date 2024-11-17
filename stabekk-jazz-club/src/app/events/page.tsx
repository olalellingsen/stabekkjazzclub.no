import { db } from "@/firebaseAdmin";
import React from "react";
import { EventCard } from "../components/EventCard";
import { EventProps } from "@/types";

async function Events() {
  "use client";
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
            <p>
              {event.date.toDate().toLocaleDateString("nb-NO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>{event.title}</p>
          </li>
        ))}
      </ul>
      <br />
    </section>
  );
}

export default Events;
