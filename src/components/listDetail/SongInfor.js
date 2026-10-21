import escapeHTML from "../../utils/escapeHTML";
import calcListTime from "../../utils/calcListTime";
import { formatDateDDMMYYYY } from "../../utils/calcListTime";

function SongInfor(type, data) {
  return `
    <div class="w-[80%] flex flex-col items-center gap-3 lg:gap-5">
      <img
        class="rounded-lg block aspect-square object-cover block w-[80%]"
        src="${data.thumbnails[0]}"
        alt=""
      />
      <h3 class="item-title text-white text-[20px] xl:text-[28px] font-bold text-center">${escapeHTML(data.title)}</h3>
      <p class="text-white/70 text-lg text-center ${type === "albums" ? "hidden" : "block"}">${escapeHTML(data.description)}</p>
      <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">
        <p>
          <span class="item-quantity">${escapeHTML(data.tracks.length)} bài hát</span>
          <span class="mx-1">•</span>
          <span class="item-total-duration">${escapeHTML(calcListTime(data.duration))}</span>
        </p>
        ${type === "albums" ? `<p class="item-listens">${escapeHTML(data.popularity ?? 0)} lượt nghe</p>
        <p class="item-category">Loại album: ${escapeHTML(data.albumType || "Album")}</p>
        ${data.releaseDate ? `<p class="item-release-date">Phát hành: ${escapeHTML(formatDateDDMMYYYY(data.releaseDate))}</p>` : ""}` : `<p>Các nghệ sĩ: ${escapeHTML(data.artists?.[0] || "Nghệ sĩ độc lập")}</p>`}
      </div>
    </div>
  `;
}

export default SongInfor;
