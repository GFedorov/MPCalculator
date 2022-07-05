import Stepper from "../components/Stepper";
import Cart from "../components/Cart";
import SvgField from "../components/field/Svg";
import Popup from "../components/Popup";
import { useMainContext } from "../components/context/Main";
import { useEffect, useState } from "react";
import MobileSection from "../components/MobileSection";
import Questions from "../components/Questions";

const IndexPage = () => {
  const [focusedEl, setFocusedEl] = useState(null);

  const [displayWidth, setDisplayWidth] = useState(0);

  useEffect(() => {
    setDisplayWidth(window.screen.width);
  }, []);

  const {
    chosenSettings,
    stepIndex,
    steps,

    goToNextStep,
    goBack,

    choosenScenario,

    error,
  } = useMainContext();

  return (
    <div className="page">
      <MobileSection choosenScenario={choosenScenario} />

      <div className="field-wrapper">
        {/* svg поле */}
        <div className="field-wrapper__main main">
          <div
            className="main__field"
            style={{
              maxHeight:
                +chosenSettings.kolvo_ryadov === 1 && displayWidth < 576
                  ? 200 + "px"
                  : displayWidth < 576
                  ? 300 + "px"
                  : +chosenSettings.kolvo_ryadov === 1
                  ? 250 + "px"
                  : 380 + "px",
              transition: "0.3s",
            }}
          >
            <SvgField
              {...{
                chosenSettings,
                type: choosenScenario,
                focusedEl,
              }}
            />
          </div>
        </div>

        {/* корзина */}
        <Cart choosenScenario={choosenScenario} />
      </div>
      <div
        className="main__question grid"
        style={{
          order: !choosenScenario ? -1 : 1,
        }}
      >
        <div className="main__question_wrapper">
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
            <Stepper />
          </div>

          <Questions {...{ focusedEl, setFocusedEl }} />

          {!!error && <div className="alertError">{error}</div>}

          {/* кнопки вперёд - назад */}
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
        </div>
      </div>
      <Popup />
    </div>
  );
};

export default IndexPage;

// const [step, setStep] = useState(1);
// const [info, setInfo] = useState([]);
// const item1 = {
//   text: "Что будем поливать ?",
//   type: "one-choice",
//   options: [
//     { val: 1, text: "Деревья" },
//     { val: 2, text: "Грядки" },
//   ],
// };
// const setAnswer1 = (val) => {
//   setInfo([...info, { question: item1.text, answer: val }]);
//   setStep(2);
// };

// const item2 = {
//   text: "Как будем поливать ?",
//   type: "one-choice",
//   options: [
//     { val: 1, text: "Быстро" },
//     { val: 2, text: "Долго" },
//   ],
// };
// const setAnswer2 = (val) => {
//   setInfo([...info, { question: item2.text, answer: val }]);
// };

// const steps = [[], [item1, setAnswer1], [item2, setAnswer2]];
// const [item, setAnswer] = steps[step];
