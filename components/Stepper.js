import { useMainContext } from "./context/Main";

const Stepper = () => {
  const {
    choosenScenario,
    stepIndex,
    steps,
  } = useMainContext();
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
    <>
      {/* прогресс шагов */}
      {!!steps[stepIndex] && !!steps[stepIndex].text && (
        <div className="main__question_title">{steps[stepIndex].text}</div>
      )}
      <div
        className="stepper-wrapper"
        style={{
          display: !choosenScenario ? "none" : "block",
        }}
      >
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
      </div>
    </>
  );
};

export default Stepper;
