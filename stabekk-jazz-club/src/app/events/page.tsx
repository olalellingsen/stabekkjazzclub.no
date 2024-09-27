"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    return (
      <div className="flex justify-center pt-20">
        <BeatLoader color="#075985" loading={loading} size={20} />
      </div>
    );
  }

  if (error) {
    notFound(); // Show a 404 page if the event is not found
  }

  return (
    <section>
      <h1 className="text-center">Kommende konserter</h1>
      <br />
      <ul className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard {...event} />
          </li>
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
    <div className="rounded-lg overflow-hidden bg-white dark:bg-sky-950">
      <Link href={`/events/${id}`}>
        <img
          src={img}
          alt={title}
          className="aspect-video object-cover hover:scale-[102%] transition-transform duration-200"
        />
      </Link>

      <div className="p-4 grid gap-2">
        <h2>{title}</h2>
        <h2>
          {date.toDate().toLocaleDateString("nb-NO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          kl {date.toDate().toLocaleTimeString().slice(0, 5)}
        </h2>
        <p>
          <Link href={venueLink} target="_blank">
            {venue}
          </Link>
        </p>
        <div className="flex justify-between pt-2">
          <Link href={tickets} target="blank">
            <button className="btn1">Billetter</button>
          </Link>
          <Link href={`/events/${id}`} className="pt-5">
            Les mer
          </Link>
        </div>
      </div>
    </div>
  );
}
