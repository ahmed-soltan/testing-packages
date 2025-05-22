import { useState, useRef, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ResultList({ result }: { result: User[] }) {
  const [open, setOpen] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % result.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev - 1 < 0 ? result.length - 1 : prev - 1
        );
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(result.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  useEffect(() => {
    const current = resultRefs.current[focusedIndex];
    if (current) {
      current.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  if (!open) return null;

  return (
    <ul
      className="relative w-full max-w-[400px]"
      role="combobox"
      aria-expanded={open}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute top-0 z-50 w-full max-h-[300px] overflow-y-auto rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md outline-none animate-in fade-in-0 zoom-in-95">
        {result.map((user, index) => (
          <li
            key={user.id}
            ref={(el) => (resultRefs.current[index] = el)}
            role="option"
            aria-selected={index === focusedIndex}
            onMouseEnter={() => setFocusedIndex(index)}
            className={`relative flex flex-col gap-1 w-full cursor-default select-none items-start py-2.5 px-3 outline-none",
              ${index === focusedIndex && "bg-neutral-100 text-neutral-900"}
            `}
          >
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-neutral-500">{user.email}</span>
          </li>
        ))}
      </div>
    </ul>
  );
}
