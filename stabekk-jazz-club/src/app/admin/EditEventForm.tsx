import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { EventProps } from "@/types";

export default function EditEventForm({
  event,
  onSave,
  onCancel,
}: {
  event: EventProps | Omit<EventProps, "id">;
  onSave: (updatedEvent: EventProps | Omit<EventProps, "id">) => void;
  onCancel: () => void;
}) {
  const initialDate =
    event.date instanceof Timestamp
      ? new Date(
          event.date.toDate().getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16) // Format for datetime-local with local offset
      : event.date;

  const [formData, setFormData] = useState({
    ...event,
    date: initialDate, // Initialize date in correct format for <input>
  });

  const [newImage, setNewImage] = useState<File | null>(null);

  // Handle image upload
  async function handleImageUpload(file: File) {
    if (!file) return formData.img || ""; // Use existing image if no file selected
    const storageRef = ref(storage, `events/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      let imageUrl = formData.img || "";
      if (newImage) {
        imageUrl = await handleImageUpload(newImage);
      }

      const updatedEvent = {
        ...formData,
        date: Timestamp.fromDate(new Date(formData.date)),
        img: imageUrl,
      };

      onSave(updatedEvent);
      onCancel();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <section className="grid p-4 my-4 bg-gray-4 dark:bg-sky-950 rounded-lg even:*:mb-4">
      <p>Tittel</p>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <p>Dato og tid</p>
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <p>Konsertsted/Scene</p>
      <input
        type="text"
        name="venue"
        value={formData.venue}
        onChange={handleChange}
      />
      <p>Google Maps-link til Konsertsted/Scene</p>
      <input
        type="text"
        name="venueLink"
        value={formData.venueLink}
        onChange={handleChange}
      />
      <p>Link til billetter</p>
      <input
        type="text"
        name="tickets"
        value={formData.tickets}
        onChange={handleChange}
      />
      <p>Beskrivelse</p>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="h-32"
      />
      <div>
        <p>Last opp bilde</p>
        <input
          type="file"
          className="w-48"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setNewImage(e.target.files[0]);
            }
          }}
        />
      </div>
      <br />
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
