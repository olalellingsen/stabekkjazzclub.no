"use client";

import { db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

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

export default function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on client side when component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventProps[];

        // Filter and sort events by date
        const upcomingEvents = eventsData
          .filter((event) => event.date.toDate() > new Date())
          .sort(
            (a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
          );

        setEvents(upcomingEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <BeatLoader color="#0c4a6e" loading={loading} size={20} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>; // Error state
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

// Component to display individual event cards
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
        <Image
          src={img || "/default-image.jpg"}
          alt={title}
          className="aspect-video object-cover hover:scale-[102%] transition-transform duration-200"
          height={400}
          width={800}
          placeholder="empty"
        />
      </Link>

      <div className="p-4 grid gap-2">
        <h2>{title}</h2>
        <h2>
          {new Date(date.toDate().toISOString()).toLocaleDateString("nb-NO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          kl{" "}
          {new Date(date.toDate().toISOString()).toLocaleTimeString("nb-NO", {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
