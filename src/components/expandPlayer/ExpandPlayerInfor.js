import { calcSongTime } from "../../utils/calcListTime";

function ExpandPlayerInfor(data) {
  return `
    <div
      class="expand-player-infor flex flex-1 flex-col items-center text-center gap-6 lg:top-0 lg:self-start"
    >
      <img
        class="thumb w-80 h-80 lg:w-100 lg:h-100 rounded-xl object-cover shadow-[0_0_25px_#0d948880] rouded-lg"
        src=""
      />

      <div class="space-y-1">
        <h2 class="title" class="text-xl font-semibold text-teal-400">
          
        </h2>
        <p class="artist" class="text-gray-300 italic">
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
        <button class="btn-repeat">
          <i class="fa-solid fa-repeat text-xl"></i>
        </button>

        <button class="btn-prev">
          <i class="fa-solid fa-backward-step text-2xl"></i>
        </button>

        <button class="btn-play">
          <i class="fa-solid fa-play text-3xl"></i>
        </button>
         <button class="btn-pause hidden">
          <i class="fa-solid fa-pause text-3xl"></i>
        </button>

        <button class="btn-next">
          <i class="fa-solid fa-forward-step text-2xl"></i>
        </button>

        <button class="btn-random" >
          <i class="fa-solid fa-shuffle text-xl"></i>
        </button>

        <button class="song-volume relative flex gap-1 items-center group before:content-[''] before:absolute before:left-1/2 before:top-[-20px] before:-translate-x-1/2 before:w-5 before:h-5 before:rounded-full before:bg-transparent">
          <div
            class="song-volume-wrapper opacity-0 group-hover:opacity-100 transition 
                    absolute bottom-21 -rotate-90 w-24 accent-white cursor-pointer left-1/2 -translate-x-1/2
                    pointer-events-none group-hover:pointer-events-auto"
          >
            <input type="range" class="progress-volume accent-white cursor-pointer" />
          </div>
          <div class="song-volume-icon volume-low hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full"><i class="fa-solid fa-volume-low text-xl"></i></div>
          <div class="song-volume-icon volume-high hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full hidden"><i class="fa-solid fa-volume-high text-lg md:text-xl"></i></div>
          <div class="song-volume-icon volume-mute hover:bg-slate-600 hover:cursor-pointer transition-all duration-200 p-2 rounded-full hidden"><i class="fa-solid fa-volume-xmark text-xl"></i></div>
        </button>
      </div>

      <!-- Progress -->
      <div class="w-full flex flex-col gap-2 px-6 mt-4">
        <input
          class="progress-expand-player progress w-full accent-red-500 cursor-pointer"
          type="range"
          min="0"
          max="100"
          step="1"
          value="0"
        />
        <div class="flex justify-between text-sm text-gray-400">
          <span class="current">0:02</span>
          <span class="duration"></span>
        </div>
      </div>
    </div>
  `
}

export default ExpandPlayerInfor;