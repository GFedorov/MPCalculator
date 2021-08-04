import {
  Q_NEED_FILTER,
  Q_KOLVO_RYADOV,
  Q_NEED_PEREKRITIE,
  Q_DLINNA_POSADKI,
  Q_SHIRINA_MEJDU_RYADOV,
  Q_SHIRINA_BETWEEN_PLANT,
} from "./steps";

const goods = [
  {
    condition: (settings) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes",
    count: () => 1,

    name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
    id: "276980",
    price: "300",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
  },
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
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
        10 && choosenScenario === "root",
    count: () => 1,
    name: "Намотка для трубки капельного полива 10м",
    id: "277063",
    price: "100",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
        13 &&
      choosenScenario === "root" &&
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
        10,

    count: () => 1,
    name: "Намотка для трубки капельного полива 12м",
    id: "277065",
    price: "120",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
        19 &&
      choosenScenario === "root" &&
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
        12,

    count: () => 1,
    name: "Намотка для трубки капельного полива 18м",
    id: "277067",
    price: "180",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
        26 &&
      choosenScenario === "root" &&
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
        18,

    count: () => 1,
    name: "Намотка для трубки капельного полива 25м",
    id: "277071",
    price: "250",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] <
        51 &&
      choosenScenario === "root" &&
      settings[Q_KOLVO_RYADOV] * settings[Q_DLINNA_POSADKI] +
        (settings[Q_KOLVO_RYADOV] - 1) * settings[Q_SHIRINA_MEJDU_RYADOV] >
        25,

    count: () => 1,
    name: "Намотка для трубки капельного полива 50м",
    id: "277069",
    price: "500",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "root",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для капельной трубки",
    id: "276705",
    price: "79",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "belt",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для ленты капельного полива",
    id: "277048",
    price: "200",
    img: "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
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
