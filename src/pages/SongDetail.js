import Navigo from "navigo";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import ControlPlayer from "../utils/controlPlayer";
import { getSongDetail } from "../service/playlistApi";
import { SongInforDetail, LineSong } from "../components/listDetail/ListDetail";
import ExpandPlayer from "../components/expandPlayer/ExpandPlayer";


export default function SongDetail() {
  return `
    <div class="p-2">
      <div class="wrapper px-8 lg:px-2">
        <div class="row flex flex-col flex-wrap justify-between lg:flex-row items-center lg:items-start">
          <div class="song-infor static lg:sticky lg:top-24 text-white flex flex-col md:basis-1/4 lg:basis-1/2 gap-5 items-center w-[400px] shrink-0 grow-0">
          </div>

          <div class="song-detail w-full lg:basis-1/2">
          </div>
        </div>
      </div>
    </div>
  `;
}

const $ = document.querySelector.bind(document);

const render = async (slug) => {
  const songInfor = $(".song-infor ");
  const songDetail = $(".song-detail");

  //Lấy dữ liệu
  const songDetailData = await getSongDetail(slug);

  songInfor.innerHTML = `${SongInforDetail(
    songDetailData.playlists[0].tracks[0]
  )}`;
  songDetail.innerHTML = `${LineSong(songDetailData.playlists[0].tracks)}`;

  await handleEvent(songDetailData.playlists[0].tracks);

  router.updatePageLinks();
};

const handleEvent = async (dataSongs) => {
  //Lấy ra dữ liệu của dataSongs
  const lengthSongs = dataSongs.length;
  dataSongs.forEach((data, index) => {data._id = index});
  localStorage.setItem("data_song", JSON.stringify(dataSongs));

  //Hiện footerPlayer
  const footerPlayer = $("#player");
  const expandPlayer = $("#footer .expand-player");

  //Hiển thị ra dữ liệu của expand player
  expandPlayer.innerHTML = `${ExpandPlayer(dataSongs)}`;

  const closeExpandPlayerIcon = $("#footer .expand-player .close-icon");
  
  footerPlayer.classList.remove("hidden");
  footerPlayer.onclick = () => {
    expandPlayer.classList.add("open");
  }
  closeExpandPlayerIcon.onclick = () => {
    expandPlayer.classList.remove("open");
  }

  //TwoSyncPlayer
  // const audio = $("audio");
  // const controlPlayerFooter = new ControlPlayer({audio, dataSongs});
  // controlPlayerFooter.attach("#player", "#main");
  // controlPlayerFooter.attach(".expand-player", ".expand-player");
};

export const afterRenderSongDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
