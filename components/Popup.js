import { getGoods, sum } from "../data/goods";
import { validateGoods } from "../data/steps";
import Cart from "./Cart";
import { useMainContext } from "./context/Main";



const Popup = ({ settings,
  choosenScenario, }) => {

  // const { required } = useMainContext();
  const goods = getGoods(settings, choosenScenario);
  // const sum = (x) => {
  //   let s = 0;
  //   for (let j = 0; j < x.length; j++) {
  //     s += x[j];
  //   }
  //   return s;
  // };
  let url = 'https://masterprof-season.ru/cart/?add-to-cart='
  for (let good of goods) {
    url += (good.id + ',').repeat(good.count)

  }

  url = url.substr(0, url.length - 1)
  const { result } = validateGoods(goods);


  return (

    <div className="popup">
      {`Вы отобрали товаров на сумму`}  {<b><br /> {sum(goods)}
        {` `} руб </b>} {`нажмите 'Продолжить' для завершения покупки.`
      }

      {/* </div><form action="https://masterprof-season.ru/?add-to-cart=276980" target="_blank"> */}
      <p>
        <button
          className="popBtn"
          onClick={() =>
            (window.location.href = url)
          }
        >
          Продолжить
        </button>
      </p>
      {!result && (
        <Cart settings={settings} choosenScenario={choosenScenario} showNoStock={true} showStock={false} />)}


    </div >
  );
};

export default Popup;
