import escapeHTML from "../../utils/escapeHTML";

function SongSlide(title, path, data) {
  return `
    <div class="section-heading relative">
      <h2
        class="section-title text-[22px] md:text-[32px] lg:text-[45px] text-white font-bold mb-4"
      >
        ${escapeHTML(title)}
      </h2>
      <div
        class="section-controls absolute top-1/2 -translate-y-1/2 right-0 flex gap-2"
      >
        <button class="section-controls-btn back">
          <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <button class="section-controls-btn next">
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>

    <div class="section-body flex overflow-x-auto gap-6 scrollbar-pill pb-10">
      ${data.map(item => `
        <div class="flex flex-col gap-8 shrink-0 ${item.videoId ? "lg:min-w-1/4" : ""}">
          <a href="${path}/${escapeHTML(item.slug)}" data-navigo class="item w-40 ${item.videoId ? "lg:w-full": "lg:w-[220px]"}   shrink-0 cursor-pointer">
            <div class="img mb-2 overflow-hidden rounded-md relative group">
              <img
                class="block ${item.videoId ? "aspect-[3/2]" : "aspect-square"} group-hover:brightness-50 transition-all duration-150 object-cover"
                src="${escapeHTML(item.thumb || item.thumbnails[0])}"
                alt=""
              />
              <i
                class="fa-solid fa-play text-white text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150"
              ></i>
            </div>
            <h3 class="item-name mb-2 text-white font-medium truncate">${escapeHTML(item.title || item.name)}</h3>
            <p class="item-artists text-gray-400 text-sm truncate">${escapeHTML(item.albumType || `${Math.floor(item.views / 1000)} N lượt xem` ||item.artists[0])}</p>
          </a>
        </div>  
      `).join("")}
    </div>
  `
}

export default SongSlide;

