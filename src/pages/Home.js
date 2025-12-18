import Navigo from "navigo";
import { router } from "../route/router";
import getAccessToken from "../utils/getToken";
import escapeHTML from "../utils/escapeHTML";
import { getProfile } from "../service/authApi";
import { getMoods } from "../service/moodsApi";
import { getQuickPicks } from "../service/quickpicksApi";
import { getAlbums } from "../service/albumsApi";
import { getTodayHit } from "../service/todayHitApi";
import { getPlaylistCountry } from "../service/countryApi";
import toggleLoading from "../utils/toggleLodaing";
import showToast from "../utils/showToast";
import TextSlide from "../components/TextSlide";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";
import SongSlide from "../components/SongSlide/SongSlide";
import { getPersonalized } from "../service/personalizedApi";

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
  const moodsData = await getMoods();
  const quickPicksData = await getQuickPicks();
  const albumsData = await getAlbums();
  const todayHitData = await getTodayHit();
  const countryData = await getPlaylistCountry();

  //Render ra giao diện
  moodsSection.innerHTML = `${TextSlide(moodsData.items)}`;
  quickPickSection.innerHTML = `${QuickPickSlide(
    "Quick Picks",
    "/playlists/details",
    quickPicksData
  )}`;
  albumsSection.innerHTML = `${SongSlide("Album gợi ý cho bạn", "/albums/details", albumsData)}`;
  todayHitSection.innerHTML = `${SongSlide("Today's Hits", "/playlists/details",todayHitData)}`;
  countrySection.innerHTML = `${SongSlide("Nhạc Việt", "/playlists/details", countryData)}`;
}

const renderBeforeLogin = async () => {
  
};

const renderAfterLogin = async () => {
  const homeTitle = $("#home-title");
  const homeRelease = $("#home-release");

  const profileData = await getProfile();
  const personalizedData = await getPersonalized();
  
  homeTitle.innerHTML = `<span>👋 Chào mừng ${escapeHTML(profileData.name)}</span>`;
  homeRelease.innerHTML = `${QuickPickSlide("Nghe gần đây", "/albums/details", personalizedData)}`

};

export const afterRenderHome = async () => {
  try {
    //Xử lý trước khi render
    toggleLoading(true);
    const sidebarBtn = $(".sidebar-item.home");
    const sidebarSlideBtn = $(".sidebar-slide-nav-item.home");
    $(".sidebar-item.active")?.classList.remove("active");
    $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove(
      "active"
    );
    sidebarBtn.classList.add("active");
    sidebarSlideBtn.classList.add("active");
    await render();
    if (getAccessToken()) {
      await renderAfterLogin();
    } else {
      await renderBeforeLogin();
    }
    router.updatePageLinks();
  } catch (error) {
    showToast(false, error.message);
  } finally {
    toggleLoading(false);
  }
};
