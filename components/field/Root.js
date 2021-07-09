import SvgField from "./Svg";

const RootField = ({ settings, choosenScenario }) => {
  const {
    razmer_posadki = "1", //
    dlina_posadki = "2", //длинна грядки по горизонтали
    shirina_posadki = "2", //высота грядки
    shirina_ryadov = "3",
    kolvo_ryadov = "10",
    need_perekritie_vodi = "yes",
    kolvo_rasteniy = "10",
    rasstoyanie_do_vodi = "5",
    shirina_mejdu_ryadov = "2",
    shirina_between_plant = "1",
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
