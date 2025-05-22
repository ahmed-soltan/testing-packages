"use client";

import { useQueryState } from "@/app/hooks/use-query-state";
import { useMemo } from "react";

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const [pageParam, setPage] = useQueryState("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) ? 1 : parsed;
  }, [pageParam]);

  const handleSetPage = (page: number) => {
    setPage(page.toString());
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handleSetPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handleSetPage(pageNumber)}
            className={`px-3 py-1 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}>
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => handleSetPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
};
