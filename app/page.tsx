"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import useStore from "../store";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const store = useStore();
  const setEmail = useStore((state) => state.storeEmail);

  const pushMessage = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient,
          reason,
        }),
      });
      const data = await res.json();
      if (data) {
        setEmail(data.content);
        setLoading(false);
        router.push("/result");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={pushMessage}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient"
          >
            To
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="recipient"
            type="text"
            placeholder="To recipient..."
            value={recipient}
            onChange={(e: any) => setRecipient(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reason"
          >
            For
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reason"
            type="text"
            placeholder="Enter the reason"
            value={reason}
            onChange={(e: any) => setReason(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </div>
      </form>
    </div>
  );
}
