"use client";

import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function EventDetails({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter(); // To redirect for 404

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() } as EventProps);
        } else {
          router.push("/404"); // Redirect to 404 if event not found
        }
      } catch (error) {
        console.error("Error fetching event: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <BeatLoader color="#0c4a6e" loading={loading} size={20} />
      </div>
    );
  }

  if (error || !event) {
    return <p>Error loading event...</p>;
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

      <p className="py-2">{event.description}</p>
    </section>
  );
}
