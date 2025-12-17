import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get("/events").then((res) => {
      const event = res.data.find((e) => e._id === id);
      setForm(event);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${id}`, form);
      toast.success("Event updated");
      navigate(`/events/${id}`);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

        <input
          className="input"
          value={form?.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input mt-2"
          value={form?.location || ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button className="btn mt-4">Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
