const Popup = ({ goodsTot }) => {
  console.log(goodsTot);
  return (
    <div className="popup">
      {`Вы отобрали товаров на сумму ${goodsTot} нажмите кнопку, чтобы перейти в корзину.`}

      {/* </div><form action="https://masterprof-season.ru/?add-to-cart=276980" target="_blank"> */}
      <button
        className="popBtn"
        onClick={() =>
          (window.location.href =
            "https://masterprof-season.ru/?add-to-cart=276980")
        }
      >
        Кнопка
      </button>
    </div>
  );
};

export default Popup;
