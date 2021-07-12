const Cart = (settings) => {
  const {
    need_perekritie_vodi = "no",
    need_filter = "no",
    need_timer = "no",
  } = settings;

  return (
    <div className="cart">
      <div className="cart__title"> Корзина</div>
      <div className="list">
        <div className="list__item">
          <div className="list__item__img"></div>
          <div className="list__item__text">Капельница разборная</div>
          <div className="list__item__pcs">1 шт</div>
        </div>
        <div className="list__item">
          <div className="list__item__img"></div>
          <div className="list__item__text">Капельница разборная</div>
          <div className="list__item__pcs">1 шт</div>
        </div>

        <div className="cart__listWrapper__item"></div>
      </div>
    </div>
  );
};

export default Cart;
