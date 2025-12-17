function ExpandPlayerInfor() {
  return `
    <div
            class="flex flex-1 flex-col items-center text-center gap-6 lg:top-0 lg:self-start"
          >
      <img
        id="exp-thumb"
        class="w-80 h-80 lg:w-100 lg:h-100 rounded-xl object-cover shadow-[0_0_25px_#0d948880]"
        src="https://picsum.photos/seed/album-nhc-in-t-album-13-12/400/400"
      />

      <div class="space-y-1">
        <h2 id="exp-title" class="text-xl font-semibold text-teal-400">
          Nhạc Điện Tử Album 13 - Bài 2
        </h2>
        <p id="exp-artist" class="text-gray-300 italic">
          Không rõ nghệ sĩ
        </p>
      </div>

      <div
        class="flex items-center justify-center gap-4 md:gap-10 lg:gap-10 xl:gap-8 mt-8 xl:mt-10"
      >
        <div class="flex relative group">
          <button
            class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"
          >
            <i
              class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"
            ></i>
          </button>
        </div>
        <button id="exp-repeat-btn" class="act-btn">
          <i class="fa-solid fa-repeat text-xl"></i>
        </button>

        <button id="exp-prev-btn" class="act-btn">
          <i class="fa-solid fa-backward-step text-2xl"></i>
        </button>

        <button id="exp-play-btn" class="act-btn">
          <i class="fa-solid fa-play text-3xl"></i>
        </button>

        <button id="exp-next-btn" class="act-btn">
          <i class="fa-solid fa-forward-step text-2xl"></i>
        </button>

        <button id="exp-shuffle-btn" class="act-btn">
          <i class="fa-solid fa-shuffle text-xl"></i>
        </button>

        <div class="flex flex-col items-center gap-3 relative group">
          <button id="exp-volume-btn" class="act-btn">
            <i class="fa-solid fa-volume-high text-xl"></i>
          </button>

          <input
            id="exp-volume-slider"
            type="range"
            min="0"
            max="100"
            value="100"
            class="exp-volume-slider opacity-0 group-hover:opacity-100 transition absolute bottom-21 -rotate-90 w-24 accent-white cursor-pointer pointer-events-none group-hover:pointer-events-auto"
          />
        </div>
      </div>

      <!-- Progress -->
      <div class="w-full flex flex-col gap-2 px-6 mt-4">
        <input
          id="exp-progress"
          type="range"
          min="0"
          max="100"
          value="0"
          class="w-full accent-red-500 cursor-pointer"
        />
        <div class="flex justify-between text-sm text-gray-400">
          <span id="exp-current">0:02</span>
          <span id="exp-duration">4:39</span>
        </div>
      </div>
    </div>
  `
}

export default ExpandPlayerInfor;