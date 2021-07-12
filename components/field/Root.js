import SvgField from "./Svg";

const RootField = ({ settings, choosenScenario }) => {
  const {
    razmer_posadki = "0", //
    dlina_posadki = "0", //длинна грядки по горизонтали
    shirina_posadki = "0", //высота грядки
    shirina_ryadov = "0",
    kolvo_ryadov = "0",
    need_perekritie_vodi = "no",
    kolvo_rasteniy = "0",
    rasstoyanie_do_vodi = "0",
    shirina_mejdu_ryadov = "0",
    shirina_between_plant = "0",
    need_filter = "no",
    need_timer = "no",
  } = settings;

  const widthK = 300; // коэффициент ширины, во сколько раз нужно увеличить dlina_posadki, чтобы получилась ширина
  const heightK = 100; // коэффициент ширины, во сколько раз нужно увеличить shirina_posadki и shirina_ryadov, чтобы получилась соотв. высота
  const rowGap = shirina_ryadov * heightK;

  const rows = [];
  for (let i = 0; i < +kolvo_ryadov; i++) {
    rows.push({
      width: dlina_posadki * widthK,
      height: shirina_posadki * heightK,
      needPerekritie: need_perekritie_vodi === "yes",
    });
  }
  const fullHeight =
    kolvo_ryadov * shirina_posadki * heightK + rowGap * (kolvo_ryadov - 1);
  const fullWidth = dlina_posadki * widthK;
  let type = choosenScenario || "hole";
  return (
    <>
      <SvgField
        {...{
          kolvo_rasteniy,
          need_perekritie_vodi,
          dlina_posadki,
          rasstoyanie_do_vodi,
          shirina_mejdu_ryadov,
          shirina_between_plant,
          kolvo_ryadov,
          need_filter,
          need_timer,
          type,
        }}
      />
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
      {/* <div className="field">
        <div
          className="rows"
          style={{ height: `${fullHeight}px`, width: `${fullWidth}px` }}
        >
          {rows.map((row) => (
            <div
              className="rows__item"
              style={{ height: `${row.height}px`, width: `${row.width}px` }}
            >
              {row.needPerekritie && (
                <div className="rows__blocker">Перекрытие</div>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default RootField;
