import { EventProps } from "../events/page";
import Link from "next/link";
import Image from "next/image";

// Component to display individual event cards
export function EventCard({
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
