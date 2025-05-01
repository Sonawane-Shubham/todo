import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../constants/api";
import ButtonLoader from "../components/ButtonLoader";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !email.trim() && !password.trim()) {
      setError("all field are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError("Signup  failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Signup</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          {loading ? <ButtonLoader /> : "Signup"}
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
