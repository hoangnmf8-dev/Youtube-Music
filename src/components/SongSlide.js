
function SongSlide(id) {
  return `
    <section id="${id}" class="mt-10 lg:mt-20">
      <div class="section-heading relative">
        <h2
          class="section-title text-[22px] md:text-[32px] lg:text-[45px] text-white font-bold mb-4"
        >
          Nghe gần đây
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
        <div class="personalized-column min-w-1/3 flex flex-col gap-8 shrink-0">
          <a href="" class="item w-40 lg:w-[220px] shrink-0 cursor-pointer">
            <div class="img mb-2 overflow-hidden rounded-md relative group">
              <img
                class="block aspect-square group-hover:brightness-50 transition-all duration-150"
                src="https://thichtrangtri.com/wp-content/uploads/2025/05/anh-phong-canh-chill-29.jpg"
                alt=""
              />
              <i
                class="fa-solid fa-play text-white text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150"
              ></i>
            </div>
            <h3 class="item-name mb-2 text-white font-medium truncate">Nhạc auscoutic buồn, lãng mạn Vol.1</h3>
            <p class="item-artists text-gray-400 text-sm truncate">Various Artists</p>
          </a>
        </div>
      </div>
    </section>
  `
}

export default SongSlide;