import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function CreateEvent() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    try {
        e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));

    await api.post("/events", data);
    toast.success("Event created successfully");
    navigate("/");
        
    } catch (error) {
        toast.error("Event creation failed");
        
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <input className="input" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input mt-2" placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input type="date" className="input mt-2" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="number" className="input mt-2" placeholder="Capacity" onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        <input type="file" className="mt-2" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button className="btn mt-4">Create</button>
      </form>
    </div>
  );
}

export default CreateEvent;
