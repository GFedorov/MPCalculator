import { useState } from "react";
import { useCart } from "./context/Cart";
import { useMainContext } from "./context/Main";
import MobileCart from "./MobileCart";

const MobileSection = ({
  choosenScenario,
}) => {
  const {
    setGoodsSubTot,
    goodsSubTot,
    showCart,
    setShowCart,
    totalId,
    totalArr,
  } = useCart();
  
  const [mobTotalPrice, setMobTotalPrice] = useState(0);
  const { chosenSettings, goBack } = useMainContext();

  return (
    <div className="mobile-top-section">
      {/* мобильные кнопки */}
      <div className="top-btn-wrapper">
        <button onClick={goBack} className="stepBtn">
          <span></span> Назад
        </button>
        <button
          className="top-cart"
          onClick={() => {
            if (showCart === false) {
              setShowCart(true);
            } else setShowCart(false);
          }}
        >
          {mobTotalPrice} р
        </button>
      </div>

      {/* мобильная корзина */}
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
  );
};

export default MobileSection;
