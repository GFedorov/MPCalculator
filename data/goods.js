
import { calcLength, getPipes } from '../components/helpers/cart';
import {
  Q_NEED_FILTER,
  Q_KOLVO_RYADOV,
  Q_NEED_PEREKRITIE,
  Q_DLINNA_POSADKI,
  Q_SHIRINA_MEJDU_RYADOV,
  Q_SHIRINA_BETWEEN_PLANT,
  Q_KOLVO_RASTENIY,
  Q_NEED_TIMER,
  Q_RASSTOYANIE_DO_VODI,
  Q_PODKLUCHENIE_K_VODE,
  Q_NABOR_PODKLUCHENIYA
} from "./steps";

export const sum = (x) => {
  let s = 0;
  for (let j = 0; j < x.length; j++) {

    s += x[j].price * Math.min(x[j].count, x[j].stock_quantity);
  }
  return s;
};



const GOODS_URL = process.env.NEXT_PUBLIC_GOODS_URL || '';
//get from config
export const updateGoods = async () => {
  return new Promise((resolve, reject) => {
    fetch(`${GOODS_URL}/api/get-products`)
      .then((response) => response.json())
      .then((data) => {
        for (let product of goods) {
          // product это вариация продуктаа
          const newProduct = data.namesD[product.sku + '_' + (product.originalName || product.name)];

          if (newProduct) {
            product.id = newProduct.id;
            product.name = newProduct.name || product.name;
            product.img = newProduct.img || product.img;
            product.link = newProduct.link || product.link;
            product.price = +newProduct.price || +product.price;
            product.stock_quantity = +newProduct.stock_quantity || 0;
            product.sku = newProduct.sku || product.sku;

          } else {
            console.log('not found', product.sku + '_' + product.name);

          }
        }
        resolve(goods);
      }
      );
  });
}


export const checkScenario = (scenario) => {
  let minScenario = minScenarios[scenario];
  let result = true;
  let message = '';
  const cartGoods = getGoods(minScenario, scenario);

  for (let cartGood of cartGoods) {
    if (cartGood.count > cartGood.stock_quantity) {
      result = false;
      message = `Упс, мы проверили наш склад и обнаружили, что ${cartGood.name} нет в наличии, к сожалению, завершить подбор в этот раз не получится.`;
      break;
    }
  }
  return [result, message];
}
const minScenarios = {
  root: {
    "dlinna_posadki": "1",
    "shirina_mejdu_ryadov": "1",
    "shirina_between_plant": "0.1",
    "kolvo_ryadov": "1",
    "need_perekritie_vodi": "no",
    "kolvo_rasteniy": "1",
    "rasstoyanie_do_vodi": "0",
    // "podkluchenie_k_vode": "1/2 внутренная",
    "need_filter": "no",
    "need_timer": "no"

  },

  belt: {
    "dlinna_posadki": "1",
    "shirina_mejdu_ryadov": "1",
    "shirina_between_plant": "0.1",
    "kolvo_ryadov": "1",
    "need_perekritie_vodi": "no",
    "rasstoyanie_do_vodi": "0",
    //"podkluchenie_k_vode": "1/2 внутренная",
    "need_filter": "no",
    "need_timer": "no"
  },

  tree: {
    "dlinna_posadki": "1",
    "rasstoyanie_do_vodi": "1",
    "kolvo_rasteniy": "1",
    "need_filter": "no",
    "need_timer": "no"
  }
}

