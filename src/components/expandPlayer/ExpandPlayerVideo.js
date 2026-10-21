import ExpandVideoDetail from "./ExpandVideoDetail";
import ExpandVideoInfor from "./ExpandVideoInfor";
export default function ExpandPlayerVideo(data) {
  return `
    <div id="expand-player-video" class="close-icon absolute top-[2%] left-[2%] hover:bg-white/20 cursor-pointer p-3 rounded-full">
      <i class="fa-solid fa-xmark text-2xl" style=""></i>
    </div>

    <div class="expand-video-info-detail flex-1 px-5">
      <div class="flex flex-col lg:flex-row gap-8 h-full">
        ${ExpandVideoInfor(data)}
       ${ExpandVideoDetail(data)}
      </div>
    </div>
  `
}



