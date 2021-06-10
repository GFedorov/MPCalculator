const rootSteps = [
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
      {
        name: "kolvo_ryadov",
        text: "Количество рядов растений",
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
];
const beltSteps = [];
const treeSteps = [];

export const scenario = {
  text: "Что будете поливать?",
  type: "buttons",
  options: [
    {
      name: "root",
      text: "Прикорневой полив",
      description: [
        "помидоры, огурцы, перец, и пр.",
        "предназначен для доставки воды непосредственно к корню растения от бочки",
      ],
    },
    {
      name: "belt",
      text: "Ленточный полив",
      description: ["Равномерное орошение по всей длине грядки от бочки"],
    },
    {
      name: "tree",
      text: "Для деревьев",
    },
  ],
};
export const scenarioAnswers = {
  root: rootSteps,
  belt: beltSteps,
  tree: treeSteps,
};
