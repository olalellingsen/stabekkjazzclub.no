import { db } from "@/firebaseAdmin";
import { EventProps } from "@/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function EventDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id: eventID } = params;

  try {
    const eventDoc = await db.collection("events").doc(eventID).get();

    if (!eventDoc) {
      return <p>Event not found</p>;
    }

    const eventData = eventDoc.data() as EventProps;
    const event = { ...eventData, id: eventDoc.id };

    function formatText(text: string) {
      return text.split("\n").map((line, index) => (
        <p className="mb-4" key={index} style={{ whiteSpace: "pre-line" }}>
          {line}
        </p>
      ));
    }

    return (
      <section className="max-w-screen-lg">
        <Link
          className="text-gray-600 dark:text-gray-400 underline hover:no-underline py-2 block"
          href="/events"
        >
          Tilbake til konserter
        </Link>
        <Image
          src={event.img || "/default-image.jpg"}
          alt={event.title}
          className="aspect-video object-cover"
          height={400}
          width={1000}
          placeholder="empty"
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
              kl{" "}
              {event.date.toDate().toLocaleTimeString("nb-NO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
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

        <p className="py-2">{formatText(event.description)}</p>
      </section>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return <p>Failed to load event</p>;
  }
}
