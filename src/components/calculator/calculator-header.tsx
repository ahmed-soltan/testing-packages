import React from "react";
import { useCalculator } from "./store/use-calculator";

const CalculatorHeader = () => {
  const { current, result } = useCalculator();

  return (
    <div className="flex flex-col gap-3 w-full bg-neutral-900 rounded-t-md rounded-b-none p-2">
      <div className="w-full overflow-x-auto">
        <h1 className="text-neutral-400 font-semibold text-lg">{current}</h1>
      </div>
      <p className="text-right text-neutral-200 font-bold text-xl">{result}</p>
    </div>
  );
};

export default CalculatorHeader;
