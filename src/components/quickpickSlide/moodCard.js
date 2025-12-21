import escapeHTML from "../../utils/escapeHTML";

function moodCard(items, path) {
  return `
    <div class="moods-explore-column min-w-1/4 flex flex-col gap-4 shrink-0">       
      ${items.map(item => `
        <a href="/categories/${escapeHTML(item.slug)}" data-navigo class="h-12 rounded-lg flex items-center text-white  text-sm font-semibold cursor-pointer bg-[#292929]">
          <div style="background-color: ${escapeHTML(item.color)};" class="h-full w-2 rounded-l-[999px] rounded-tr-[30px] rounded-br-[30px]"></div>
          <div class="w-full flex-1 flex items-center justify-center px-2 truncate">
            ${escapeHTML(item.name)}
          </div>
        </a>  
      `).join("")}
    </div>

  `
}

export default moodCard;