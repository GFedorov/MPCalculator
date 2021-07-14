import { Q_NEED_FILTER, Q_KOLVO_RYADOV } from "./steps";

const goods = [
  {
    condition: (settings) =>
      settings[Q_NEED_FILTER] && settings[Q_NEED_FILTER] === "yes",
    count: () => 1,
    name: "Фильтр для капельного полива сетчатый, линейный, 16мм",
    img:
      "http://masterprof-season.ru/wp-content/uploads/2021/05/11d5e1a97b5511eb8c791a631b049b6a_31855328b4b211eb8c7f1a631b049b6a.jpg",
  },
  {
    condition: (settings) =>
      settings[Q_KOLVO_RYADOV] && settings[Q_KOLVO_RYADOV] > 1,
    count: (settings) => settings[Q_KOLVO_RYADOV],
    name: "Кран проходной для капельной трубки",
    img:
      "http://masterprof-season.ru/wp-content/uploads/2021/05/a20d35eb69e711eb8c701a631b049b6a_a20d35ec69e711eb8c701a631b049b6a.jpg",
  },
];

export const getGoods = (settings) => {
  return goods
    .filter((item) => {
      return item.condition(settings);
    })
    .map((item) => {
      return {
        ...item,
        count: item.count(settings),
      };
    });
};

// export const getGoods = (settings) => goods.filter((item)=>item.condition(settings))
