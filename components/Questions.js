import { scenario, scenarioAnswers } from "../data/steps";
import { useMainContext } from "./context/Main";
import Question from "./Question";

const mainQuestions = [scenario];

const Questions = () => {
  const {
    chosenSettings,
    stepIndex,
    steps,
    setSteps,
    questions,
    scenarioInfo,
    chooseAnswer,
    setChoosenScenario,
    focusedEl, setFocusedEl,
    setScenarioInfo,
  } = useMainContext();


  let chooseMainAnswer = (choosenScenario) => {
    setChoosenScenario(choosenScenario);
    setSteps(scenarioAnswers[choosenScenario]);
    const newSteps = scenarioAnswers[choosenScenario];
    if (!!newSteps[0]) {

      if (newSteps[0].defaultValues && !scenarioInfo[0]) {
        setScenarioInfo([...scenarioInfo, newSteps[0].defaultValues])
      }
    }
  };

  return (
    <div className="grid__row grid__row_center">
      {
        // очередной шаг
        steps.length
          ? questions.map((question, index) => {
            return (
              <div
                key={question.name ? question.name : index}
                className={
                  question.type === "buttons" ? "" : "grid__col-lg-6"
                }
              >
                <Question
                  item={question}
                  currentAnswer={
                    scenarioInfo[stepIndex]
                      ? scenarioInfo[stepIndex][index]
                      : null
                  }
                  setAnswer={(answer) => chooseAnswer(answer, index)}
                  setFocusedEl={setFocusedEl}
                  focusedEl={focusedEl}
                  settings={chosenSettings}
                  isHidden={question.isHidden && question.isHidden(chosenSettings, scenarioInfo[stepIndex])}
                />
              </div>
            );
          })
          : // первый шаг
          mainQuestions.map((question, index) => {
            return (
              <div
                key={question.name ? question.name : index}
                className={
                  question.type === "buttons" ? "" : "grid__col-lg-6"
                }
              >
                <Question
                  item={question}
                  currentAnswer={
                    scenarioInfo[stepIndex]
                      ? scenarioInfo[stepIndex][index]
                      : null
                  }
                  setAnswer={(answer) => {
                    chooseMainAnswer(answer, index);
                  }}
                  setFocusedEl={setFocusedEl}
                  focusedEl={focusedEl}
                  settings={chosenSettings}
                />
              </div>
            );
          })
      }
    </div>
  );
};

export default Questions;
