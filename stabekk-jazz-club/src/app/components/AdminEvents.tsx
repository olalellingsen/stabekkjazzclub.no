import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import ConfirmationModal from "./ConfirmationModal";

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

// Component for the admin page
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
        setEvents(eventsData.sort((a, b) => a.date.seconds - b.date.seconds));
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
      const { id, ...eventWithoutId } = updatedEvent;
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
    setEditingEvent(event);
    setAddNewEvent(false); // Make sure we are not in "Add New" mode when editing
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="m-2 rounded-lg overflow-hidden bg-white dark:bg-sky-950"
          >
            <img
              src={event.img}
              alt={event.title}
              className="aspect-video object-cover"
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

// Edit Event Form Component
function EditEventForm({
  event,
  onSave,
  onCancel,
}: {
  event: EventProps | Omit<EventProps, "id">;
  onSave: (updatedEvent: EventProps | Omit<EventProps, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    ...event,
    date: new Date(
      event.date instanceof Timestamp ? event.date.toDate() : event.date
    )
      .toLocaleString("sv-SE", { timeZone: "Europe/Oslo" })
      .replace(" ", "T"), // Convert to local time and format for <input>
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Convert the date string back to a Firestore Timestamp before saving
    const updatedEvent = {
      ...formData,
      date: Timestamp.fromDate(new Date(formData.date)), // convert the string date back to Timestamp
    };
    onSave(updatedEvent);
    onCancel();
  };

  return (
    <section className="grid p-4 my-4 bg-gray-4 dark:bg-sky-950 rounded-lg">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tittel"
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className=""
      />
      <input
        type="text"
        name="venue"
        value={formData.venue}
        onChange={handleChange}
        placeholder="Konsertsted/Scene"
      />
      <input
        type="text"
        name="venueLink"
        value={formData.venueLink}
        onChange={handleChange}
        placeholder="Google Maps link til Konsertsted/Scene"
      />
      <input
        type="text"
        name="tickets"
        value={formData.tickets}
        onChange={handleChange}
        placeholder="Link til billetter"
      />
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
        placeholder="Link til bilde"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Beskrivelse"
        className="h-32"
      />

      <div className="flex flex-wrap">
        <button className="btn1" onClick={handleSubmit}>
          Lagre
        </button>
        <button className="btn2" onClick={onCancel}>
          Avbryt
        </button>
      </div>
    </section>
  );
}
