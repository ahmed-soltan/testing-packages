"use client";
import api from "@/api";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true },
      );

      setMessage("Login successful!");
      console.log("Tokens:", res.data); // accessToken and maybe refreshToken if returned
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <div>
        <label className="block mb-1 font-semibold">Email:</label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Password:</label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="submit"
      >
        Login
      </button>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </form>
  );
};

export default LoginForm;
