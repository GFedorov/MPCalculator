import Stepper from "../components/Stepper";
import Question from "../components/Question";
import { useState } from "react";
import { scenario, scenarioAnswers } from "../data/steps";

const IndexPage = () => {
  const [choosenScenario, setChoosenScenario] = useState(null);
  const [scenarioInfo, setScenarioInfo] = useState([]);
  const [steps, setSteps] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  let questions = [scenario];
  let chooseAnswer = (choosenScenario) => {
    setChoosenScenario(choosenScenario);
    setSteps(scenarioAnswers[choosenScenario]);
  };

  if (steps) {
    let step = steps[stepIndex];
    questions = step.questions;
    chooseAnswer = (answer, index) => {
      const prevScenarionInfo = [...scenarioInfo];
      if (!prevScenarionInfo[stepIndex]) {
        prevScenarionInfo[stepIndex] = [];
      }
      prevScenarionInfo[stepIndex][index] = answer;
      console.log(prevScenarionInfo);
      setScenarioInfo(prevScenarionInfo);
      // @todo: все ли вопросы текущего шага отвечены
      // если да, то setStepIndex(stepIndex+1)
    };
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
            <p>(здесь будут растения)</p>
            {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
          </div>
          <div className="main__question">
            {questions.map((question, index) => {
              return (
                <Question
                  key={index}
                  item={question}
                  setAnswer={(answer) => chooseAnswer(answer, index)}
                />
              );
            })}
          </div>
        </div>
        <div className="field-wrapper__sidebar field-wrapper__sidebar_right"></div>
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
