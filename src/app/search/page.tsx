import { Pagination } from "@/components/search/pagination";
import { SearchInput } from "@/components/search/search-input";
import { SearchResult } from "@/components/search/search-result";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchInput />
        <SearchResult />
        <Pagination totalPages={10} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
