import escapeHTML from "../../utils/escapeHTML";
import { calcSongTime } from "../../utils/calcListTime";

function LineList(type, data) {
  return `
    ${data
      .tracks.map(
        (item, index) => `
      <div class="flex w-full items-center px-3 py-4 gap-4 hover:bg-[#25384a] cursor-pointer transition-all duration-150 text-white group rounded-lg">
      <div class="${type === "playlist" ? "w-6" : ``} text-center">${type === "playlist" ? index + 1 : ``}</div>
      <div class="relative w-12 aspect-square overflow-hidden rounded-sm">
        <img class="block w-full aspect-square transition-all duration-150 group-hover:brightness-50 " src="${escapeHTML(
          item.thumbnails[0]
        )}" alt="">
        <i class="fa-solid fa-play absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"></i>
      </div>
      <div class="flex flex-col justify-between flex-1">
        <a href="/songs/details/${item.id}" data-navigo class="font-semibold">${escapeHTML(item.title)}</a>
        <div class="text-sm text-white/60">${escapeHTML(item.artists[0] || "Không rõ nghệ sĩ")}</div>
        <div class="text-xs text-white/45"><a class="underline" href="${escapeHTML(item.sourceUrl || "#")}" target="_blank" rel="noreferrer">Nguồn ${escapeHTML(item.sourceProvider || "")}</a> · <a class="underline" href="${escapeHTML(item.licenseUrl || "https://creativecommons.org/licenses/")}" target="_blank" rel="noreferrer">CC ${escapeHTML((item.license || "").toUpperCase())} ${escapeHTML(item.licenseVersion || "")}</a></div>
      </div>
      <div class="text-sm text-white/50">${escapeHTML(
        calcSongTime(item.duration)
      )}</div>
      </div>
    `
      )
      .join("")}
  `;
}

export default LineList;
