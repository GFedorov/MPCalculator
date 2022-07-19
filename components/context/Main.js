import { createContext, useContext, useEffect, useState } from "react";
import { getGoods, updateGoods } from "../../data/goods";

const MainContext = createContext();

const WarningPopup = ({
  confirm,
  cancel,
  text,
  subText = "Продолжить покупку?",
  close,
}) => {
  return (
    <div className="warning-popup">
      <div className="warning-popup__text">{text}</div>
      <p className="warning-popup__p">{subText}</p>
      <div className="warning-popup__buttons">
        <button
          className="warning-popup__button"
          onClick={() => {
            confirm();
            close();
          }}
        >
          Да
        </button>
        <button
          className="warning-popup__button"
          onClick={() => {
            cancel();
            close();
          }}
        >
          Нет
        </button>
      </div>
    </div>
  );
};

// переход к следующему шагу заблокирован

export const MainProvider = ({ children }) => {

  const [error, setError] = useState("");
  // выбранный сценарий, появляется после нажатия на первую кнопку root | belt | tree
  const [choosenScenario, setChoosenScenario] = useState(null);
  const [goCart, setGoCart] = useState(false);
  const [required, setRequired] = useState(true);
  const [warningPopupSettings, setWarningPopupSettings] = useState(null);

  // массив из шагов и вопросов с ответами [['1','12','yes']]
  const [scenarioInfo, setScenarioInfo] = useState([]);
  // объект из конечных ответов вида <название-настройки>-<ответ-пользователя>
  const [chosenSettings, setChosenSettings] = useState({});

  // все шаги выбранного сценария
  const [steps, setSteps] = useState([]);
  // выбранный шаг (номер шага)
  const [stepIndex, setStepIndex] = useState(0);
  const [focusedEl, setFocusedEl] = useState(null);
  // уведомление об ошибке
  // const [loaded, setLoaded] = useState(false);

  // переменные, в случае, если это первый экран
  //   let chooseAnswer = (choosenScenario) => {
  //     setChoosenScenario(choosenScenario);
  //     setSteps(scenarioAnswers[choosenScenario]);
  //   };
  // popup
  //let popup = document.getElementById("myPopup");

  // переменные, в случае, если это уже не первый экран
  //   if (steps.length) {
  const step = steps[stepIndex] || {};

  const questions = step.questions || [];
  const chooseAnswer = (answer, index) => {
    const prevScenarionInfo = [...scenarioInfo];
    if (!prevScenarionInfo[stepIndex]) {
      prevScenarionInfo[stepIndex] = [];
    }
    prevScenarionInfo[stepIndex][index] = answer;

    setChosenSettings({
      ...chosenSettings,
      [steps[stepIndex].questions[index].name]: answer,
    });
    setScenarioInfo(prevScenarionInfo);
    // @todo: все ли вопросы текущего шага отвечены
    // если да, то setStepIndex(stepIndex+1)
  };

  let disabled = true;
  if (
    scenarioInfo[stepIndex] &&
    scenarioInfo[stepIndex].filter((answer) => !!answer).length >=
    steps[stepIndex].questions.filter(
      (question) => !question.isHidden || !question.isHidden(chosenSettings, scenarioInfo[stepIndex])
    ).length
  ) {
    disabled = false;
  }

  useEffect(() => {
    updateGoods().then((goods) => {
      // setLoaded(true);
    });
  }, []);

  const openWarningPopup = (text, subText) => {
    return new Promise((resolve, reject) => {
      setWarningPopupSettings({
        text,
        subText,
        confirm: () => resolve(true),
        cancel: () => resolve(false),
      });
    });
  };

  const goToNextStep = async () => {
    if (steps[stepIndex].alert) {
      let { result, messages } = steps[stepIndex].alert(chosenSettings);

      if (!result) {
        const success = await openWarningPopup(` ${messages.join("\n")}`);
        if (!success) {
          return;
        }
      }
    }
    if (steps[stepIndex].validation && required) {
      const newGoods = getGoods(chosenSettings, choosenScenario);
      const { result, messages } = steps[stepIndex].validation(newGoods);
      if (!result) {
        const success = await openWarningPopup(`Продолжить частичную покупку? 
        ${messages.join("\n")}`);
        if (success) {
          setRequired(false);
        } else {
          return;
        }
      }
    }

    // показывать кнопку всегда, но если disabled, отображать ошибку
    if (disabled) {
      setError("Пожалуйста заполните все поля");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (!!steps[stepIndex + 1]) {
      setStepIndex(stepIndex + 1);
      if (steps[stepIndex + 1].defaultValues && !scenarioInfo[stepIndex + 1]) {
        setScenarioInfo([...scenarioInfo, steps[stepIndex + 1].defaultValues])
      }
    } else {
      setGoCart(true);
    }
  };

  const goBack = async () => {
    if (stepIndex === 0) {
      const success = await openWarningPopup(" Подтвердить возврат? ");
      if (success) {
        setSteps([]);
        setChoosenScenario(null);
        setScenarioInfo([]);
        setChosenSettings({});
      }
      return;
    }

    if (!!steps[stepIndex - 1]) {
      setStepIndex(stepIndex - 1);
    }
  };

  const value = {
    chosenSettings,
    stepIndex,
    steps,
    setSteps,
    questions,
    scenarioInfo,
    setGoCart,
    chooseAnswer,

    goToNextStep,
    goBack,
    goCart,

    choosenScenario,
    setChoosenScenario,
    setScenarioInfo,

    error,
    setError,

    focusedEl, setFocusedEl
  };
  return (
    <MainContext.Provider value={value}>
      {children}
      {!!warningPopupSettings && (
        <WarningPopup
          {...warningPopupSettings}
          close={() => {
            setWarningPopupSettings(null);
          }}
        />
      )}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
