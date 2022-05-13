import { getGoods, sum } from "../data/goods";
import { validateGoods } from "../data/steps";
import { useMainContext } from "./context/Main";


const Cart = ({
  settings,
  choosenScenario,
  showStock = true,
  showNoStock = true,

}) => {
  const goods = getGoods(settings, choosenScenario);


  // {
  //   setTotalArr((oldArray) => [
  //     ...oldArray,
  //     goods[i].price * goods[i].count,
  //   ])
  // }

  // const { requred } = useMainContext();
  const { result } = validateGoods(goods);
  console.log({ result, showNoStock })
  return (
    <div className="cart">

      <div className="cart__title"> Корзина</div>
      {!result && showNoStock && (
        <div className="list__nostock">
          <span> Нет в наличии </span>
          {goods.filter((good) => {
            return good.stock_quantity < good.count
          }).map((good, i) => (
            <div className="list__item" key={good.name}>

              <div className="list__item__img">
                <img src={good.img} />
              </div>
              <div className="list__item__text">{good.name}</div>
              <div className="list__item__pcs">
                <div className="list__item__pcs__danger"> {good.count - good.stock_quantity} шт</div>
              </div>
              <div className="list__item__price">{good.price} р</div>

              <div className="list__item__subtotal">
                {good.price * (good.count - good.stock_quantity)} р
              </div>

            </div>
          ))}

          <div className="cart__listWrapper__item"></div>
        </div>

      )}
      {showStock && (<div className="list">
        {goods.map((good, i) => (
          <div className="list__item" key={good.name}>

            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">
              {good.count} шт
              {good.stock_quantity && good.stock_quantity < good.count && (
                <div className="list__item__pcs__warning"> доступно {good.stock_quantity} шт</div>
              )
              }
            </div>
            <div className="list__item__price">{good.price} р</div>

            <div className="list__item__subtotal">
              {good.price * Math.min(good.count, good.stock_quantity)} р
            </div>

          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>)}
      <div className="cart-total">Итого: {sum(goods)} р</div>
    </div>
  );
};

export default Cart;
