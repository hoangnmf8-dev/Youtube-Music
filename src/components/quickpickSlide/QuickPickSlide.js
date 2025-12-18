import "../../assets/quickpick_slide.css";
import escapeHTML from "../../utils/escapeHTML.js";
import moodCard from "./moodCard.js";
import quickpickCard from "./quickpickCard.js";

function QuickPickSlide(title, path, data) {
  const newData = [];
  for(let i = 0; i < Math.ceil(data.length / 4); i++) {
    newData.push(data.slice(i * 4, i * 4 + 4));
  }
  return `
    <div class="section-heading relative">
      <h2
        class="section-title text-[22px] md:text-[32px] lg:text-[45px] text-white font-bold mb-4"
      >
        ${title}
      </h2>
      <div
        class="section-controls absolute top-1/2 -translate-y-1/2 right-0 flex gap-2"
      >
        <button class="section-controls-btn active back">
          <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <button class="section-controls-btn next">
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>

    <div class="section-body flex overflow-x-auto gap-4 scrollbar-pill pb-10">
      ${newData.map(item => `${quickpickCard(item, path)}`).join("")}
    </div>
  `;
}

export default QuickPickSlide;
