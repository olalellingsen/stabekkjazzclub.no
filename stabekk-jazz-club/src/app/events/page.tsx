import { db } from "@/firebaseAdmin";
import { EventCard } from "../components/EventCard";
import { EventProps } from "@/types";

export const revalidate = 60; // Revalidate data every 60 seconds (adjust as needed)

export default async function Events() {
  const querySnapshot = await db.collection("events").get();
  const events = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  }) as EventProps[];

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
      {upcomingEvents.length === 0 && (
        <p className="text-center">Ingen kommende konserter</p>
      )}
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
      <ul>
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
