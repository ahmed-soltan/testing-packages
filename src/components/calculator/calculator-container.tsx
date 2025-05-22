import CalculatorBody from "./calculator-body";
import CalculatorHeader from "./calculator-header";

const CalculatorContainer = () => {
  return (
    <div className="flex flex-col items-start w-auto p-5 rounded-sm">
      <CalculatorHeader />
      <CalculatorBody />
    </div>
  );
};

export default CalculatorContainer;
