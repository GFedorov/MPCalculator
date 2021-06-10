const Question = ({ item, setAnswer }) => {
  return (
    <div className="question">
      <div className="question__text">{item.text}</div>
      <div className="question__answer">
        {item.type === "buttons" &&
          item.options.map((option) => (
            <span onClick={() => setAnswer(option.name)} key={option.name}>
              {option.text}
            </span>
          ))}
        {item.type === "number" && (
          <input type="text" onChange={(e) => setAnswer(e.target.value)} />
        )}
      </div>
    </div>
  );
};

export default Question;
