import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";

import { getLineAlbums, getLinePlaylists, getLineSongs, getLineVideos } from "../service/linesApi";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";
import SongSlide from "../components/SongSlide/SongSlide";

export default function LineDetail() {
  return `
    <div class="p-2">
      <h1 id="home-title" class="text-4xl lg:text-5xl font-semibold text-white mb-20">
        
      </h1>
      <section id="line-songs" class="mt-10 lg:mt-20">
      </section>
      <section id="line-playlists" class="mt-10 lg:mt-20">
      </section>
      <section id="line-videos" class="mt-10 lg:mt-20">
      </section>
      <section id="line-albums" class="mt-10 lg:mt-20">
      </section>
    </div>
  `
}

const $ = document.querySelector.bind(document);

export const render = async (slug) => {
  const lineSongsSection = $("#line-songs");
  const linePlaylistsSection = $("#line-playlists");
  const lineVideosSection = $("#line-videos");
  const lineAlbumsSection = $("#line-albums");

  //Lấy dữ liệu
  const lineSongsData = await getLineSongs(slug);
  const linePlaylistsData = await getLinePlaylists(slug);
  const lineAlbumsData = await getLineAlbums(slug);
  const lineVideosData = await getLineVideos(slug);
  console.log("🚀 ~ render ~ lineVideosData:", lineVideosData)

  //Render
  lineSongsSection.innerHTML = `${QuickPickSlide("Bài hát", "/songs/details", "quickpick", lineSongsData.items)}`;
  linePlaylistsSection.innerHTML = `${SongSlide("Danh sách phát nổi bật", "/playlists/details", linePlaylistsData.items)}`;
  lineVideosSection.innerHTML = `${SongSlide("Video nhạc", "/videos/details", lineVideosData.items, "video")}`;
  lineAlbumsSection.innerHTML = `${SongSlide("Đĩa nhạc", "/albums/details", lineAlbumsData.items)}`;


  router.updatePageLinks();
}

const controlScroll = () => {
  controlSlide("#line-songs");
  controlSlide("#line-playlists");
  controlSlide("#line-videos");
  controlSlide("#line-albums");
};

export const afterRenderLineDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
    controlScroll();
  } catch (error) {
    console.log("🚀 ~ afterRenderLineDetail ~ error:", error)
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
}