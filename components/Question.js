import { useMainContext } from "./context/Main";


const Question = ({

  item,
  setAnswer,
  currentAnswer,
  setFocusedEl,
  focusedEl,
  settings,
  isHidden
}) => {
  const { stat } = useMainContext();


  return (
    <div className={`question ${(isHidden) ? "hidden" : ""}`}>
      <div className={`question__text question__text_${item.type} `}>
        {item.text}
      </div>
      <div className="question__answer">
        {item.type === "buttons" &&
          item.options.map((option) => (
            <span
              onClick={() => { setAnswer(option.name); option.name === 'root' ? stat("Прикорневой полив") : '' }}
              key={option.name}
              className={`question__btn ${!!option.extraClasses ? option.extraClasses : ""
                } ${currentAnswer === option.name ? "question__btn_active" : ""}`}
            >
              <span className="question__btn__check"></span>
              {!!option.img &&
                <img src={option.img} className='question__btn__img' />
              }
              <p className="question__btn__text">{option.text}</p>

              <p className="question__btn__desc">{option.description}</p>
            </span>
          ))}
        {item.type === "number" && (
          <input
            type="number"
            min={0}
            max={300}
            maxlength={"3"}
            step={0.1}
            id={item.id}
            value={item.value || currentAnswer}
            onChange={(e) => {
              if (e.target.value.length > 3) {
                return false
              }
              setAnswer(e.target.value)
            }}
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
        {item.type === "number-int" && (
          <input
            type="number"
            min={0}
            max={300}
            maxlength={"3"}
            step={1}
            id={item.id}
            value={item.value || currentAnswer}
            onChange={(e) => {
              if (e.target.value.length > 3) {
                return false
              }
              setAnswer(e.target.value)
            }}
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


              setTimeout(() => {
                if (focusedEl === item.name) {
                  setFocusedEl(null);
                }
              }, 3000);
            }}
          >
            {item.options.map((option) => (
              <option key={option.name} value={option.name}

                selected={currentAnswer === option.name}
              >{option.text}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Question;