export const getLength = (settings) => {
  return (+settings[Q_KOLVO_RYADOV] * +settings[Q_DLINNA_POSADKI] +
    (+settings[Q_KOLVO_RYADOV] - 1) * +settings[Q_SHIRINA_MEJDU_RYADOV] + (+settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15
}
export const getTreeLength = (settings) => {
  return ((+settings[Q_KOLVO_RASTENIY] * 2.5) + +settings[Q_DLINNA_POSADKI] + +settings[Q_RASSTOYANIE_DO_VODI]) * 1.15
}


const goods = [
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] == 2 && choosenScenario === "root",
    count: (settings) => 1,
    name: "Редуктор давления для систем капельного полива (1,03 бар)",
    id: "290009",
    mainId: "290009",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/e50878c369ef11eb8c701a631b049b6a_90b0d61069f011eb8c701a631b049b6a.jpg",
    sku: "ДС.060126",
  },

  {

    condition: (settings, choosenScenario) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);

      // if (choosenScenario === "root") {
      return calcLength(length, pipes).indexOf(10) !== -1;
      //}
    },
    count: (settings) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);
      return calcLength(length, pipes).filter(p => p === 10).length;
    },
    pipeLength: 10,
    originalName: 'Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)',
    name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)",
    id: "290092",
    price: "0",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: 'ДС.060106'
  },
  {

    condition: (settings, choosenScenario) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);
      // if (choosenScenario === "root") {
      return calcLength(length, pipes).indexOf(12) !== -1;
      // }
    },
    count: (settings) => {
      const length = getLength(settings);
      const pipes = getPipes(goods)

      return calcLength(length, pipes).filter(p => p === 12).length;

    },
    pipeLength: 12,
    name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 12м)",
    id: "290093",
    price: "10",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: 'ДС.060106'
  },
  {

    condition: (settings, choosenScenario) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);
      // if (choosenScenario === "root") {
      return calcLength(length, pipes).indexOf(18) !== -1;
      //}
    },
    count: (settings) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);
      return calcLength(length, pipes).filter(p => p === 18).length;
    },
    pipeLength: 18,
    name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 18м)",
    id: "290094",
    price: "20",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: 'ДС.060106'
  },
  {

    condition: (settings, choosenScenario) => {

      const length = getLength(settings);
      const pipes = getPipes(goods);
      //if (choosenScenario === "root") {
      return calcLength(length, pipes).indexOf(25) !== -1;
      //}
    },
    count: (settings) => {
      const length = getLength(settings);
      const pipes = getPipes(goods)
      return calcLength(length, pipes).filter(p => p === 25).length;
    },
    pipeLength: 25,
    name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 25м)",
    id: "290095",
    price: "30",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: 'ДС.060106'
  },
  {

    condition: (settings, choosenScenario) => {
      const length = getLength(settings);
      const pipes = getPipes(goods);
      //if (choosenScenario === "root") {
      return calcLength(length, pipes).indexOf(50) !== -1;
      //}
    },
    count: (settings) => {
      const length = getLength(settings);
      const pipes = getPipes(goods)
      return calcLength(length, pipes).filter(p => p === 50).length;
    },
    pipeLength: 50,
    name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 50м)",
    id: "290096",
    price: "30",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: 'ДС.060106'
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] <= 2 && choosenScenario === "root",
    count: (settings) => 1,
    name: "Заглушка для капельной трубки (2 шт.)",
    //name: products.filter((item) => item.sku === "ДС.060094")[0].name,
    id: "290079",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
    sku: "ДС.060094",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] > 2 && choosenScenario === "root",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Заглушка для капельной трубки (5 шт.)",
    id: "290080",
    price: "59",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
    sku: "ДС.060094",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] == 2 && choosenScenario === "root",
    count: (settings) => 1,
    name: "Тройник для капельной трубки (1 шт)",
    id: "290081",
    mainId: "288224",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
    sku: "ДС.060095",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] >= 3 && choosenScenario === "root",
    count: (settings) => Math.ceil((settings[Q_KOLVO_RYADOV] - 1) / 5),
    name: "Тройник для капельной трубки (5 шт.)",
    id: "290082",
    mainId: "288224",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
    sku: "ДС.060095",
  },


  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] >= 1 && choosenScenario === "root",
    count: (settings) => 1,
    name: "Уголок для капельной трубки (5 шт.)",
    id: "290085",
    price: "69",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4b9e534169e311eb8c701a631b049b6a_4b9e534269e311eb8c701a631b049b6a.jpg",
    sku: "ДС.060096",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "root" || settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "belt",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для капельной трубки (1 шт.)",
    id: "290089",
    price: "109",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
    sku: "ДС.060100",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] && choosenScenario === "root",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RASTENIY] / 4),
    name: "Капельницы индивидуального полива растений с трубкой и адаптером (4 шт.)",
    id: "290102",
    price: "149",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/f3a2b5fd71d711eb8c701a631b049b6a_e88f6a1871d911eb8c701a631b049b6a-scaled.jpg",
    sku: "ДС.060102",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] && choosenScenario === "root",
    count: (settings) => 1,
    name: "Дырокол для установки индивидуальных капельниц (1 шт.)",
    id: "290090",
    price: "35",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4ba66fa169e811eb8c701a631b049b6a_46bb31fa69e911eb8c701a631b049b6a.jpg",
    sku: "ДС.060101"
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_PODKLUCHENIE_K_VODE] === "1/2 внутренняя" &&
      choosenScenario === "root" || settings[Q_PODKLUCHENIE_K_VODE] === "1/2 внутренняя" &&
      choosenScenario === "belt" || settings[Q_PODKLUCHENIE_K_VODE] === "1/2 внутренняя" && choosenScenario === "tree",
    count: (settings) => 1,
    name: 'Ниппель (бочонок) 1/2\" н/н (латунь) (1 шт.)',
    id: "290087",
    price: "129",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/02/adc2e2eb84f311ec8c95baf20bad8d43_adc2e2ec84f311ec8c95baf20bad8d43.jpg",
    sku: "ДС.071380",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_PODKLUCHENIE_K_VODE] &&
      choosenScenario === "root" || settings[Q_PODKLUCHENIE_K_VODE] && choosenScenario === "belt" || settings[Q_PODKLUCHENIE_K_VODE] && choosenScenario === "tree",
    count: (settings) => 1,
    name: 'Кран для капельного полива 1/2\" внутр. х 16 мм (1 шт.)',
    id: "290087",
    price: "159",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/534bdd2669e611eb8c701a631b049b6a_534bdd2769e611eb8c701a631b049b6a.jpg",
    sku: "ДС.060098",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внутренняя" &&
      choosenScenario === "root" || settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внутренняя" &&
      choosenScenario === "belt" || settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внутренняя" && choosenScenario === "tree",
    count: (settings) => 1,
    name: 'Ниппель - переходник (бочонок) 3/4\" х 1/2\" н/н (латунь) (1 шт.)',
    id: "289559",
    price: "129",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/02/5409e89484f411ec8c95baf20bad8d43_5409e89584f411ec8c95baf20bad8d43.jpg",
    sku: "ДС.071384"
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внешняя" &&
      choosenScenario === "root" || settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внешняя" &&
      choosenScenario === "belt" || settings[Q_PODKLUCHENIE_K_VODE] === "3/4 внешняя" && choosenScenario === "tree",
    count: (settings) => 1,
    name: 'Переходник с ребордой 3/4\" х 1/2\" в/н (латунь) (1 шт.)',
    id: "289560",
    price: "129",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/02/1981a55784f511ec8c95baf20bad8d43_32069c558e4511ec8c95baf20bad8d43.jpg",
    sku: "ДС.071643"
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "root" || settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "belt" || settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "tree",
    count: () => 1,

    name: "Фильтр для капельного полива сетчатый, линейный, 16мм (1 шт)",
    id: "290118",
    price: "479",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
    sku: "ДС.070951"
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "root" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "belt" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Таймер капельного полива электронный програмируемый на один канал",
    id: "290051",
    price: "1799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/edf42c717c0b11eb8c791a631b049b6a_044cddf77c0c11eb8c791a631b049b6a.jpg",
    sku: "ДС.070957",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "root" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "belt" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Таймер капельного полива электронно-механический програмируемый на один канал",
    id: "290050",
    price: "1799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/f67a4fe97c0a11eb8c791a631b049b6a_f67a4fea7c0a11eb8c791a631b049b6a.jpg",
    sku: "ДС.070956",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "root" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "belt" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes1" && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Набор для подключения таймера капельного полива (1 шт.)",
    id: "290123",
    price: "169",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/bf34db1d44a611ec8c92baf20bad8d43_9a9ea3ee44a711ec8c92baf20bad8d43.jpg",
    sku: "ДС.071355"
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "root" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "belt" || settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes2" && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Набор для подключения таймера капельного полива (1 шт.)",
    id: "290123",
    price: "169",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/bf34db1d44a611ec8c92baf20bad8d43_9a9ea3ee44a711ec8c92baf20bad8d43.jpg",
    sku: "ДС.071355"
  },
  // -----------Ленточный--------------- 

  // {

  //   condition: (settings, choosenScenario) => (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : +0)) * 1.15) <= 10 && choosenScenario === "belt",
  //   count: (settings) => 1,
  //   pipeLength: 10,
  //   originalName: 'Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)',
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)",
  //   id: "290092",
  //   price: "0",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) <= 12 && (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) > 10 && choosenScenario === "belt",
  //   count: (settings) => 1,
  //   pipeLength: 12,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 12м)",
  //   id: "290093",
  //   price: "10",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) <= 18 && (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) > 12 && choosenScenario === "belt",
  //   count: (settings) => 1,
  //   pipeLength: 18,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 18м)",
  //   id: "290094",
  //   price: "20",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) <= 25 && (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) > 18 && choosenScenario === "belt",
  //   count: (settings) => 1,
  //   pipeLength: 25,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 25м)",
  //   id: "290095",
  //   price: "30",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) <= 50 && (((+settings[Q_KOLVO_RYADOV] * +settings[Q_SHIRINA_MEJDU_RYADOV]) + (settings[Q_RASSTOYANIE_DO_VODI] ? +settings[Q_RASSTOYANIE_DO_VODI] : 0)) * 1.15) > 25 && choosenScenario === "belt",
  //   count: (settings) => 1,
  //   pipeLength: 50,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 50м)",
  //   id: "290096",
  //   price: "30",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  {
    condition: (settings, choosenScenario) =>
      ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) && choosenScenario === "belt",
    count: (settings) => Math.ceil(((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) / 50),
    name: "Лента капельного полива с эмиттерами 20 см (диаметр 16 мм) (бухта 50м)",
    id: "290075",
    price: "489",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/01cf7829691e11eb8c701a631b049b6a_1b3576657daf11ec8c95baf20bad8d43.jpg",
    sku: "ДС.060104",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Заглушка для ленты капельного полива (5 шт.)",
    id: "290066",
    price: "99",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/6c2e2448691711eb8c701a631b049b6a_6c2e2449691711eb8c701a631b049b6a.jpg",
    sku: "ДС.060087",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] <= 1 && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Тройник переходной с трубки капельного полива на капельную ленту (d 16) (1 шт.)",
    id: "290072",
    price: "59",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/94e2999f691c11eb8c701a631b049b6a_ab43cf05691c11eb8c701a631b049b6a.jpg",
    sku: "ДС.060092",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] > 1 && choosenScenario === "belt",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Тройник переходной с трубки капельного полива на капельную ленту (d 16) (5 шт.)",
    id: "290073",
    price: "99",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/94e2999f691c11eb8c701a631b049b6a_ab43cf05691c11eb8c701a631b049b6a.jpg",
    sku: "ДС.060092",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Заглушка для капельной трубки (2 шт.)",
    id: "290079",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
    sku: "ДС.060094",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Тройник для капельной трубки (1 шт)",
    id: "290081",
    mainId: "288224",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
    sku: "ДС.060095",
  },



  //-------Деревья----------
  // {

  //   condition: (settings, choosenScenario) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     if (choosenScenario === "tree") {
  //       return calcLength(length, pipes).indexOf(10) !== -1;
  //     }
  //   },
  //   count: (settings) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     return calcLength(length, pipes).filter(p => p === 10).length;
  //   },
  //   pipeLength: 10,
  //   originalName: 'Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)',
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 10м)",
  //   id: "290092",
  //   price: "0",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     if (choosenScenario === "tree") {
  //       return calcLength(length, pipes).indexOf(12) !== -1;
  //     }
  //   },
  //   count: (settings) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods)

  //     return calcLength(length, pipes).filter(p => p === 12).length;

  //   },
  //   pipeLength: 12,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 12м)",
  //   id: "290093",
  //   price: "10",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     if (choosenScenario === "tree") {
  //       return calcLength(length, pipes).indexOf(18) !== -1;
  //     }
  //   },
  //   count: (settings) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     return calcLength(length, pipes).filter(p => p === 18).length;
  //   },
  //   pipeLength: 18,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 18м)",
  //   id: "290094",
  //   price: "20",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => {

  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     if (choosenScenario === "tree") {
  //       return calcLength(length, pipes).indexOf(25) !== -1;
  //     }
  //   },
  //   count: (settings) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods)
  //     return calcLength(length, pipes).filter(p => p === 25).length;
  //   },
  //   pipeLength: 25,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 25м)",
  //   id: "290095",
  //   price: "30",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  // {

  //   condition: (settings, choosenScenario) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods);
  //     if (choosenScenario === "tree") {
  //       return calcLength(length, pipes).indexOf(50) !== -1;
  //     }
  //   },
  //   count: (settings) => {
  //     const length = getTreeLength(settings);
  //     const pipes = getPipes(goods)
  //     return calcLength(length, pipes).filter(p => p === 50).length;
  //   },
  //   pipeLength: 50,
  //   name: "Трубка капельного полива без эмиттеров (d 16, толщина стенки 1,3 мм) (бухта 50м)",
  //   id: "290096",
  //   price: "30",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  //   sku: 'ДС.060106'
  // },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] < 2 && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Тройник для капельной трубки (1 шт)",
    id: "290081",
    mainId: "288224",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2022/05/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
    sku: "ДС.060095",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] > 1 && choosenScenario === "tree",
    count: (settings) => Math.ceil(((+settings[Q_KOLVO_RASTENIY] * 2) - 1) / 5),
    name: "Тройник для капельной трубки (5 шт.)",
    id: "290082",
    mainId: "288224",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
    sku: "ДС.060095",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] > 0 && choosenScenario === "tree",
    count: (settings) => 1,
    name: "Уголок для капельной трубки (1 шт.)",
    id: "290084",
    price: "45",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4b9e534169e311eb8c701a631b049b6a_4b9e534269e311eb8c701a631b049b6a.jpg",
    sku: "ДС.060096",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] > 0 && choosenScenario === "tree",
    count: (settings) => Math.ceil((+settings[Q_KOLVO_RASTENIY] * 4) / 10),
    name: "Капельница с регулировкой вылива (0 -70 л/ч) (10 шт.)",
    id: "290115",
    price: "229",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4b9e534169e311eb8c701a631b049b6a_4b9e534269e311eb8c701a631b049b6a.jpg",
    sku: "ДС.060137",
  },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "tree",
  //   count: () => 1,

  //   name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
  //   id: "289503",
  //   price: "399",
  //   img: "https://masterprof-season.ru/wp-content/uploads/2021/09/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
  // },







];

export const getForUpdate = () => {
  return goods

}

export const getGoods = (settings, choosenScenario) => {
  return goods
    .filter((item) => {
      return item.condition(settings, choosenScenario);
    })
    .map((item) => {
      return {
        ...item,
        count: item.count(settings, choosenScenario),

      };

    });
};

// export const getGoods = (settings) => goods.filter((item)=>item.condition(settings))
