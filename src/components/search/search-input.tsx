"use client";

import { useState } from "react";
import { useQueryState } from "@/app/hooks/use-query-state";

export const SearchInput = () => {
  const [query, setQuery] = useQueryState("q");
  const [inputValue, setInputValue] = useState(query || "");


  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitToUrl = () => {
    const trimmed = inputValue.trim();
    setQuery(trimmed || null); 
  };

  return (
    <div className="w-full max-w-[500px] flex items-center gap-3">
      <input
        className="w-full rounded-md border border-neutral-700 p-2"
        type="search"
        placeholder="search..."
        value={inputValue}
        onChange={handleQueryChange}
      />
      <button
        onClick={submitToUrl}
        className="rounded-md p-2 border border-neutral-600"
      >
        Search
      </button>
    </div>
  );
};
