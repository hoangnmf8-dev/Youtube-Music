import "../assets/quickpick_slide.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getCategories, getLine } from "../service/category";

import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";

export default function MoodAndGenres() {
  return `
    <div class="p-2">
      <h1 class="font-bold text-[45px] mb-10 text-white">Tâm trạng và thể loại</h1>
      <section id="moods-section" class="mt-10 lg:mt-20">
      </section>
      <section id="genre-section" class="mt-10 lg:mt-20">
      </section>
    </div>
  `
};

const $ = document.querySelector.bind(document);

const render = async () => {
  const moodsSection = $("#moods-section");
  const genreSection = $("#genre-section");

  //Lấy dữ liệu
  const categoriesData = await getCategories();
  const linesData = await getLine();
  moodsSection.innerHTML = `${QuickPickSlide("Tâm trạng và khoảnh khắc", "/categories", "quickpick", categoriesData.items)}`;
}

export const afterRenderMoodAndGenres = async () => {
  handleBeforeRender();
  try {
    await render();
    controlScroll();
  } catch (error) {
    console.log("🚀 ~ afterRenderMoodAndGenres ~ error:", error)
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
}