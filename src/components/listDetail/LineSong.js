import escapeHTML from "../../utils/escapeHTML";
import { calcSongTime } from "../../utils/calcListTime";

export default function LineSong(data) {
  let html = data.map(
        (item, index) => `
      <div data-id="${escapeHTML(index)}" data-src="${item.audioUrl}" class="song-detail-item flex w-full items-center px-3 py-4 gap-4 hover:bg-[#25384a] cursor-pointer transition-all duration-100 text-white group rounded-lg">
        <div class="w-6 text-center">${index + 1}</div>
        <div class="relative w-12 aspect-square overflow-hidden rounded-sm">
          <img class="block w-full aspect-square transition-all duration-150 group-hover:brightness-50 object-cover" src="${escapeHTML(
            item.thumbnails[0]
          )}" alt="">
          <i class="fa-solid fa-play absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"></i>
        </div>
        <div class="flex flex-col justify-between flex-1">
          <div class="font-semibold">${escapeHTML(item.title)}</div>
          <div class="text-sm text-white/60">${escapeHTML(item.artists?.[0] || "Nghệ sĩ độc lập")}</div>
          <div class="text-xs text-white/45"><a onclick="event.stopPropagation()" class="underline" href="${escapeHTML(item.sourceUrl || "#")}" target="_blank" rel="noreferrer">Nguồn ${escapeHTML(item.sourceProvider || "")}</a> · <a onclick="event.stopPropagation()" class="underline" href="${escapeHTML(item.licenseUrl || "https://creativecommons.org/licenses/")}" target="_blank" rel="noreferrer">CC ${escapeHTML((item.license || "").toUpperCase())} ${escapeHTML(item.licenseVersion || "")}</a></div>
        </div>
        <div class="text-sm text-white/50">${escapeHTML(
          calcSongTime(item.duration)
        )}</div>
    </div>  
    `
      )
      .join("")
  html += `
      <div data-id="${data.length}" data-src="Như Một Người Dưng (Remix).mp3" class="song-detail-item song-static flex w-full items-center px-3 py-4 gap-4 hover:bg-[#25384a] cursor-pointer transition-all duration-100 text-white group rounded-lg">
        <div class="w-6 text-center">${data.length + 1}</div>
        <div class="relative w-12 aspect-square overflow-hidden rounded-sm">
          <img class="block w-full aspect-square transition-all duration-150 group-hover:brightness-50 object-cover" src="
            https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/9/d/7/4/9d7421f9053acfdb26fc9b1a100b9724.jpg
          " alt="">
          <i class="fa-solid fa-play absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"></i>
        </div>
        <div class="flex flex-col justify-between flex-1">
          <div class="font-semibold">Như một người dưng</div>
          <div class="text-sm text-white/60">Nguyễn Thạc Bảo Ngọc</div>
        </div>
        <div class="text-sm text-white/50">3:47</div>
    </div>
  `
  return html;
}
