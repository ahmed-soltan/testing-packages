"use client";

import { useQueryState } from "@/app/hooks/use-query-state";

export const SearchResult = () => {
  const [query] = useQueryState("q");
  const [page] = useQueryState("page");

  return (
    <div className="flex items-center flex-col gap-4">
      <h1>Query : {query}</h1>
      <h1>Page : {parseInt(page || "1", 10)}</h1>
    </div>
  );
};
