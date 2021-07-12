const Stepper = ({ step, totStep }) => {
  return (
    <div className="stepper">
      <div
        className="stepper__segment"
        style={{
          width: Math.round(100 / totStep, 2) + "%",
          left: Math.round((100 * (step - 1)) / totStep, 2) + "%",
        }}
      >
        Шаг ({step}/{totStep})
      </div>
    </div>
  );
};

export default Stepper;
