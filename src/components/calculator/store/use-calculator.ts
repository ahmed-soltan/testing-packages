import { create } from "zustand";

type TCalculator = {
  result: number;
  current: string;
  add: (btn: string | number) => void;
};

export const useCalculator = create<TCalculator>((set) => ({
  result: 0,
  current: "",
  add: (btn) => {
    if (btn === "AC") {
      set(() => ({ current: "", result: 0 }));
    } else if (btn === "=") {
      set((prev) => {
        try {
          const evaluated = eval(prev.current);
          return { result: evaluated };
        } catch (error) {
          return { current: "Error", result: 0 , error };
        }
      });
    } else if (btn === "DEL") {
      set((prev) => ({
        current: prev.current.split("").slice(0, -1).join(""),
      }));
    } else {
      set((prev) => ({ current: prev.current + btn, result: prev.result }));
    }
  },
}));
