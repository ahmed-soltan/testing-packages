import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryState = (
  key: string
): [string | null, (value: string | null) => void] => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    return searchParams.get(key);
  }, [key, searchParams]);

  const setValue = useCallback(
    (val: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams, key]
  );

  return [value, setValue];
};
