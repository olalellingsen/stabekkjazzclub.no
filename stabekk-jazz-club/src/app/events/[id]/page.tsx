import { db } from "../../../firebase"; // Adjust the path to your Firebase setup
import { doc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { notFound } from "next/navigation"; // Next.js built-in function for 404
import React from "react";

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

async function getEventById(id: string) {
  const docRef = doc(db, "events", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as EventProps;
  } else {
    return null;
  }
}

export default async function EventDetails({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound(); // Show a 404 page if the event is not found
  }

  return (
    <section className="container">
      <img
        src={event.img}
        alt={event.title}
        className="aspect-video object-cover"
      />
      <div className="py-4 grid gap-4">
        <h1>{event.title}</h1>

        <h1>
          {event.date.toDate().toLocaleDateString()} kl.
          {event.date.toDate().toLocaleTimeString().slice(0, 5)}
        </h1>

        <p>
          <a href={event.venueLink} target="_blank" rel="noopener noreferrer">
            {event.venue}
          </a>
        </p>

        <div>
          <Link href={event.tickets} target="_blank" className="">
            <button className="btn1">Billetter</button>
          </Link>
        </div>

        <p>{event.description}</p>
      </div>
    </section>
  );
}
