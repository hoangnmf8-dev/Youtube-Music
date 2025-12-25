import "../assets/quickpick_slide.css";
import Navigo from "navigo";
import { router } from "../route/router";
import getAccessToken from "../utils/getToken";
import { getProfile } from "../service/authApi";
import { getHomeMoods } from "../service/moodsApi";
import { getPersonalized } from "../service/personalizedApi";
import { getQuickPicks } from "../service/quickpicksApi";
import { getHomeAlbums } from "../service/albumsApi";
import { getTodayHit } from "../service/todayHitApi";
import { getPlaylistCountry } from "../service/countryApi";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import TextSlide from "../components/textSlide/TextSlide";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";
import SongSlide from "../components/SongSlide/SongSlide";

function Home() {
  return `
    <div class="p-2">
      <h1 id="home-title" class="text-4xl lg:text-5xl font-semibold text-white mb-20">
        
      </h1>
      <section id="home-moods" class="mt-10 lg:mt-20">
      </section>
      <section id="home-release" class="mt-10 lg:mt-20">
      </section>
      <section id="home-quickpick" class="mt-10 lg:mt-20">
      </section>
      <section id="home-albums" class="mt-10 lg:mt-20">
      </section>
      <section id="home-today-hits" class="mt-10 lg:mt-20">
      </section>
      <section id="home-country" class="mt-10 lg:mt-20">
      </section>
    </div>
  `;
}

export default Home;

const $ = document.querySelector.bind(document);

const render = async () => {
  const moodsSection = $("#home-moods");
  const quickPickSection = $("#home-quickpick");
  const albumsSection = $("#home-albums");
  const todayHitSection = $("#home-today-hits");
  const countrySection = $("#home-country");

  //Lấy dữ liệu
  const [moodsData, quickPicksData, albumsData, todayHitData, countryData] = await Promise.all([getHomeMoods(), getQuickPicks(), getHomeAlbums(), getTodayHit(), getPlaylistCountry()])

  //Render ra giao diện
  moodsSection.innerHTML = `${TextSlide(moodsData.items)}`;
  quickPickSection.innerHTML = `${QuickPickSlide(
    "Quick Picks",
    "/playlists/details",
    "quickpick",
    quickPicksData
  )}`;
  albumsSection.innerHTML = `${SongSlide(
    "Album gợi ý cho bạn",
    "/albums/details",
    albumsData
  )}`;
  todayHitSection.innerHTML = `${SongSlide(
    "Today's Hits",
    "/playlists/details",
    todayHitData
  )}`;
  countrySection.innerHTML = `${SongSlide(
    "Nhạc Việt",
    "/playlists/details",
    countryData
  )}`;
};

const renderBeforeLogin = async () => {};

const renderAfterLogin = async () => {
  const homeTitle = $("#home-title");
  const homeRelease = $("#home-release");

  let profileData;
  if(localStorage.getItem("user")) {
    profileData = JSON.parse(localStorage.getItem("user"));
  } else {
    profileData = await getProfile();
  }
  const personalizedData = await getPersonalized();
  console.log("🚀 ~ renderAfterLogin ~ personalizedData:", personalizedData)

  homeTitle.innerHTML = `<span>👋 Chào mừng ${escapeHTML(
    profileData.name
  )}</span>`;
  homeRelease.innerHTML = `${QuickPickSlide(
    "Nghe gần đây",
    "/albums/details",
    "quickpick",
    personalizedData
  )}`;
};

const controlScroll = () => {
  controlSlide("#home-moods");
  if ($("#home-release").querySelector(".section-body")) {
    controlSlide("#home-release");
  }
  controlSlide("#home-quickpick");
  controlSlide("#home-albums");
  controlSlide("#home-today-hits");
  controlSlide("#home-country");
};

export const afterRenderHome = async () => {
  //Xử lý trước khi render
  handleBeforeRender("home");
  try {
    await render();
    if (getAccessToken()) {
      await renderAfterLogin();
    } else {
      await renderBeforeLogin();
    }
    controlScroll();
    router.updatePageLinks();
  } catch (error) {
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
