import { getGoods } from "../data/goods";

const MobileCart = ({
  settings,
  choosenScenario,
  setGoodsTot,
  goodsTot,
  showCart,
  setShowCart,
  totalId,
  totalArr,
  goodsSubTot,
}) => {
  // const {
  //   need_perekritie_vodi = "no",
  //   need_filter = "no",
  //   need_timer = "no",
  // } = settings;
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
      <div className="list">
        {/* <div className="list__item">
          <div className="list__item__img"></div>
          <div className="list__item__text">Капельница разборная</div>
          <div className="list__item__pcs">1 шт</div>
        </div>
        <div className="list__item">
          <div className="list__item__img"></div>
          <div className="list__item__text">Капельница разборная</div>
          <div className="list__item__pcs">1 шт</div>
        </div> */}
        {goods.map((good, i) => (
          <div className="list__item" key={good.name}>
            {totalArr.push(goods[i].price * goods[i].count)}
            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">{good.count} шт</div>
            <div className="list__item__price">{good.price} р</div>
            <div className="list__item__subtotal">
              {goods[i].price * goods[i].count}
              {goodsSubTot} р
            </div>
            {totalId.push(goods[i].id)}
          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>
      <div className="cart-total">Итого: {sum(totalArr)} р</div>
    </div>
  );
};

export default MobileCart;
