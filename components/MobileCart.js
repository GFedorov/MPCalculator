import { getGoods, sum } from "../data/goods";
import { validateGoods } from "../data/steps";
import { useMainContext } from "./context/Main";


const MobileCart = ({
  settings,
  choosenScenario,
  setMobTotalPrice,
  showCart,
  setShowCart,
  showStock = true,
  showNoStock = true,

}) => {
  const goods = getGoods(settings, choosenScenario);

  // const sum = (x) => {
  //   let s = 0;
  //   for (let j = 0; j < x.length; j++) {
  //     s += x[j];
  //   }
  //   return s;
  // };
  // const totalPrice = sum(goods.map((x) => +x.price));
  const { result } = validateGoods(goods);
  const { required, setRequired } = useMainContext();

  return (
    <div className="cart">
      <div className="top-wrapper">
        <div className="cart__title"> Корзина</div>

        <div
          className="close"
          onClick={() => {
            if (showCart === false) {
              setShowCart(true);
            } else setShowCart(false);
          }}
        ></div>
      </div>
      {!result && showNoStock && !required && (
        <div className="list__nostock">
          <span> Нет в наличии </span>
          {goods.filter((good) => {
            return (good.stock_quantity < good.count);
          }).map((good, i) => (
            <div className="list__item" key={good.name}>

              <div className="list__item__img">
                <img src={good.img} />
              </div>
              <div className="list__item__text">{good.name}</div>
              <div className="list__item__pcs">

                <div className="list__item__pcs__danger"> в наличии {good.stock_quantity} шт</div>
              </div>


            </div>
          ))}

          <div className="cart__listWrapper__item"></div>
        </div>

      )}
      {showStock && (<div className="list">
        {goods.filter(good => !!good.stock_quantity).map((good, i) => (
          <div className="list__item" key={good.name}>

            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">
              {
                (good.stock_quantity < good.count) && (
                  <>
                    <span> Частично в наличии </span><br></br>
                    <span className="list__item__pcs__warning">  в наличии

                      <br></br> {good.stock_quantity} из </span>

                  </>
                )
              }
              {good.count} шт

            </div>
            <div className="list__item__price">{good.price} р </div>

            <div className="list__item__subtotal">
              {good.price * Math.min(good.count, good.stock_quantity)} р
            </div>

          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>)}
      {setMobTotalPrice(sum(goods))}
      <div className="cart-total">Итого: {sum(goods)} р</div>
    </div>
  );
};

export default MobileCart;
