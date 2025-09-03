"use client";
import { Dispatch, SetStateAction } from "react";
import { Grid, List } from "lucide-react"; // icons

interface Props {
  results: number;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  view: "grid" | "list";
  setView: Dispatch<SetStateAction<"grid" | "list">>;
}

export default function ProductToolbar({
  results,
  sort,
  setSort,
  view,
  setView,
}: Props) {
  return (
    <div className="w-full bg-amber-50 border-b border-t border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Results count */}
        <p className="text-gray-600">Showing results : {results}</p>

        {/* Right side */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded ${
                view === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <Grid size={22} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded ${
                view === "list" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <List size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
