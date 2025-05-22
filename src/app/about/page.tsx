"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useGetPhotos } from "./hooks/use-get-photos";

const AboutPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetPhotos();
  const { ref, inView } = useInView();

  const loadMore = () => {
    fetchNextPage();
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center flex-wrap gap-5">
      {data.pages.flat().map((comment) => (
        <div className="border rounded-md flex flex-col" key={comment.id}>
          <h1>{comment.name}</h1>
          <h3>{comment.email}</h3>
          <p>{comment.body}</p>
        </div>
      ))}

      {hasNextPage && (
        <Button className="text-center" onClick={loadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default AboutPage;
