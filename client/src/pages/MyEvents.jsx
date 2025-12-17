import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUserId } from "../utils/getUserId";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    api.get("/events").then((res) => {
      const myEvents = res.data.filter(
        (e) => e.createdBy === userId || e.attendees.includes(userId)
      );
      setEvents(myEvents);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>

      {events.map((e) => (
        <div key={e._id} className="bg-white p-4 mb-3 rounded shadow">
          <h3 className="font-bold">{e.title}</h3>
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEvents;
