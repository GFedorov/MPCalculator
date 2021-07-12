const rootSteps = [
  {
    text: "Размер посадки в метрах",
    questions: [
      {
        name: "dlina_posadki",
        text: "Длина ряда",
        description: "Длина предполагаемой грядки",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 20"];
          }
          return [true];
        },
      },

      {
        name: "shirina_mejdu_ryadov",
        text: "Ширина между рядами",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Ширина не может быть > 3"];
          }
          return [true];
        },
      },

      {
        name: "shirina_between_plant",
        text: "Ширина между растениями",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
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
        name: "kolvo_ryadov",
        text: "Количество рядов",
        type: "number",
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
        name: "need_filter",
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
    text: "Укажите характеристики",
    questions: [
      {
        name: "razmer_posadki",
        text: "Размер посадки в метрах",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
          }
          return [true];
        },
      },
      {
        name: "dlina_posadki",
        text: "Длина посадки растений",
        description: "Длина предполагаемой грядки",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 20"];
          }
          return [true];
        },
      },
      {
        name: "shirina_posadki",
        text: "Ширина посадки",
        description: "Именно ширина между крайними растениями ряда",
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
        name: "shirina_ryadov",
        text: "Ширина между рядами",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Ширина не может быть > 3"];
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
    text: "Количество растений",
    questions: [
      {
        name: "kolvo_rasteniy",
        text: "Укажите количество растений",
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
    text: "Расстояние до воды",
    questions: [
      {
        name: "rasstoyanie_do_vodi",
        text: "Укажите расстояние до источника воды",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Расстояние не может быть < 0"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "Какое подключение к источнику воды",
    questions: [
      {
        name: "podkluchenie_k_vode",
        text: "Какое нужно подключение к источнику воды?",
        type: "buttons",
        options: [
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
            text: "3_4 внутренная",
          },
          {
            name: "3_4m",
            text: "3_4 внешняя",
          },
        ],
      },
    ],
  },
  {
    text: "Нужен фильтр",
    questions: [
      {
        name: "need_filter",
        text: "Нужна ли фильтр для очистки воды?",
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
    text: "Нужен таймер",
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
    text: "Укажите характеристики",
    questions: [
      {
        name: "razmer_posadki",
        text: "Размер посадки в метрах",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Размер посадки не может быть < 0"];
          }
          return [true];
        },
      },
      {
        name: "dlina_posadki",
        text: "Длина посадки растений",
        description: "Длина предполагаемой грядки",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Длина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Длина не может быть > 20"];
          }
          return [true];
        },
      },
      {
        name: "shirina_posadki",
        text: "Ширина посадки",
        description: "Именно ширина между крайними растениями ряда",
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
        name: "shirina_ryadov",
        text: "Ширина между рядами",
        description: "Расстояние между рядами",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Ширина не может быть < 0"];
          }
          if (val > 20) {
            return [false, "Ширина не может быть > 3"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "Возможность перекрытия воды",
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
    text: "Количество растений",
    questions: [
      {
        name: "kolvo_rasteniy",
        text: "Укажите количество растений",
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
    text: "Расстояние до воды",
    questions: [
      {
        name: "rasstoyanie_do_vodi",
        text: "Укажите расстояние до источника воды",
        type: "number",
        validation: (val) => {
          if (val < 0) {
            return [false, "Расстояние не может быть < 0"];
          }
          return [true];
        },
      },
    ],
  },
  {
    text: "Какое подключение к источнику воды",
    questions: [
      {
        name: "podkluchenie_k_vode",
        text: "Какое нужно подключение к источнику воды?",
        type: "buttons",
        options: [
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
            text: "3_4 внутренная",
          },
          {
            name: "3_4m",
            text: "3_4 внешняя",
          },
        ],
      },
    ],
  },
  {
    text: "Нужен фильтр",
    questions: [
      {
        name: "need_filter",
        text: "Нужна ли фильтр для очистки воды?",
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
    text: "Нужен таймер",
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
