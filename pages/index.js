import Stepper from "../components/Stepper";
import Cart from "../components/Cart";
import SvgField from "../components/field/Svg";
import Popup from "../components/Popup";
import { useMainContext } from "../components/context/Main";
import { useEffect, useState } from "react";
import MobileSection from "../components/MobileSection";
import Questions from "../components/Questions";
import BackForward from "../components/BackForward";

const IndexPage = () => {
  const [displayWidth, setDisplayWidth] = useState(0);

  useEffect(() => {
    setDisplayWidth(window.screen.width);
  }, []);

  const {
    chosenSettings,
    choosenScenario,
  } = useMainContext();

  const fieldMaxHeight = (+chosenSettings.kolvo_ryadov === 1 && displayWidth < 576) ? 200
    : displayWidth < 576 ? 300
    : (+chosenSettings.kolvo_ryadov === 1)? 250
    : 380;

  return (
    <div className="page">
      <MobileSection />

      <div className="field-wrapper">
        {/* svg поле */}
        <div className="field-wrapper__main main">
          <div
            className="main__field"
            style={{
              maxHeight: fieldMaxHeight + "px",
              transition: "0.3s",
            }}
          >
            <SvgField />
          </div>
        </div>

        {/* корзина */}
        <Cart />
      </div>
      <div
        className="main__question grid"
        style={{
          order: !choosenScenario ? -1 : 1,
        }}
      >
        <div className="main__question_wrapper">
          <Stepper />
          <Questions />
          <BackForward />
        </div>
      </div>
      <Popup />
    </div>
  );
};

export default IndexPage;