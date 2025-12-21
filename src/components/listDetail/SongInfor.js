import escapeHTML from "../../utils/escapeHTML";
import calcListTime from "../../utils/calcListTime";

function SongInfor(type, data) {
  return `
    <div class="w-[80%] flex flex-col items-center gap-3 lg:gap-5">
      <img
        class="rounded-lg block aspect-square object-cover block w-[80%]"
        src="${data.thumbnails[0]}"
        alt=""
      />
      <h3 class="item-title text-white text-[20px] xl:text-[28px] font-bold text-center">${escapeHTML(data.title)}</h3>
      <p class="text-white/70 text-lg text-center">${escapeHTML(data.description)}</p>
      <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">
        <p>
          <span class="item-quantity">${escapeHTML(data.tracks.length)} bài hát</span>
          <span class="mx-1">•</span>
          <span class="item-total-duration">${escapeHTML(calcListTime(data.duration))}</span>
        </p>
        ${type === "albums" ? `<p class="item-listens">462 lượt nghe</p>
        <p class="item-category">Loại album: Single</p>
        <p class="item-release-date">Phát hành: 20/12/2024</p>` : `<p>Các nghệ sĩ: ${data.artists[0]}</p>`}
      </div>
    </div>
  `;
}

export default SongInfor;
