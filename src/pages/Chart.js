import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import calcViews from "../utils/calcViews";

import {
  getCountries,
  getVideosCountries,
  getArtistsCountries,
} from "../service/chartApi";
import SongSlide from "../components/SongSlide/SongSlide";

export default function Chart() {
  return `
    <div class="p-2">
      <h1 class="font-bold text-[45px] mb-10 text-white">Bảng xếp hạng</h1>
      <div class="relative w-[113px] mb-6">
        <select id="country-select" class="relative appearance-none py-2 pl-4 pr-8 rounded-full bg-[#1d1d1d] text-white border border-gray-700 cursor-pointer">
        </select>
        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
      </div>

      <section id="charts-videos" class="mt-10 lg:mt-20">
      </section>
      <section id="charts-artists" class="mt-10 lg:mt-20">
        <h1 class="text-[22px] md:text-[32px] lg:text-[45px] text-white font-semibold">Nghệ sĩ hàng đầu</h1>
        <div class="wrapper flex flex-col gap-3 shrink-0 min-w-[33%] -mb-6">
          

        </div>
      </section>
    </div>
  `;
}

const $ = document.querySelector.bind(document);

const renderSelect = async () => {
  const selectEl = $("#country-select");
  const chartsVideosData = await getCountries();
  selectEl.innerHTML = chartsVideosData.countries
    .map(
      (item) =>
        `<option value="${escapeHTML(item.code)}">${escapeHTML(
          item.name
        )}</option>`
    )
    .join("");
};

const renderVideosSection = async (param) => {
  const chartsVideosSection = $("#charts-videos");
  const videosCountriesData = await getVideosCountries(param);
  chartsVideosSection.innerHTML = `${SongSlide(
    "Bảng xếp hạng video",
    "/videos/details",
    videosCountriesData.items
  )}`;
};

const renderArtistsSection = async (param) => {
  const chartsArtistsSection = $("#charts-artists .wrapper");
  const ArtistsCountriesData = await getArtistsCountries(param);
  chartsArtistsSection.innerHTML = ArtistsCountriesData.items.map((item, index) => `
    <a href="/artist/${escapeHTML(item.artistId)}" data-navigo="" class="flex items-center gap-8 py-3 hover:bg-white/5 rounded-lg transition cursor-pointer px-2">
      <div class="flex gap-2 items-center text-2xl font-bold text-gray-300 w-10 text-center">
        ${escapeHTML(index + 1)}
        <span class="${item.trend === "up" ? "text-green-400" : "text-red-400"} text-sm ml-1 ${item.trend ? "" : "hidden"}">${item.trend === "up" ? "▲" : "▼"}</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1">
          <h3 class="text-white font-semibold truncate">${escapeHTML(item.name)}</h3>
        </div>
        <p class="text-gray-400 text-xs">
          ${escapeHTML(calcViews(item.totalViews))} views
        </p>
      </div>
    </a>
  `).join("");
};

const render = async () => {
  //Render
  await renderSelect();
  await renderVideosSection("GLOBAL");
  await renderArtistsSection("GLOBAL");
  router.updatePageLinks();

  document.querySelector("select").addEventListener("change", async e => {
    await renderVideosSection(e.target.value);
    await renderArtistsSection(e.target.value);
    router.updatePageLinks();
  })
};

const controlScroll = () => {
  controlSlide("#charts-videos");
};

export const afterRenderChart = async () => {
  handleBeforeRender();
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
