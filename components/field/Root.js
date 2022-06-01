import SvgField from "./Svg";

const RootField = ({ settings, choosenScenario }) => {
  const {
    razmer_posadki = "0", //
    dlina_posadki = "0", //длина грядки по горизонтали
    shirina_posadki = "0", //высота грядки
    shirina_ryadov = "0",
    //kolvo_ryadov = "0",
    need_perekritie_vodi = "no",
    kolvo_rasteniy = "0",
    rasstoyanie_do_vodi = "0",
    shirina_mejdu_ryadov = "0",
    shirina_between_plant = "0",
    need_filter = "no",
    need_timer = "no",
  } = settings;

  let type = choosenScenario || "hole";
  return (
    <>
      <SvgField
        {...{
          ...settings,
          kolvo_rasteniy,
          need_perekritie_vodi,
          dlina_posadki,
          rasstoyanie_do_vodi,
          shirina_mejdu_ryadov,
          shirina_between_plant,
          //kolvo_ryadov,
          // need_filter,
          need_timer,
          type,
        }}
      />
    </>
  );
};

export default RootField;
