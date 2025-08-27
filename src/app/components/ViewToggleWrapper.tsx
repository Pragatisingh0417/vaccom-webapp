"use client";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ViewToggleWrapper({ children }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div>
      {/* View Toggle Buttons */}
      <div className="flex justify-end max-w-6xl mx-auto p-4 gap-2">
        <button
          onClick={() => setView("grid")}
          className={`px-3 py-1 border rounded ${view === "grid" ? "bg-gray-200" : ""}`}
        >
          Grid
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-3 py-1 border rounded ${view === "list" ? "bg-gray-200" : ""}`}
        >
          List
        </button>
      </div>

      {/* Pass view type as context via props */}
      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {children}
      </div>
    </div>
  );
}
