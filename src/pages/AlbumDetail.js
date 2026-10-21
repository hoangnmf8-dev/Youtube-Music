import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import { getAlbumDetail } from "../service/albumsApi";

import LineList from "../components/listDetail/LineList";
import SongInfor from "../components/listDetail/SongInfor";

function AlbumDetail() {
  return `
    <div class="p-2">
      <div class="wrapper">
        <div class="row flex flex-col flex-wrap justify-between gap-8 lg:flex-row items-center lg:items-start">
          <div class="item-infor lg:sticky lg:top-24 flex flex-col w-[400px] gap-6 shrink-0 grow-0 items-center">
          </div>

          <div class="item-detail flex flex-1 flex-col shrink-0 w-full ">
          </div>
        </div>
      </div>
    </div>
  `;
}

export default AlbumDetail;

const $ = document.querySelector.bind(document);

const render = async (slug) => {
  const albumInfor = $(".item-infor ");
  const albumDetail = $(".item-detail");

  //Lấy dữ liệu
  const albumsData = await getAlbumDetail(slug);
  albumInfor.innerHTML = `${SongInfor("albums", albumsData)}`;
  albumDetail.innerHTML = `${LineList("albums", albumsData)}`;
  router.updatePageLinks();
};

export const afterRenderAlbumDetail = async (slug) => {
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
}