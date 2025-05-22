"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { Stars } from "stars-rating-sultan";

export default function Home() {
  // const [query, setQuery] = useState("");
  // const { error, isLoading, result } = useDebounce(query, 500);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   if (query.trim()) {
  //     setQuery(query);
  //   }
  // };

  const [rating, setRating] = useState(0);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
      {/* <input
        type="text"
        placeholder="search..."
        className="flex h-9 w-full max-w-[400px] rounded-md border border-neutral-500 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
        onChange={handleInputChange}
      />
      {isLoading && (
        <Loader2 className="size-5 flex items-center justify-center animate-spin mt-10" />
      )}
      <ResultList result={result} />
      {error && <p className="text-red-500">{error}</p>} */}

      <Stars value={rating} onChange={setRating} count={3} icon={Star} />
    </div>
  );
}
