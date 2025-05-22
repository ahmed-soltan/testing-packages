import { Button } from "../ui/button";
import { useCalculator } from "./store/use-calculator";

const CalculatorBody = () => {
  const { add } = useCalculator();
  const grid = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  const handleClick = (button: number | string) => {
    add(button);
  };

  return (
    <div className="flex gap-3 bg-neutral-800 p-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 w-full">
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={() => handleClick("DEL")}>
            Log
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("AC")}>
            AC
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("+")}>
            +
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("-")}>
            -
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("*")}>
            X
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("/")}>
            /
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick(".")}>
            .
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => handleClick("=")}>
            =
          </Button>
        </div>
      </div>{" "}
      <div className="w-full flex flex-col gap-3">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3 w-full justify-between">
            {row.map((num, colIndex) => (
              <Button
                key={colIndex}
                variant={"outline"}
                size={"lg"}
                onClick={() => handleClick(num)}>
                {num}
              </Button>
            ))}
          </div>
        ))}
        <div className="flex gap-3">
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full"
            onClick={() => handleClick(0)}>
            0
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 w-full">
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={() => handleClick("DEL")}>
            DEL
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("AC")}>
            AC
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("+")}>
            +
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("-")}>
            -
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("*")}>
            X
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick("/")}>
            /
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => handleClick(".")}>
            .
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => handleClick("=")}>
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBody;
