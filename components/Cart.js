import { getGoods, sum } from "../data/goods";


const Cart = ({
  settings,
  choosenScenario,
  setGoodsSubTot,
  goodsSubTot,
  totalPrice,
  setTotalPrice,
  totalId,
  setTotalId,
  totalArr,
  setTotalArr,
}) => {
  const goods = getGoods(settings, choosenScenario);


  // {
  //   setTotalArr((oldArray) => [
  //     ...oldArray,
  //     goods[i].price * goods[i].count,
  //   ])
  // }
  

  return (
    <div className="cart">
      <div className="cart__title"> Корзина</div>
      <div className="list">
        {goods.map((good, i) => (
          <div className="list__item" key={good.name}>

            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">{good.count} шт</div>
            <div className="list__item__price">{good.price} р</div>

            <div className="list__item__subtotal">
              {good.price * good.count} р
            </div>

          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>
      <div className="cart-total">Итого: {sum(goods)} р</div>
    </div>
  );
};

export default Cart;
