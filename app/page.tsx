"use client";
import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import useStore from "../store";

import { useCompletion } from "ai/react";

export default function Home() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const store = useStore();
  const router = useRouter();
  let { complete, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await complete(text1, { body: { bodyText: text2 } });
    if (res) {
      store.storeEmail(res);
      router.push("/result");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Generate the Email using AI
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              To recipient
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="block w-full rounded-md py-1.5 px-4 text-gray-900 shadow-sm border-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Reason
            </label>
            <div className="mt-2">
              <input
                id="reason"
                name="reason"
                type="reason"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="block w-full rounded-md py-1.5 px-4 text-gray-900 shadow-sm border-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Generating..." : "Click to Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
