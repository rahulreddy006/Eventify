import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { getUserId } from "../utils/getUserId";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getUserId();

  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load single event
  const load = async () => {
    try {
      const res = await api.get("/events");
      const found = res.data.find((e) => e._id === id);
      setEvent(found);
    } catch {
      toast.error("Failed to load event");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!event) return <p className="p-6">Loading...</p>;

  const isCreator = event.createdBy?._id === userId;
  const hasJoined = event.attendees.includes(userId);

  // RSVP
  const rsvp = async () => {
    if (!userId) {
      toast.error("Please login to RSVP");
      return;
    }

    try {
      await api.post(`/events/${id}/rsvp`);
      toast.success("RSVP successful");
      load();
    } catch (error) {
  const msg = error.response?.data?.message || "";

  if (msg.toLowerCase().includes("full")) {
    toast.error("Event is full");
  } else if (msg.toLowerCase().includes("already")) {
    toast.info("You already joined this event");
  } else {
    toast.error("RSVP failed");
  }
}

  };

  // Un-RSVP
  const unRsvp = async () => {
    try {
      await api.post(`/events/${id}/unrsvp`);
      toast.success("You left the event");
      load();
    } catch {
      toast.error("Failed to leave event");
    }
  };

  // Delete event
  const remove = async () => {
    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted");
      navigate("/");
    } catch {
      toast.error("Unauthorized");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="event"
          className="w-full h-60 object-cover rounded"
        />
      )}

      <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
      <p className="text-gray-600">{event.location}</p>
      <p className="mt-2">{event.description}</p>

      <p className="mt-2 text-sm">
        {event.attendees.length}/{event.capacity} attending
      </p>

      {/* RSVP / LEAVE */}
      <div className="flex gap-3 mt-6">
        {!userId && (
          <p className="text-red-500">Please login to RSVP</p>
        )}

        {userId && !hasJoined && (
          <button
            onClick={rsvp}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            RSVP
          </button>
        )}

        {userId && hasJoined && (
          <button
            onClick={unRsvp}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Leave Event
          </button>
        )}

        {/* EDIT / DELETE (CREATOR ONLY) */}
        {isCreator && (
          <>
            <button
              onClick={() => navigate(`/events/${id}/edit`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <p className="font-bold mb-4">Delete this event?</p>
            <div className="flex justify-between">
              <button
                onClick={remove}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;

