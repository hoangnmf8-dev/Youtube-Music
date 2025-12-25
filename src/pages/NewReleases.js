import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";

import { getNewRelease, getNewReleaseVideos } from "../service/exploreApi";
import SongSlide from "../components/SongSlide/SongSlide";

export default function () {
  return `
    <div class="p-2">
      <section id="releases-albums" class="mt-10 lg:mt-20">
      </section>
      <section id="releases-videos" class="mt-10 lg:mt-20">
      </section>
    </div>
  `;
}

const $ = document.querySelector.bind(document);

const render = async () => {
  const releasesAlbumsSection = $("#releases-albums");
  const releasesVideosSection = $("#releases-videos");

  //Lấy dữ liệu
  const [releasesAlbumsData, releasesVideosData] = await Promise.all([getNewRelease(), getNewReleaseVideos()]);

  //Render
  releasesAlbumsSection.innerHTML = `${SongSlide(
    "Bản phát hành mới",
    "/albums/details",
    releasesAlbumsData.items
  )}`;
  releasesVideosSection.innerHTML = `${SongSlide("Video nhạc mới", "/videos/details", releasesVideosData.items, "video")}`;
  router.updatePageLinks();
};

const controlScroll = () => {
  controlSlide("#releases-albums");
  controlSlide("#releases-videos");
};

export const afterRenderNewReleases = async () => {
  handleBeforeRender("home");
  try {
    await render();
    controlScroll();
  } catch (error) {
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
