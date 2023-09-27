"use client";
import React from "react";
import useStore from "../../store";

export default function Result() {
  const store = useStore();

  return (
    <div className="py-20 px-10">
      <p className="max-w-4xl mx-auto whitespace-pre-wrap">{store.email}</p>
    </div>
  );
}
