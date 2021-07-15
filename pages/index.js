import Stepper from "../components/Stepper";
import Question from "../components/Question";
import { useState } from "react";
import { scenario, scenarioAnswers } from "../data/steps";
import Debug from "../components/Debug";
import Cart from "../components/Cart";
import SvgField from "../components/field/Svg";

const IndexPage = () => {
  // выбранный сценарий, появляется после нажатия на первую кнопку
  const [choosenScenario, setChoosenScenario] = useState(null);
  // массив из шагов и вопросов с ответами [['1','12','yes']]
  const [scenarioInfo, setScenarioInfo] = useState([]);
  // объект из конечных ответов вида <название-настройки>-<ответ-пользователя>
  const [chosenSettings, setChosenSettings] = useState({});
  // все шаги выбранного сценария
  const [steps, setSteps] = useState([]);
  // выбранный шаг (номер шага)
  const [stepIndex, setStepIndex] = useState(0);
  // уведомление об ошибке
  const [error, setError] = useState("");

  // переменные, в случае, если это первый экран
  let questions = [scenario];
  let chooseAnswer = (choosenScenario) => {
    setChoosenScenario(choosenScenario);
    setSteps(scenarioAnswers[choosenScenario]);
  };

  // переход к следующему шагу заблокирован
  let disabled = true;

  // переменные, в случае, если это уже не первый экран
  if (steps.length) {
    let step = steps[stepIndex];

    questions = step.questions;
    chooseAnswer = (answer, index) => {
      const prevScenarionInfo = [...scenarioInfo];
      if (!prevScenarionInfo[stepIndex]) {
        prevScenarionInfo[stepIndex] = [];
      }
      prevScenarionInfo[stepIndex][index] = answer;
      //console.log(steps[stepIndex].questions[index].name, answer);
      setChosenSettings({
        ...chosenSettings,
        [steps[stepIndex].questions[index].name]: answer,
      });
      setScenarioInfo(prevScenarionInfo);
      // @todo: все ли вопросы текущего шага отвечены
      // если да, то setStepIndex(stepIndex+1)
    };
    if (
      scenarioInfo[stepIndex] &&
      scenarioInfo[stepIndex].filter((answer) => !!answer).length ===
        steps[stepIndex].questions.length
    ) {
      disabled = false;
    }
  }

  return (
    <div className="page">
      {/* <Stepper step={step} /> */}
      <div className="field-wrapper">
        {/* <div className="field-wrapper__sidebar field-wrapper__sidebar_left"></div> */}
        <div className="field-wrapper__main main">
          <h1 className="main__title">ИНДИВИДУАЛЬНЫЙ ПОДБОР СИСТЕМЫ ПОЛИВА</h1>
          <div className="main__field">
            <SvgField
              {...{
                ...chosenSettings,
                type: choosenScenario,
                choosenScenario,
              }}
            />
            <div className="cart-wrapper">
              <Cart settings={chosenSettings} />
            </div>
          </div>
          <div className="stepper-wrapper">
            <Stepper step={+stepIndex + 1} totStep={6} />
          </div>
          <div className="main__question grid">
            {!!steps[stepIndex] && !!steps[stepIndex].text && (
              <div className="main__question_title">
                {steps[stepIndex].text}
              </div>
            )}
            <div className="grid__row grid__row_center">
              {questions.map((question, index) => {
                return (
                  <div
                    key={question.name ? question.name : index}
                    className={question.type === "buttons" ? "" : "grid__col-6"}
                  >
                    <Question
                      item={question}
                      currentAnswer={
                        scenarioInfo[stepIndex]
                          ? scenarioInfo[stepIndex][index]
                          : null
                      }
                      setAnswer={(answer) => chooseAnswer(answer, index)}
                    />
                  </div>
                );
              })}
            </div>

            {!!error && <div className="alertError">{error}</div>}

            <div className="btnWrapper">
              <button
                onClick={() => {
                  if (stepIndex === 0) {
                    if (confirm(" Подтвердить возврат? ")) {
                      setSteps([]);
                      setChoosenScenario(null);
                      setScenarioInfo([]);
                      setChosenSettings({});
                    }
                    return;
                  }

                  if (!!steps[stepIndex + 1]) {
                    setStepIndex(stepIndex - 1);
                  } else {
                    alert(" перейти в корзину");
                  }
                }}
                className="stepBtn"
              >
                <span></span> Назад
              </button>

              <button
                onClick={() => {
                  // показывать кнопку всегда, но если disabled, отображать ошибку
                  if (disabled) {
                    setError("Пожалуйста заполните все поля");
                    setTimeout(() => {
                      setError("");
                    }, 6000);
                    return;
                  }
                  if (!!steps[stepIndex + 1]) {
                    setStepIndex(stepIndex + 1);
                  } else {
                    alert(" перейти в корзину");
                  }
                }}
                className="stepBtn"
              >
                Следующий шаг <span></span>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="field-wrapper__sidebar field-wrapper__sidebar_right">
          <Debug steps={steps} scenarioInfo={scenarioInfo} />
        </div> */}
      </div>
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
