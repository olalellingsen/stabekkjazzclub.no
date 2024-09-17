"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

interface EventProps {
  id: string;
  title: string;
  date: Timestamp;
  description: string;
  tickets: string;
  venue: string;
  venueLink: string;
  img?: string;
}

function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the "events" collection
        const querySnapshot = await getDocs(collection(db, "events"));

        // Map through the data and ensure it conforms to EventProps
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Add the document ID
          ...doc.data(),
        })) as EventProps[];

        setEvents(
          data
            .filter((event) => event.date.toDate() > new Date()) // Filter out past events
            .sort(
              (a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
            ) // Sort by date
        );
      } catch (error) {
        console.error("Error fetching events: ", error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Display the error message if there's an error
  }

  return (
    <section className="container mx-auto">
      <h1 className="text-center">Kommende konserter</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard {...event} />
        ))}
      </ul>
    </section>
  );
}

export default Events;

function EventCard({
  id,
  img,
  title,
  date,
  venue,
  venueLink,
  tickets,
}: EventProps) {
  return (
    <li
      key={id}
      className="rounded-lg overflow-hidden bg-white dark:bg-sky-950"
    >
      <a href={`/events/${id}`}>
        <img
          src={img}
          alt={title}
          className="aspect-video object-cover hover:scale-[101%]"
        />
      </a>

      <div className="p-4 grid gap-2">
        <h2>{title}</h2>
        <p>
          {date.toDate().toLocaleDateString()} kl{" "}
          {date.toDate().toLocaleTimeString().slice(0, 5)}
        </p>
        <p>
          <a href={venueLink} target="_blank">
            {venue}
          </a>
        </p>
        <div className="flex justify-between pt-2">
          <a href={tickets} target="blank">
            <button className="btn1">Billetter</button>
          </a>
          <a href={`/events/${id}`} className="pt-5">
            Les mer
          </a>
        </div>
      </div>
    </li>
  );
}
