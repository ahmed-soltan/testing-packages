import { useInfiniteQuery } from "@tanstack/react-query";

interface QueryType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const PAGE_SIZE = 10; // Adjust the number of photos per page

export const useGetPhotos = () => {
  return useInfiniteQuery<QueryType[]>({
    queryKey: ["comments"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=${PAGE_SIZE}`,
      );
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};
