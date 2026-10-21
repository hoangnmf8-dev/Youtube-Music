import ExpandPlayerInfor from "./ExpandPlayerInfor";
import ExpandPlayerDetail from "./ExpandPlayerDetail";
function ExpandPlayer(data) {
  return `
    <div class="close-icon absolute top-[3%] left-[2%] hover:bg-white/20 cursor-pointer p-3 rounded-full">
      <i class="fa-solid fa-xmark text-2xl" style=""></i>
    </div>
    <div class="w-full flex justify-center py-2 mb-12">
      <div class="w-12 h-1.5 bg-gray-500 rounded-full"></div>
    </div>

    <div class="flex-1 px-5">
      <div class="flex flex-col lg:flex-row gap-8">
        ${ExpandPlayerInfor(data)}
        ${ExpandPlayerDetail(data)}
      </div>
    </div>
  `
}

export default ExpandPlayer;