const Question = ({
  item,
  setAnswer,
  currentAnswer,
  setFocusedEl,
  focusedEl,
}) => {
  return (
    <div className="question">
      <div className={`question__text question__text_${item.type} `}>
        {item.text}
      </div>
      <div className="question__answer">
        {item.type === "buttons" &&
          item.options.map((option) => (
            <span
              onClick={() => setAnswer(option.name)}
              key={option.name}
              className={`question__btn ${
                !!option.extraClasses ? option.extraClasses : ""
                } ${currentAnswer === option.name ? "question__btn_active" : ""}`}
            >
              <span className="question__btn__check"></span>
              <p className="question__btn__text">{option.text}</p>

              <p className="question__btn__desc">{option.description}</p>
            </span>
          ))}
        {item.type === "number" && (
          <input
            type="number"
            id={item.id}
            //value={item.value}
            onChange={(e) => setAnswer(e.target.value)}
            onFocus={(e) => {
              setFocusedEl(item.name);
              setTimeout(() => {
                setFocusedEl((focusedEl) => {
                  if (focusedEl === item.name) {
                    return null;
                  } else return focusedEl
                    ;
                });
              }, 4000);
            }}
          />
        )}
        {item.type === "select" && (
          <select
            onChange={(e) => setAnswer(e.target.value)}
            onFocus={(e) => {
              setFocusedEl(item.name);
              console.log(e.target.value)

              setTimeout(() => {
                if (focusedEl === item.name) {
                  setFocusedEl(null);
                }
              }, 3000);
            }}
          >
            {item.options.map((option) => (
              <option key={option.name}>{option.text}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Question;
