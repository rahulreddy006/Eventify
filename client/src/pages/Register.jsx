import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch {
      toast.error("User already exists or invalid data");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input mt-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="input mt-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn mt-4">Register</button>
      </form>
    </div>
  );
}

export default Register;
