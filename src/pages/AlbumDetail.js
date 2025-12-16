import lineSong from "../components/lineSong"
import SongInfor from "../components/SongInfor";

function AlbumDetail() {
  return `
    <div class="p2">
      <div class="wrapper">
        <div class="row flex flex-col flex-wrap justify-between gap-8 lg:flex-row items-center lg:items-start">
          <div class="item-infor flex flex-col w-[400px] gap-6 shrink-0 grow-0">
            ${SongInfor()}
          </div>

          <div class="item-detail flex flex-1 flex-col shrink-0 w-full overflow-y-auto max-h-screen">
            ${lineSong()}
          </div>
        </div>
      </div>
    </div>
  `
}


export default AlbumDetail;