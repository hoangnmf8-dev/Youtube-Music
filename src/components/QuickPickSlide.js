function QuickPickSlide(id) {
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
          <a href="" class="item flex gap-4">
            <img
              class="img block w-12 aspect-square rounded-sm"
              src="https://vcdn1-giaitri.vnecdn.net/2014/11/12/12-1415753927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=9gU8g_lIgm_UWyGTlpQ6rQ"
              alt=""
            />
            <div>
              <h3 class="title text-white font-medium truncate">Hip-hop Drop</h3>
              <p class="infor flex items-center text-gray-400 truncate">
                <span class="artists-name">Various Artists</span>
                <span class="dot mx-2 flex items-center">•</span>
                <span class="listens">120 lượt nghe</span>
              </p>
            </div>
          </a>

          <a href="" class="item flex gap-4">
            <img
              class="img block w-12 aspect-square rounded-sm"
              src="https://vcdn1-giaitri.vnecdn.net/2014/11/12/12-1415753927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=9gU8g_lIgm_UWyGTlpQ6rQ"
              alt=""
            />
            <div>
              <h3 class="title text-white font-medium truncate">Hip-hop Drop</h3>
              <p class="infor flex items-center text-gray-400 truncate">
                <span class="artists-name">Various Artists</span>
                <span class="dot mx-2 flex items-center">•</span>
                <span class="listens">120 lượt nghe</span>
              </p>
            </div>
          </a>

          <a href="" class="item flex gap-4">
            <img
              class="img block w-12 aspect-square rounded-sm"
              src="https://vcdn1-giaitri.vnecdn.net/2014/11/12/12-1415753927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=9gU8g_lIgm_UWyGTlpQ6rQ"
              alt=""
            />
            <div>
              <h3 class="title text-white font-medium truncate">Hip-hop Drop</h3>
              <p class="infor flex items-center text-gray-400 truncate">
                <span class="artists-name">Various Artists</span>
                <span class="dot mx-2 flex items-center">•</span>
                <span class="listens">120 lượt nghe</span>
              </p>
            </div>
          </a>

          <a href="" class="item flex gap-4">
            <img
              class="img block w-12 aspect-square rounded-sm"
              src="https://vcdn1-giaitri.vnecdn.net/2014/11/12/12-1415753927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=9gU8g_lIgm_UWyGTlpQ6rQ"
              alt=""
            />
            <div>
              <h3 class="title text-white font-medium truncate">Hip-hop Drop</h3>
              <p class="infor flex items-center text-gray-400 truncate">
                <span class="artists-name">Various Artists</span>
                <span class="dot mx-2 flex items-center">•</span>
                <span class="listens">120 lượt nghe</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  `
}

export default QuickPickSlide;