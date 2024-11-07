import { useEffect, useState } from "react";
import { db } from "@/firebase";
import Image from "next/image";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import ConfirmationModal from "../components/ConfirmationModal";
import EditEventForm from "./EditEventForm";
import { EventProps } from "@/types";

export default function AdminEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventProps | null>(null);
  const [addNewEvent, setAddNewEvent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventProps[];
        setEvents(
          eventsData
            .filter((event) => event.date.seconds > Date.now() / 1000)
            .sort((a, b) => a.date.seconds - b.date.seconds)
        );
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Add a new event
  const handleAddEvent = async (newEvent: Omit<EventProps, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "events"), newEvent);
      setEvents([...events, { id: docRef.id, ...newEvent }]);
      setAddNewEvent(false);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  // Update an existing event
  const handleUpdateEvent = async (updatedEvent: EventProps) => {
    try {
      const docRef = doc(db, "events", updatedEvent.id);
      const { ...eventWithoutId } = updatedEvent;
      await updateDoc(docRef, eventWithoutId);
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((event) => event.id !== id));
      setModalOpen(false);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const confirmDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setModalOpen(true);
  };

  // Handle event edit
  const handleEditClick = (event: EventProps) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditingEvent(event);
    setAddNewEvent(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button className="btn1" onClick={() => setAddNewEvent(true)}>
        Legg til konsert
      </button>
      <section>
        {editingEvent && (
          <EditEventForm
            event={editingEvent}
            onSave={(updatedEvent) =>
              handleUpdateEvent(updatedEvent as EventProps)
            }
            onCancel={() => setEditingEvent(null)}
          />
        )}
        {addNewEvent && (
          <EditEventForm
            event={{
              title: "",
              date: Timestamp.now(),
              description: "",
              tickets: "",
              venue: "",
              venueLink: "",
              img: "",
            }}
            onSave={(newEvent) => handleAddEvent(newEvent)}
            onCancel={() => setAddNewEvent(false)}
          />
        )}
      </section>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDeleteEvent(eventToDelete!)}
      />
      <br />
      <h2>Kommende konserter</h2>
      <div className="grid sm:grid-cols-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="m-2 rounded-lg overflow-hidden bg-white dark:bg-sky-950 flex flex-col justify-between"
          >
            <Image
              src={event.img || "/default-image.jpg"}
              alt={event.title}
              className="aspect-video object-cover"
              width={500}
              height={225}
            />
            <div className="p-2">
              <h3>{event.title}</h3>
              <p>
                {new Date(event.date.toDate().toISOString()).toLocaleDateString(
                  "nb-NO",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}{" "}
                kl{" "}
                {new Date(event.date.toDate().toISOString()).toLocaleTimeString(
                  "nb-NO",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
              <button className="btn1" onClick={() => handleEditClick(event)}>
                Rediger
              </button>
              <button
                className="btn2"
                onClick={() => confirmDeleteEvent(event.id)}
              >
                Slett
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
