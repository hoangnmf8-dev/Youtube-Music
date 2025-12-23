import Navigo from "navigo";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import ControlPlayer from "../utils/controlPlayer";
import calcListTime from "../utils/calcListTime";
import { calcSongTime } from "../utils/calcListTime";
import calcViews from "../utils/calcViews";

import { getVideoDetail } from "../service/videosApi";
import LineSong from "../components/listDetail/LineSong";

export default function VideoDetail() {
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
  const videoInforSection = $("#main .song-infor");
  const videoDetailSection = $("#main .song-detail");

  const videoDetailData = await getVideoDetail(slug);
  if(videoDetailData.related?.length) {
    localStorage.setItem("data_video", JSON.stringify(videoDetailData.related));
  }

  videoInforSection.innerHTML = `
    <p class="mb-4">Đang phát</p>
    <h1 class="text-xl xl:text-3xl font-bold text-center">${escapeHTML(videoDetailData.title)}</h1>
    <p class="text-white/60 text-sm">Thời lượng: ${escapeHTML(calcListTime(videoDetailData.duration))}</p>
    <p class="text-white/60 text-sm">${escapeHTML(calcViews(videoDetailData.popularity))} lượt xem</p>
  `;

  videoDetailSection.innerHTML = `
    ${videoDetailData.related.map(
        (item, index) => `
      <div data-id="${escapeHTML(index)}" data-src="${item.audioUrl}" class="song-detail-item flex w-full items-center px-3 py-4 gap-4 hover:bg-[#25384a] cursor-pointer transition-all duration-100 text-white group rounded-lg">
        <div class="w-6 text-center">${index + 1}</div>
        <div class="relative w-12 aspect-square overflow-hidden rounded-sm">
          <img class="block w-full aspect-square transition-all duration-150 group-hover:brightness-50 object-cover" src="${escapeHTML(
            item.thumbnails[0]
          )}" alt="">
          <i class="fa-solid fa-play absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"></i>
        </div>
        <div class="flex flex-col justify-between flex-1">
          <div class="font-semibold">${escapeHTML(item.title)}</div>
          <div class="text-sm text-white/60">${escapeHTML("Không rõ nghệ sĩ")}</div>
        </div>
        <div class="text-sm text-white/50">${escapeHTML(
          calcSongTime(item.duration)
        )}</div>
    </div>  
    `
      )
      .join("")}
  `;
};

export const afterRenderVideoDetail = async (slug) => {
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
