import Stepper from "../components/Stepper";
import Question from "../components/Question";
import { useState } from "react";
import { scenario, scenarioAnswers } from "../data/steps";
import Debug from "../components/Debug";
import RootField from "../components/field/Root";

const IndexPage = () => {
  const [choosenScenario, setChoosenScenario] = useState(null);
  const [scenarioInfo, setScenarioInfo] = useState([]);
  const [chosenSettings, setChosenSettings] = useState({});
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  let questions = [scenario];
  let chooseAnswer = (choosenScenario) => {
    setChoosenScenario(choosenScenario);
    setSteps(scenarioAnswers[choosenScenario]);
  };
  console.log({
    choosenScenario,
    scenarioInfo,
    steps,
    stepIndex,
  });

  let disabled = true;

  if (steps.length) {
    let step = steps[stepIndex];
    questions = step.questions;
    chooseAnswer = (answer, index) => {
      const prevScenarionInfo = [...scenarioInfo];
      if (!prevScenarionInfo[stepIndex]) {
        prevScenarionInfo[stepIndex] = [];
      }
      prevScenarionInfo[stepIndex][index] = answer;
      // console.log(steps[stepIndex].questions[index].name, answer);
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
        <div className="field-wrapper__sidebar field-wrapper__sidebar_left">
          левая часть (здесь будет бочка)
        </div>
        <div className="field-wrapper__main main">
          <div className="main__field">
            <RootField settings={chosenSettings} />
          </div>
          <div className="main__question">
            {questions.map((question, index) => {
              return (
                <Question
                  key={question.name}
                  item={question}
                  setAnswer={(answer) => chooseAnswer(answer, index)}
                />
              );
            })}
            {!disabled && (
              <button
                onClick={() => {
                  if (!!steps[stepIndex + 1]) {
                    setStepIndex(stepIndex + 1);
                  } else {
                    alert(" перейти в корзину");
                  }
                }}
              >
                Далее
              </button>
            )}
          </div>
        </div>
        <div className="field-wrapper__sidebar field-wrapper__sidebar_right">
          <Debug steps={steps} scenarioInfo={scenarioInfo} />
        </div>
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
