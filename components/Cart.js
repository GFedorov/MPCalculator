import { getGoods } from "../data/goods";

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

  const sum = (x) => {
    let s = 0;
    for (let j = 0; j < x.length; j++) {
      s += x[j];
    }
    return s;
  };

  return (
    <div className="cart">
      <div className="cart__title"> Корзина</div>
      <div className="list">
        {goods.map((good, i) => (
          <div className="list__item" key={good.name}>
            {totalArr.push(goods[i].price * goods[i].count)}

            {/* {setTotalArr((oldArray) => [
              ...oldArray,
              goods[i].price * goods[i].count,
            ])} */}

            {/* {setTotalId((oldArray) => [...oldArray, goods[i].id])}
            {console.log(totalId)} */}

            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">{good.count} шт</div>
            <div className="list__item__price">{good.price} р</div>
            {console.log(goods[0].price)}
            <div className="list__item__subtotal">
              {goods[i].price * goods[i].count} р
            </div>
            {totalId.push(goods[i].id)}
            {console.log(totalId)}
          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>
      <div className="cart-total">Итого: {sum(totalArr)} р</div>
    </div>
  );
};

export default Cart;
