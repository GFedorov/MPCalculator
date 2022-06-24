import Stepper from "../components/Stepper";
import Question from "../components/Question";

import { useState, useEffect } from "react";
import { scenario, scenarioAnswers } from "../data/steps";

import Cart from "../components/Cart";
import SvgField from "../components/field/Svg";
import Popup from "../components/Popup";
import MobileCart from "../components/MobileCart";
import { checkScenario, getForUpdate, getGoods, updateGoods } from "../data/goods";
import { useMainContext } from "../components/context/Main";
import { calcLength, getPipes } from "../components/helpers/cart";



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

  const [focusedEl, setFocusedEl] = useState(null);

  const [goCart, setGoCart] = useState(false);

  const [goodsSubTot, setGoodsSubTot] = useState(0);

  const [displayWidth, setDisplayWidth] = useState(0);
  useEffect(() => {
    setDisplayWidth(window.screen.width);
  }, []);
  const [showCart, setShowCart] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalId, setTotalId] = useState([]); //возникает ошибка, бесконечное число повторов
  const [totalArr, setTotalArr] = useState([]); //возникает ошибка, бесконечное число повторов
  // let totalId = [];
  // let totalArr = [];
  const [mobTotalPrice, setMobTotalPrice] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const { required, setRequired, openWarningPopup } = useMainContext();



  // переменные, в случае, если это первый экран
  let questions = [scenario];
  let chooseAnswer = (choosenScenario) => {
    setChoosenScenario(choosenScenario);
    setSteps(scenarioAnswers[choosenScenario]);

  };
  // popup
  //let popup = document.getElementById("myPopup");

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
      steps[stepIndex].questions.filter(question => (!question.isHidden || !question.isHidden(chosenSettings))).length
    ) {
      disabled = false;
    }
  }

  const width = 481;
  const height = 363;
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



  useEffect(() => {
    updateGoods().then((goods) => {
      setLoaded(true);
    });

  }, [])

  console.log({ test: scenarioInfo[stepIndex] })
  return (
    <div className="page">
      <div className="mobile-top-section">
        <div className="top-btn-wrapper">
          <button
            onClick={async () => {
              if (stepIndex === 0) {
                const success = await openWarningPopup(" Подтвердить возврат? ")
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
            }}
            className="stepBtn"
          >
            <span></span> Назад
          </button>
          <button
            className="top-cart"
            onClick={() => {
              if (showCart === false) {
                setShowCart(true);
              } else setShowCart(false);
            }}
          >{mobTotalPrice} р</button>
        </div>
        <div
          className={
            showCart === false
              ? "mobile-cart-wrapper"
              : "mobile-cart-wrapper-show"
          }
        >
          <MobileCart
            settings={chosenSettings}
            choosenScenario={choosenScenario}
            setGoodsSubTot={setGoodsSubTot}
            goodsSubTot={goodsSubTot}
            showCart={showCart}
            setShowCart={setShowCart}
            totalId={totalId}
            totalArr={totalArr}
            setMobTotalPrice={setMobTotalPrice}
          />
        </div>
      </div>


      <div className="field-wrapper">

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
                ...chosenSettings,
                type: choosenScenario,
                choosenScenario,
                width,
                height,
                focusedEl,
              }}
            />

          </div>
        </div>

        <Cart
          settings={chosenSettings}
          choosenScenario={choosenScenario}
          setGoodsSubTot={setGoodsSubTot}
          goodsSubTot={goodsSubTot}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          totalId={totalId}
          totalArr={totalArr}
          setTotalArr={setTotalArr}
          stepIndex={stepIndex}
        />

      </div>
      <div
        className="main__question grid"
        style={{
          order: !choosenScenario ? -1 : 1,
        }}
      >
        <div
          className="main__question_wrapper">

          {!!steps[stepIndex] && !!steps[stepIndex].text && (
            <div className="main__question_title">
              {steps[stepIndex].text}
            </div>
          )}
          <div
            className="stepper-wrapper"
            style={{
              display: !choosenScenario ? "none" : "block",
            }}
          >
            <Stepper step={+stepIndex + 1} totStep={stepScenario} />
          </div>
          <div className="grid__row grid__row_center">
            {questions.map((question, index) => {
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

                  />
                </div>
              );
            })}
          </div>

          {!!error && <div className="alertError">{error}</div>}

          <div
            className="btnWrapper"
            style={{
              display: !choosenScenario ? "none" : "flex",
            }}
          >
            <button
              onClick={async () => {
                if (stepIndex === 0) {
                  const success = await openWarningPopup(" Подтвердить возврат? ")
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
                } else {


                }
              }}
              className="stepBtn prev"
            >
              <span></span> Назад
            </button>

            <button
              onClick={async () => {
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
                      setRequired(false)
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
                  }, 6000);
                  return;
                }
                if (!!steps[stepIndex + 1]) {
                  setStepIndex(stepIndex + 1);
                } else {
                  setGoCart(true);

                }
              }}
              className="stepBtn next"
            >
              Следующий шаг <span></span>
            </button>
          </div>
        </div>
      </div>

      <div className={goCart == true ? "popup-show" : "popup-hide"}>
        <Popup settings={chosenSettings}
          choosenScenario={choosenScenario}
          close={() => setGoCart(false)} />
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
