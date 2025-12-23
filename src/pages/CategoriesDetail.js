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

  categoriesDetailContent.innerHTML = `
    <h1 class="categories-detail-title font-bold text-[45px] mb-10 text-white">${escapeHTML(categoriesDetailData.name)}</h1>
    ${categoriesDetailData.subcategories.map(sub => `
      <section id="section-${sub._id}" class="mt-10 lg:mt-20">
      ${SongSlide(sub.name, "/playlists/details", sub.playlists)}
      </section>  
    `)}
  `
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