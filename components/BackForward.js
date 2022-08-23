import { useMainContext } from "./context/Main";

const BackForward = () => {
  const { error, goBack, goToNextStep, choosenScenario, stat, stepIndex } = useMainContext();
  console.log(stepIndex)
  return (
    <>
      {!!error && <div className="alertError">{error}</div>}
      <div
        className="btnWrapper"
        style={{
          display: !choosenScenario ? "none" : "flex",
        }}
      >
        <button onClick={goBack} className="stepBtn prev">
          <span></span> Назад
        </button>

        <button onClick={goToNextStep} className="stepBtn next">
          Следующий шаг <span></span>
        </button>
      </div>
    </>
  );
};

export default BackForward;
