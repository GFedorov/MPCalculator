import React from "react";

function Debug({ steps, scenarioInfo }) {
  return (
    <div>
      {steps.map((step, index) => {
        return (
          <div key={index}>
            <h3>
              Шаг {index + 1} {step.text}
            </h3>
            <div>
              {step.questions.map((question, index2) => {
                return (
                  <div key={index2}>
                    <span>{question.text}</span>
                    <span>
                      {!!scenarioInfo[index] &&
                        !!scenarioInfo[index][index2] &&
                        scenarioInfo[index][index2]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Debug;
