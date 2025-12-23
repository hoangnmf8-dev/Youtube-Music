import "../assets/quickpick_slide.css";
import Navigo from "navigo";
import { router } from "../route/router";
import getAccessToken from "../utils/getToken";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender"
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getExploreAlbums } from "../service/albumsApi";
import { getExploreMoods } from "../service/moodsApi";
import { getExploreVideos } from "../service/videosApi";
import SongSlide from "../components/SongSlide/SongSlide";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";
function Explore() {
  return `
    <div class="p-2">
      <section class="flex flex-col md:flex-row gap-4">
        <a href="/new-releases" data-navigo="" class="flex items-center gap-3 px-6 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-solid fa-compact-disc text-2xl"></i>
          <span>Bản phát hành mới</span>
        </a>
  
        <a href="/charts" data-navigo="" class="flex items-center gap-3 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-solid fa-chart-line text-2xl"></i>
          <span>Bảng xếp hạng</span>
        </a>
  
        <a href="/moods-and-genres" data-navigo="" class="flex items-center gap-3 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-regular fa-face-smile text-2xl"></i>
          <span>Tâm trạng và thể loại</span>
        </a>
      </section>

      <section id="explore-albums" class="mt-10 lg:mt-20">
      </section>
      <section id="explore-moods" class="mt-10 lg:mt-20">
      </section>
      <section id="explore-videos" class="mt-10 lg:mt-20">
      </section>
    </div>
    
  `;
}

export default Explore;

const $ = document.querySelector.bind(document);

const render = async () => {
  const albumsSection = $("#explore-albums");
  const moodsSection = $("#explore-moods");
  const videosSection = $("#explore-videos");

  //Lấy dữ liệu
  const exploreAlbumsData = await getExploreAlbums();
  const exploreMoodsData = await getExploreMoods();
  const exploreVideosData = await getExploreVideos();

  //Render ra giao diện
  albumsSection.innerHTML = `${SongSlide('Khám phá Albums mới', "/albums/details",exploreAlbumsData.items)}`;
  moodsSection.innerHTML = `${QuickPickSlide("Tâm trạng và thể loại", "/categories", "moodcards", exploreMoodsData.categories)}`
  videosSection.innerHTML = `${SongSlide("Video nhạc mới", "/videos/details", exploreVideosData.items, "video")}`
}

const controlScroll = () => {
  controlSlide("#explore-albums");
  controlSlide("#explore-moods");
  controlSlide("#explore-videos");
}

export const afterRenderExplore = async () => {
  try {
    handleBeforeRender("explore");
    await render();
    controlScroll();
    router.updatePageLinks();
  } catch(error) {
    if(error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
}

