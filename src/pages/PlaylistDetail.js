import Navigo from "navigo";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getPlaylistDetail } from "../service/playlistApi";
import { SongInfor, LineList } from "../components/listDetail/ListDetail";

export default function PlaylistDetail() {
  return `
    <div class="p-2">
      <div class="wrapper px-8 lg:px-2">
        <div class="row flex flex-col flex-wrap justify-between lg:flex-row items-center lg:items-start">
          <div class="item-infor static lg:sticky lg:top-24 text-white flex flex-col md:basis-1/4 lg:basis-1/2 gap-5 items-center w-[400px] shrink-0 grow-0">
          </div>

          <div class="item-detail w-full lg:basis-1/2">
          </div>
        </div>
      </div>
    </div>
  `;
}

const $ = document.querySelector.bind(document);

const render = async (slug) => {
  const playListInfor = $(".item-infor ");
  const playlistDetail = $(".item-detail");

  //Lấy dữ liệu
  const playlistData = await getPlaylistDetail(slug);

  playListInfor.innerHTML = `${SongInfor("playlist", playlistData)}`;
  playlistDetail.innerHTML = `${LineList("playlist", playlistData)}`;
  router.updatePageLinks();
};

export const afterRenderPlaylistDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
  } catch (error) {
    if(+error.status === 404) {
      showToast(false, "Không tìm thấy tài nguyên");
    }
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
