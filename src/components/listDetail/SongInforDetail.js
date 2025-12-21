import escapeHTML from "../../utils/escapeHTML";
import {calcSongTime} from "../../utils/calcListTime";

export default function SongInforDetail(data) {
  return `
    <div class="w-[80%] flex flex-col items-center gap-3 lg:gap-5">
      <img
        class="rounded-lg block aspect-square object-cover block w-[80%]"
        src="${escapeHTML(data.thumbnails[0])}"
        alt="${escapeHTML(data.title)}"
      />
      <h3 class="item-title text-white text-[20px] xl:text-[28px] font-bold text-center">${escapeHTML(data.title)}</h3>
      <p class="text-white/70 text-lg text-center">Thời lượng: ${escapeHTML(calcSongTime(data.duration))}</p>
  `;
}