import Navigo from "navigo";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getSongDetail } from "../service/playlistApi";
import { SongInforDetail, LineSong } from "../components/listDetail/ListDetail";
import ExpandPlayer from "../components/expandPlayer/ExpandPlayer";


export default function SongDetail() {
  return `
    <div class="p-2">
      <div class="wrapper lg:px-2">
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
  
  let data;
  if(!songDetailData.album?.tracks.length && !songDetailData.playlists?.length) {
    data = songDetailData.related;
  }

  if(!data && !songDetailData.playlists?.length) {
    data = songDetailData.album.tracks;
  }

  if(songDetailData.playlists?.length) {
    data = songDetailData.playlists[0].tracks;
  }

  songInfor.innerHTML = `${SongInforDetail(
    data[0] || data.tracks[0]
  )}`;
  songDetail.innerHTML = `${LineSong(data)}`;

  await handleEvent(data);

  router.updatePageLinks();
};

const handleEvent = async (dataSongs) => {
  //Lấy ra dữ liệu của dataSongs
  const lengthSongs = dataSongs.length;
  dataSongs.forEach((data, index) => {data._id = index});
  sessionStorage.setItem("data_song", JSON.stringify(dataSongs));
};

export const afterRenderSongDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
  } catch (error) {
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
