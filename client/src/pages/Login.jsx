import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="input mt-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn mt-4">Login</button>
      </form>
    </div>
  );
}

export default Login;

