"use client";

import { db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
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
