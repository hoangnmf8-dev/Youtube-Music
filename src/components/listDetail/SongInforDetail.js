import escapeHTML from "../../utils/escapeHTML";
import {calcSongTime} from "../../utils/calcListTime";
export default function SongInforDetail(data) {
  return `
    <div class="main-song-infor not-only-of-type:w-[80%] flex flex-col items-center gap-3">
      <div id="song-infor" class="flex flex-col items-center gap-3 lg:gap-5">
        <img
          class="rounded-lg block aspect-square object-cover block w-[80%]"
          src="${escapeHTML(data.thumbnails[0])}"
          alt="${escapeHTML(data.title)}"
        />
        <h3 class="item-title text-white text-[20px] xl:text-[28px] font-bold text-center">${escapeHTML(data.title)}</h3>
        <p class="item-duration text-white/70 text-lg text-center">Thời lượng: ${escapeHTML(calcSongTime(data.duration))}</p>
      </div>
      <div class="song-lyric hidden flex-col items-center">
        <div id="lyrics">
          <h1 class="font-semibold text-[40px] text-center">Lyric:</h1>
          <div class="first-line line-song"></div>
          <p class="wait relative font-semibold text-2xl text-transparent">Vui lòng chờ một chút :))))</p>
          <div class="last-line line-song"></div>
        </div>
      </div>
      <button class="toggle-lyric-btn p-3 rounded-full hover:bg-gray-600">
        <i class="fa-solid fa-music text-white text-lg"></i>
      </button>
    </div>
  `;
}