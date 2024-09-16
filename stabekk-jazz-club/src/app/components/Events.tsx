import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

interface EventProps {
  id: string;
  title: string;
  date: Timestamp;
  description: string;
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

        setEvents(data); // Update the events state
      } catch (error) {
        console.error("Error fetching events: ", error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
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
    <section>
      <h2>Kommende konserter</h2>
      <ul className="grid gap-2">
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.date.toDate().toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Events;
