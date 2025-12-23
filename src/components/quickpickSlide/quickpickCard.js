import escapeHTML from "../../utils/escapeHTML";

function quickpickCard(data, path) {
  return `
  <div class="min-w-1/3 flex flex-col gap-8 shrink-0">       
    ${data.map(item => `
      <a href="${path}/${escapeHTML(item.slug)}" class="item flex gap-4">
      <img
        class="img block w-12 aspect-square rounded-sm object-cover"
        src="${escapeHTML(item.thumb ? item.thumb : item.thumbnails[0])}"
        alt=""
      />
      <div>
        <h3 class="title text-white font-medium truncate">${escapeHTML(item.name || item.title)}</h3>
        <p class="infor flex items-center text-gray-400 truncate">
          <span class="artists-name">${escapeHTML(item.albumName || item.artists[0])}</span>
          <span class="dot mx-2 flex items-center">•</span>
          <span class="listens">${escapeHTML(item.views || item.popularity)} lượt nghe</span>
        </p>
      </div>
    </a>  
    `).join("")}
  </div>
  `
}

export default quickpickCard;