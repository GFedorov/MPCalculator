export const Q_NEED_FILTER = "need_filter";
export const Q_KOLVO_RYADOV = "kolvo_ryadov";
export const Q_NEED_PEREKRITIE = "need_perekritie_vodi";
export const Q_DLINNA_POSADKI = "dlinna_posadki";
export const Q_SHIRINA_MEJDU_RYADOV = "shirina_mejdu_ryadov";
export const Q_SHIRINA_BETWEEN_PLANT = "shirina_between_plant";

const rootSteps = [
  {
    text: "Размер посадки в метрах",
    questions: [
      {
        name: Q_DLINNA_POSADKI,
        text: "Длина ряда (м)",
        description: "Длина предполагаемой грядки",
        type: "number",
        id: "row-length",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 100"];
          }
          return [true];
        },
      },

      {
        name: Q_SHIRINA_MEJDU_RYADOV,
        text: "Ширина между рядами (м)",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 3) {
            return [false, "Ширина не может быть больше 1м"];
          }
          return [true];
        },
      },

      {
        name: Q_SHIRINA_BETWEEN_PLANT,
        text: "Ширина между растениями (м)",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете длинну",
          },

          {
            name: "0,1",
            text: "0.1",
          },
          {
            name: "0,2",
            text: "0.2",
          },

          {
            name: "0,3",
            text: "0.3",
          },

          {
            name: "0,4",
            text: "0.4",
          },

          {
            name: "0,5",
            text: "0.5",
          },

          {
            name: "0,6",
            text: "0.6",
          },

          {
            name: "0,7",
            text: "0.7",
          },

          {
            name: "0,8",
            text: "0.8",
          },

          {
            name: "0,9",
            text: "0.9",
          },

          {
            name: "1",
            text: "1",
          },
        ],
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
          }
          if (val > 1) {
            return [false, "Ширина не может быть > 1"];
          }
          return [true];
        },
      },

      // {
      //   name: "shirina_posadki",
      //   text: "Ширина посадки",
      //   description: "Именно ширина между крайними растениями ряда",
      //   type: "number",
      //   validation: (val) => {
      //     if (val < 0) {
      //       return [false, "Ширина не может быть < 0"];
      //     }
      //     if (val > 3) {
      //       return [false, "Ширина не может быть > 3"];
      //     }
      //     return [true];
      //   },
      // },

      {
        name: Q_KOLVO_RYADOV,
        text: "Количество рядов",
        type: "number",
        value: 2,
        validation: (val) => {
          if (val < 0) {
            return [false, "Количество не может быть < 1"];
          }
          if (val > 20) {
            return [false, "Количество не может быть > 20"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: Q_NEED_PEREKRITIE,
        text: "Нужна ли возможность перекрытия воды к отдельным рядам?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
  {
    text: "Количество растений",
    questions: [
      {
        name: "kolvo_rasteniy",
        text: "Количество растений",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Растений не может быть < 0"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "Источник воды",
    questions: [
      {
        name: "rasstoyanie_do_vodi",
        text: "Расстояние до источника воды",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Расстояние не может быть < 0"];
          }
          return [true];
        },
      },
      {
        name: "podkluchenie_k_vode",
        text: "Тип подключения?",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете тип",
          },

          {
            name: "1_2f",
            text: "1/2 внутренная",
          },
          {
            name: "1_2m",
            text: "1/2 внешняя",
          },
          {
            name: "3_4f",
            text: "3/4 внутренная",
          },
          {
            name: "3_4m",
            text: "3/4 внешняя",
          },
        ],
      },
    ],
  },

  {
    text: "",
    questions: [
      {
        name: Q_NEED_FILTER,
        text: "Нужен ли фильтр для воды?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: "need_timer",
        text: "Нужна ли таймер для автоматического полива?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
];
const beltSteps = [
  {
    text: "Размер посадки в метрах",
    questions: [
      {
        name: "dlina_posadki",
        text: "Длина ряда (м)",
        description: "Длина предполагаемой грядки",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 100"];
          }
          return [true];
        },
      },

      {
        name: "shirina_mejdu_ryadov",
        text: "Ширина между рядами (м)",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 3) {
            return [false, "Ширина не может быть > 3"];
          }
          return [true];
        },
      },

      {
        name: "shirina_between_plant",
        text: "Ширина между растениями (м)",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете длинну",
          },

          {
            name: "0,1",
            text: "0.1",
          },
          {
            name: "0,2",
            text: "0.2",
          },

          {
            name: "0,3",
            text: "0.3",
          },

          {
            name: "0,4",
            text: "0.4",
          },

          {
            name: "0,5",
            text: "0.5",
          },

          {
            name: "0,6",
            text: "0.6",
          },

          {
            name: "0,7",
            text: "0.7",
          },

          {
            name: "0,8",
            text: "0.8",
          },

          {
            name: "0,9",
            text: "0.9",
          },

          {
            name: "1",
            text: "1",
          },
        ],
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
          }
          if (val > 1) {
            return [false, "Ширина не может быть > 1"];
          }
          return [true];
        },
      },

      {
        name: Q_KOLVO_RYADOV,
        text: "Количество рядов",
        type: "number",
        value: 2,
        validation: (val) => {
          if (val < 0) {
            return [false, "Количество не может быть < 1"];
          }
          if (val > 20) {
            return [false, "Количество не может быть > 20"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: "need_perekritie_vodi",
        text: "Нужна ли возможность перекрытия воды к отдельным рядам?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },

  {
    text: "Источник воды",
    questions: [
      {
        name: "rasstoyanie_do_vodi",
        text: "Расстояние до источника воды",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Расстояние не может быть < 0"];
          }
          return [true];
        },
      },
      {
        name: "podkluchenie_k_vode",
        text: "Тип подключения?",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете тип",
          },

          {
            name: "1_2f",
            text: "1/2 внутренная",
          },
          {
            name: "1_2m",
            text: "1/2 внешняя",
          },
          {
            name: "3_4f",
            text: "3/4 внутренная",
          },
          {
            name: "3_4m",
            text: "3/4 внешняя",
          },
        ],
      },
    ],
  },

  {
    text: "",
    questions: [
      {
        name: Q_NEED_FILTER,
        text: "Нужен ли фильтр для воды?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: "need_timer",
        text: "Нужна ли таймер для автоматического полива?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
];
const treeSteps = [
  {
    text: "Размер посадки в метрах",
    questions: [
      {
        name: "dlina_posadki",
        text: "Длина ряда (м)",
        description: "Длина предполагаемой грядки",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 100"];
          }
          return [true];
        },
      },

      {
        name: "shirina_mejdu_ryadov",
        text: "Ширина между рядами (м)",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 3) {
            return [false, "Ширина не может быть > 3"];
          }
          return [true];
        },
      },

      {
        name: "shirina_between_plant",
        text: "Ширина между растениями (м)",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете длинну",
          },

          {
            name: "0,1",
            text: "0.1",
          },
          {
            name: "0,2",
            text: "0.2",
          },

          {
            name: "0,3",
            text: "0.3",
          },

          {
            name: "0,4",
            text: "0.4",
          },

          {
            name: "0,5",
            text: "0.5",
          },

          {
            name: "0,6",
            text: "0.6",
          },

          {
            name: "0,7",
            text: "0.7",
          },

          {
            name: "0,8",
            text: "0.8",
          },

          {
            name: "0,9",
            text: "0.9",
          },

          {
            name: "1",
            text: "1",
          },
        ],
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
          }
          if (val > 1) {
            return [false, "Ширина не может быть > 1"];
          }
          return [true];
        },
      },

      // {
      //   name: "shirina_posadki",
      //   text: "Ширина посадки",
      //   description: "Именно ширина между крайними растениями ряда",
      //   type: "number",
      //   validation: (val) => {
      //     if (val < 0) {
      //       return [false, "Ширина не может быть < 0"];
      //     }
      //     if (val > 3) {
      //       return [false, "Ширина не может быть > 3"];
      //     }
      //     return [true];
      //   },
      // },

      {
        name: Q_KOLVO_RYADOV,
        text: "Количество рядов",
        type: "number",
        value: 2,
        validation: (val) => {
          if (val < 0) {
            return [false, "Количество не может быть < 1"];
          }
          if (val > 20) {
            return [false, "Количество не может быть > 20"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: Q_NEED_PEREKRITIE,
        text: "Нужна ли возможность перекрытия воды к отдельным рядам?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
  {
    text: "Количество растений",
    questions: [
      {
        name: "kolvo_rasteniy",
        text: "Количество растений",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Растений не может быть < 0"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "Источник воды",
    questions: [
      {
        name: "rasstoyanie_do_vodi",
        text: "Расстояние до источника воды",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Расстояние не может быть < 0"];
          }
          return [true];
        },
      },
      {
        name: "podkluchenie_k_vode",
        text: "Тип подключения?",
        type: "select",
        options: [
          {
            name: "",
            text: "Выберете тип",
          },

          {
            name: "1_2f",
            text: "1/2 внутренная",
          },
          {
            name: "1_2m",
            text: "1/2 внешняя",
          },
          {
            name: "3_4f",
            text: "3/4 внутренная",
          },
          {
            name: "3_4m",
            text: "3/4 внешняя",
          },
        ],
      },
    ],
  },

  {
    text: "",
    questions: [
      {
        name: Q_NEED_FILTER,
        text: "Нужен ли фильтр для воды?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
  {
    text: "",
    questions: [
      {
        name: "need_timer",
        text: "Нужна ли таймер для автоматического полива?",
        type: "buttons",
        options: [
          {
            name: "yes",
            text: "Да",
          },
          {
            name: "no",
            text: "Нет",
          },
        ],
      },
    ],
  },
];

export const scenario = {
  text: "ЧТО БУДЕТЕ ПОЛИВАТЬ?",
  type: "buttons",
  options: [
    {
      name: "root",
      type: "pomodoro",
      extraClasses: "question__btn_root pt-70",
      text: "Прикорневой полив",
      description: ["Для доставки воды непосредственно к корню "],
    },
    {
      name: "belt",
      type: "belt",
      extraClasses: "question__btn_belt pt-70",
      text: "Ленточный полив",
      description: ["Орошение по всей длине грядки от бочки"],
    },
    {
      name: "tree",
      type: "tree",
      extraClasses: "question__btn_tree pt-70",
      text: "Трубчатый полив",
      description: ["Подходит для кустарников и деревьев"],
    },
  ],
};
export const scenarioAnswers = {
  root: rootSteps,
  belt: beltSteps,
  tree: treeSteps,
};
