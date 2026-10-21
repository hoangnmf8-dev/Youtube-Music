import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";

import { getCategoriesDetail } from "../service/category";
import SongSlide from "../components/SongSlide/SongSlide";

export default function CategoriesDetail() {
  return `
    <div id="categories-detail-content" class="p-2">
      
    </div>
  `
};

const render = async (slug) => {
  const categoriesDetailContent = document.querySelector("#categories-detail-content");

  //Lấy dữ liệu
  const categoriesDetailData = await getCategoriesDetail(slug);

  const playlists = categoriesDetailData.playlists || [];
  categoriesDetailContent.innerHTML = `
    <h1 class="categories-detail-title font-bold text-[45px] mb-10 text-white">${escapeHTML(categoriesDetailData.name)}</h1>
    ${playlists.length
      ? `<section id="section-${escapeHTML(categoriesDetailData.slug)}" class="mt-10 lg:mt-20">
          ${SongSlide("Danh sách phát", "/playlists/details", playlists)}
        </section>`
      : '<p class="text-white/70">Chưa có danh sách phát trong thể loại này.</p>'}
  `;
}

const controlScroll = () => {
  const allSection = document.querySelectorAll("section");
  allSection.forEach(section => controlSlide(`#${section.id}`));
}

export const afterRenderCategoriesDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
    controlScroll();
  } catch (error) {
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
}
