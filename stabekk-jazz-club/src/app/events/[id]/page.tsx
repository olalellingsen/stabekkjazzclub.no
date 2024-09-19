import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <section className="max-w-screen-lg">
      <Link
        className="text-body-color underline hover:no-underline py-2 block"
        href="/events"
      >
        Tilbake til konserter
      </Link>
      <img
        src={event.img}
        alt={event.title}
        className="aspect-video object-cover"
      />
      <div className="grid md:flex justify-between">
        <div className="grid gap-2 py-2 md:py-4">
          <h1>{event.title}</h1>
          <h1>
            {event.date.toDate().toLocaleDateString("nb-NO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            kl {event.date.toDate().toLocaleTimeString().slice(0, 5)}
          </h1>

          <Link
            className="text-xl"
            href={event.venueLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.venue}
          </Link>
        </div>

        <div className="py-2 md:py-4">
          <Link href={event.tickets} target="_blank" className="">
            <button className="btn1">Billetter</button>
          </Link>
        </div>
      </div>

      <p className="py-2">{event.description}</p>
    </section>
  );
}
