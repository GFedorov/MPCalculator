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
} from "./steps";

export const sum = (x) => {
  let s = 0;
  for (let j = 0; j < x.length; j++) {
    s += x[j].price * x[j].count;
  }
  return s;
};

const goods = [

  // {
  //   condition: (settings) =>
  //     settings[Q_KOLVO_RYADOV] && settings[Q_KOLVO_RYADOV] > 1,
  //   count: (settings) => settings[Q_KOLVO_RYADOV],
  //   name: "несколько рядов",
  //   img:
  //     "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
      (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
      0 && choosenScenario === "root",
    count: (settings) => Math.ceil((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
      (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV]) / 10),
    name: "Намотка для трубки капельного полива 10м",
    id: "285231",
    price: "100",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] <= 2 && choosenScenario === "root",
    count: (settings) => 1,
    name: "Заглушка для капельной трубки 2 шт",
    id: "288414",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] > 2 && choosenScenario === "root",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Заглушка для капельной трубки 5 шт",
    id: "288415",
    price: "59",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] < 1 && settings[Q_KOLVO_RYADOV] >= 2 && settings[Q_KOLVO_RYADOV] && choosenScenario === "root",
    count: (settings) => 1,
    name: "Тройник для капельной трубки 1 шт",
    id: "289458",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] >= 3 && choosenScenario === "root",
    count: (settings) => Math.ceil((settings[Q_KOLVO_RYADOV] - 1) / 5),
    name: "Тройник для капельной трубки 5 шт",
    id: "288416",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] > 1 && choosenScenario === "root",
    count: (settings) => 2,
    name: "Уголок для капельной трубки",
    id: "289459",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4b9e534169e311eb8c701a631b049b6a_4b9e534269e311eb8c701a631b049b6a.jpg",
  },


  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     13 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     10,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 12м",
  //   id: "277065",
  //   price: "120",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     19 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     12,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 18м",
  //   id: "277067",
  //   price: "180",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     21 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     18,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 10м+10м",
  //   id: "277063,277063",
  //   price: "180",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     26 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     18,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 25м",
  //   id: "277071",
  //   price: "250",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     51 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     25,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 50м",
  //   id: "277069",
  //   price: "500",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     61 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     50,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 50м+10м",
  //   id: "277069,277063",
  //   price: "600",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     71 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     60,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 50м+10м+10м",
  //   id: "277069,277063,277063",
  //   price: "700",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     76 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     70,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 50м+25м",
  //   id: "277069,277071",
  //   price: "750",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  // {
  //   condition: (settings, choosenScenario) =>
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
  //     76 &&
  //     choosenScenario === "root" &&
  //     settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
  //     (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
  //     70,

  //   count: () => 1,
  //   name: "Намотка для трубки капельного полива 50м+50м",
  //   id: "277069,277069",
  //   price: "750",
  //   img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  // },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "root",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для капельной трубки",
    id: "289462",
    price: "79",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },

  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] && choosenScenario === "root",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RASTENIY] / 4),
    name: "Капельницы индивидуального полива растений с трубкой и адаптером 4 шт",
    id: "288438",
    price: "121",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/f3a2b5fd71d711eb8c701a631b049b6a_e88f6a1871d911eb8c701a631b049b6a-scaled.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RASTENIY] && choosenScenario === "root",
    count: (settings) => 1,
    name: "Дырокол для установки индивидуальных капельниц",
    id: "289463",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/4ba66fa169e811eb8c701a631b049b6a_46bb31fa69e911eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "root",
    count: () => 1,

    name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
    id: "289503",
    price: "399",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes" && choosenScenario === "root",
    count: (settings) => 1,
    name: "Таймер электронно-механический програмируемый на один канал",
    id: "289397",
    price: "1799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/f67a4fe97c0a11eb8c791a631b049b6a_f67a4fea7c0a11eb8c791a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes" && choosenScenario === "root",
    count: (settings) => 1,
    name: "Набор для подключения таймера капельного полива",
    id: "289510",
    price: "139",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/bf34db1d44a611ec8c92baf20bad8d43_9a9ea3ee44a711ec8c92baf20bad8d43.jpg",
  },
  // -----------Ленточный--------------- 
  {
    condition: (settings, choosenScenario) =>
      ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) <= 50 && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Лента капельного полива с эмиттерами 20 см (диаметр 16 мм) 50м",
    id: "288410",
    price: "399",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/01cf7829691e11eb8c701a631b049b6a_1b3576657daf11ec8c95baf20bad8d43.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) > 50 && ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) <= 100 && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Лента капельного полива с эмиттерами 20 см (диаметр 16 мм) 50м",
    id: "288408",
    price: "799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/01cf7829691e11eb8c701a631b049b6a_1b3576657daf11ec8c95baf20bad8d43.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) > 100 && ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) <= 150 && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Лента капельного полива с эмиттерами 20 см (диаметр 16 мм) 50м + 100м",
    id: "288408,288410",
    price: "1198",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/01cf7829691e11eb8c701a631b049b6a_1b3576657daf11ec8c95baf20bad8d43.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) > 150 && ((settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI]) * 1.15) <= 200 && choosenScenario === "belt",
    count: (settings) => 2,
    name: "Лента капельного полива с эмиттерами 20 см (диаметр 16 мм) 100м + 100м",
    id: "288408",
    price: "799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/01cf7829691e11eb8c701a631b049b6a_1b3576657daf11ec8c95baf20bad8d43.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Заглушка для ленты капельного полива (5шт)",
    id: "288402",
    price: "2600",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/6c2e2448691711eb8c701a631b049b6a_6c2e2449691711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] <= 1 && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Тройник переходной с трубки капельного полива на капельную ленту (d 16)",
    id: "289457",
    price: "49",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/94e2999f691c11eb8c701a631b049b6a_ab43cf05691c11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] >= 5 && choosenScenario === "belt",
    count: (settings) => Math.ceil(settings[Q_KOLVO_RYADOV] / 5),
    name: "Тройник переходной с трубки капельного полива на капельную ленту (d 16) 5шт",
    id: "288407",
    price: "49",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/94e2999f691c11eb8c701a631b049b6a_ab43cf05691c11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Заглушка для капельной трубки 2 шт",
    id: "288414",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/00551447696c11eb8c701a631b049b6a_5ca34993696c11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] && settings[Q_KOLVO_RYADOV] && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Тройник для капельной трубки 1 шт",
    id: "289458",
    price: "29",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/544dd98469e211eb8c701a631b049b6a_544dd98569e211eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "belt",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для ленты капельного полива",
    id: "288207",
    price: "79",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/22fa7466691d11eb8c701a631b049b6a_22fa7467691d11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_RASSTOYANIE_DO_VODI] <= 25 &&
      choosenScenario === "belt",
    count: (settings) => 1,
    name: "Трубка капельного полива без эмиттеров 25 м",
    id: "288419",
    price: "599",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/c56784ae69ec11eb8c701a631b049b6a_e64f216269ec11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_RASSTOYANIE_DO_VODI] < 50 && settings[Q_RASSTOYANIE_DO_VODI] > 25 &&
      choosenScenario === "belt",
    count: (settings) => 1,
    name: "Трубка капельного полива без эмиттеров 50 м",
    id: "288420",
    price: "0",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/c56784ae69ec11eb8c701a631b049b6a_e64f216269ec11eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_PODKLUCHENIE_K_VODE] === "1/2 внешняя" &&
      choosenScenario === "belt",
    count: (settings) => 1,
    name: 'Кран 1/2" внутр. х 16 мм',
    id: "289460",
    price: "129",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/534bdd2669e611eb8c701a631b049b6a_534bdd2769e611eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes" && choosenScenario === "belt",
    count: () => 1,

    name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
    id: "289503",
    price: "399",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes" && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Таймер электронно-механический програмируемый на один канал",
    id: "289397",
    price: "1799",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/09/f67a4fe97c0a11eb8c791a631b049b6a_f67a4fea7c0a11eb8c791a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_TIMER] && settings[Q_NEED_TIMER] === "yes" && choosenScenario === "belt",
    count: (settings) => 1,
    name: "Набор для подключения таймера капельного полива",
    id: "289510",
    price: "139",
    img: "https://masterprof-season.ru/wp-content/uploads/2021/11/bf34db1d44a611ec8c92baf20bad8d43_9a9ea3ee44a711ec8c92baf20bad8d43.jpg",
  },



];

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
