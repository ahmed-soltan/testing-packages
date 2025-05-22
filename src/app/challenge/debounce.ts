import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const useDebounce = (value: string, delay?: number) => {
  const [result, setResult] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  useEffect(() => {
    const search = async () => {
      if (!debouncedValue) return;
      setIsLoading(true);
      setResult([]);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedValue}`
        );
        const data = await res.json();
        setResult(data);
        setError(null);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedValue]);

  return {
    isLoading,
    error,
    result,
  };
};
