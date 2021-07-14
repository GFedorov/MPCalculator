import { getGoods } from "../data/goods";

const Cart = ({ settings }) => {
  // const {
  //   need_perekritie_vodi = "no",
  //   need_filter = "no",
  //   need_timer = "no",
  // } = settings;
  const goods = getGoods(settings);
  return (
    <div className="cart">
      <div className="cart__title"> Корзина</div>
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
        {goods.map((good) => (
          <div className="list__item" key={good.name}>
            <div className="list__item__img">
              <img src={good.img} />
            </div>
            <div className="list__item__text">{good.name}</div>
            <div className="list__item__pcs">{good.count} шт</div>
          </div>
        ))}

        <div className="cart__listWrapper__item"></div>
      </div>
    </div>
  );
};

export default Cart;
