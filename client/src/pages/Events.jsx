import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-3 gap-4">
      {events.map((e) => (
        <div
          key={e._id}
          onClick={() => navigate(`/events/${e._id}`)}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
        >
          {e.imageUrl && (
            <img
              src={e.imageUrl}
              className="h-40 w-full object-cover rounded"
            />
          )}

          <h3 className="font-bold mt-2">{e.title}</h3>
          <p>{e.location}</p>
          <p className="text-sm">
            {e.attendees.length}/{e.capacity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Events;
