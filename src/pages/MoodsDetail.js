import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getHomeMoods } from "../service/moodsApi";
import { getMoodsDetail } from "../service/moodsApi";
import { getQuickPickMoods } from "../service/moodsApi";
import TextSlide from "../components/textSlide/TextSlide";
import SongSlide from "../components/SongSlide/SongSlide";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";

function MoodsDetail() {
  return `
  <div class="p-2">
    <section id="moods-btn-wrapper">
    </section>
    <h1 id="moods-energized-title" class="text-white font-bold text-[45px] mb-4"></h1>
    <p id="moods-energized-sub-title" class="text-white"></p>
    <section id="moods-quickpick" class="mt-10 lg:mt-20">
    </section>
    <section id="moods-featured" class="mt-10 lg:mt-20">
    </section>
    <section id="moods-morepicks" class="mt-10 lg:mt-20">
    </section>

  </div>
  `;
}

export default MoodsDetail;

const $ = document.querySelector.bind(document);

const render = async (slug) => {
  const moodsBtnWrapper = $("#moods-btn-wrapper");
  const moodsEnergizeTitle = $("#moods-energized-title");
  const moodsEnergizeSubTitle = $("#moods-energized-sub-title");
  const moodsQuickpick = $("#moods-quickpick");
  const moodsFeatured = $("#moods-featured");
  const moodsMorepicks = $("#moods-morepicks");
  //Lấy dữ liệu
  const moodsData = await getHomeMoods();
  const quickpickMoodsData = await getQuickPickMoods(slug);
  const moodsDetailData = await getMoodsDetail(slug);

  //Render ra giao diện
  moodsBtnWrapper.innerHTML = `${TextSlide(moodsData.items, slug)}`;
  moodsQuickpick.innerHTML = `${QuickPickSlide(
    "Quick Picks",
    "/playlists/details",
    "quickpick",
    quickpickMoodsData
  )}`;
  moodsEnergizeTitle.innerHTML = `${escapeHTML(moodsDetailData.hero.title)}`;
  moodsEnergizeSubTitle.innerHTML = `${escapeHTML(
    moodsDetailData.hero.subtitle
  )}`;
  moodsFeatured.innerHTML = `${SongSlide(
    moodsDetailData.sections[0].title,
    "/playlists/details",
    moodsDetailData.sections[0].items
  )}`;
  moodsMorepicks.innerHTML = `${SongSlide(
    moodsDetailData.sections[1].title,
    "/playlists/details",
    moodsDetailData.sections[1].items
  )}`;
};

const controlScroll = () => {
  controlSlide("#moods-btn-wrapper");
  controlSlide("#moods-quickpick");
  controlSlide("#moods-featured");
  controlSlide("#moods-morepicks");
};

export const afterRenderMoodsDetail = async (slug) => {
  //Xử lý trước khi render
  handleBeforeRender();
  try {
    await render(slug);
    controlScroll();
    router.updatePageLinks();
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
