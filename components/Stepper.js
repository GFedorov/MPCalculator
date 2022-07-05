import { useMainContext } from "./context/Main";

const Stepper = () => {
  const { choosenScenario, stepIndex } = useMainContext();
  const step = +stepIndex + 1;
  let stepScenario;
  if (choosenScenario === "root") {
    stepScenario = 6;
  } else if (choosenScenario === "belt") {
    stepScenario = 5;
  } else if (choosenScenario === "tree") {
    stepScenario = 3;
  } else {
    stepScenario = 1;
  }
  return (
    <div className="stepper">
      <div
        className="stepper__segment"
        style={{
          width: Math.round(100 / stepScenario, 2) + "%",
          left: Math.round((100 * (step - 1)) / stepScenario, 2) + "%",
        }}
      >
        Шаг {step}/{stepScenario}
      </div>
    </div>
  );
};

export default Stepper;
