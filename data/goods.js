import { Q_NEED_FILTER, Q_KOLVO_RYADOV, Q_NEED_PEREKRITIE } from "./steps";

const goods = [
  {
    condition: (settings) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes",
    count: () => 1,

    name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
    ID: "276980",
    img:
      "http://masterprof-season.ru/wp-content/uploads/2021/05/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
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
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "root",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для капельной трубки",
    ID: "276703",
    img:
      "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
  {
    condition: (settings, choosenScenario) =>
      settings[Q_NEED_PEREKRITIE] &&
      settings[Q_NEED_PEREKRITIE] === "yes" &&
      choosenScenario === "belt",
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для ленты капельного полива",
    ID: "277048",
    img:
      "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
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
