function Player() {
  return `
    <div id="player" class="footer-song hidden">
      <div class="footer-song-controls">
        <div class="relative">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value="0"
            class="footer-song-bar progress absolute top-1/2 -translate-y-1/2 w-full cursor-pointer accent-red-500 h-1"
          />
        </div>

        <div
          class="footer-song-player bg-[#212121] h-[75px] flex items-center justify-between px-2 py-4"
        >
          <div class="flex items-center lg:ml-5 lg:gap-3">
            <button class="btn-prev hidden sm:block p-3 hover:bg-slate-500 rounded-full transition-all duration-200 cursor-pointer">
              <i class="fa-solid fa-backward-step text-xl"></i>
            </button>
            <button class="p-3 hover:bg-slate-500 rounded-full transition-all duration-200 cursor-pointer">
              <div class="btn-pause hidden"><i class="fa-solid fa-pause text-3xl"></i></div>
              <div class="btn-play"><i class="fa-solid fa-play text-3xl"></i></div>
            </button>
            <button class="btn-next hidden sm:block p-3 hover:bg-slate-500 rounded-full transition-all duration-200 cursor-pointer">
              <i class="fa-solid fa-forward-step text-xl"></i>
            </button>
            <div
              class="footer-song-time hidden md:hidden lg:flex items-center gap-1 text-sm text-gray-300"
            >
              <span class="current">1:20</span>
              <span>/</span>
              <span class="duration">7:05</span>
            </div>
          </div>

          <div class="flex items-center justify-between gap-6">
            <img
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482812Fuv/anh-mo-ta.png"
              alt=""
              class="thumb block w-10 aspect-square rounded-md"
            />
            <div class="song-infor">
              <h3
                class="song-infor-title title font-semibold text-[14px] sm:text-base truncate"
              >
                Nhạc Acoustic Album 16 - Bài 5
              </h3>
              <p class="song-infor-artist text-sm text-gray-400 truncate">
                Không rõ nghệ sĩ
              </p>
            </div>

            <div class="hidden lg:flex items-center gap-3">
              <button class="hover:bg-gray-500 cursor-pointer transition-all duration-200 p-2 rounded-full">
                <i class="fa-regular fa-thumbs-down text-lg md:text-xl"></i>
              </button>
              <button class="hover:bg-gray-500 cursor-pointer transition-all duration-200 p-2 rounded-full">
                <i class="fa-regular fa-thumbs-up text-lg md:text-xl"></i>
              </button>
            </div>

            <div class="song-options relative">
              <button class="song-options hidden sm:block cursor-pointer hover:bg-gray-500 transition-all duration-200 p-2 rounded-full">
                <i
                  class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"
                ></i>
              </button>
              <div
                class="song-options-menu hidden absolute -top-[10px] -translate-y-full -translate-x-2/3 min-w-[200px] bg-[#2b2b2b] rounded-md p-2"
              >
                <button
                  class="w-full text-left text-white px-3 py-2 hover:bg-[#364153]"
                >
                  Thêm vào Playlist
                </button>
                <button
                  class="w-full text-left text-white px-3 py-2 hover:bg-[#364153]"
                >
                  Chia sẻ
                </button>
                <button
                  class="w-full text-left text-white px-3 py-2 hover:bg-[#364153]"
                >
                  Chi tiết bài hát
                </button>
              </div>
            </div>
          </div>

          <div
            class="song-controls-right hidden md:flex items-center gap-8 lg:mr-5 relative"
          >
            <button class="song-volume relative flex gap-1 items-center group before:content-[''] before:absolute before:left-[-20px] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:rounded-full before:bg-transparent"">
              <div
                class="song-volume-wrapper px-1 max-h-[20px] rounded-3xl bg-[#4a4949] flex items-center opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 absolute top-1/2 -translate-y-1/2 -translate-x-[140px] pointer-events-none"
              >
                <input type="range" class="progress-volume accent-white cursor-pointer" />
              </div>
              <div class="song-volume-icon volume-low hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full"><i class="fa-solid fa-volume-low text-xl"></i></div>
              <div class="song-volume-icon volume-high hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full hidden"><i class="fa-solid fa-volume-high text-lg md:text-xl"></i></div>
              <div class="song-volume-icon volume-mute hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full hidden"><i class="fa-solid fa-volume-xmark text-xl"></i></div>
            </button>
            <button class="song-repeat btn-repeat cursor-pointer hover:bg-gray-500 transition-all duration-200 p-2 rounded-full">
              <i class="fa-solid fa-repeat text-lg md:text-xl"></i>
            </button>
            <button class="song-random btn-random cursor-pointer hover:bg-gray-500 transition-all duration-200 p-2 rounded-full">
              <i class="fa-solid fa-shuffle text-lg md:text-xl"></i>
            </button>
            <button class="song-close btn-random cursor-pointer hover:bg-gray-500 transition-all duration-200 p-2 rounded-full">
              <i class="fa-solid fa-close text-lg md:text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default Player;
