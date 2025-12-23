import "../../assets/footer.css";
import Player from "./Player";
import PlayerVideo from "./PlayerVideo";
import ExpandPlayer from "../expandPlayer/ExpandPlayer";
import ExpandPlayerVideo from "../expandPlayer/ExpandPlayerVideo";
import ControlPlayer from "../../utils/controlPlayer";
import controlSlide from "../../utils/controlSlide";

function Footer(data) {
  return `
    <footer id="footer" class="fixed left-0 right-0 bottom-0 text-white z-30">
      <div class="row h-full">
        <div class="player-wrapper hidden">${Player()}</div>
        <div class="player-video-wrapper"></div>
      </div>
      <div class="expand-player"></div>
      <div class="expand-video-player"></div>
    </footer>
    <audio class="hidden" preload="auto">
    </audio>`;
}

export default Footer;

const $ = document.querySelector.bind(document);
let controlPlayerFooter;

export const afterRenderFooter = (slug) => {
  controlPlayerFooter?.destroy();
  const dataSongs = JSON.parse(sessionStorage.getItem("data_song"));
  const dataVideos = JSON.parse(sessionStorage.getItem("data_video"));

  const footerPlayerWrapper = $(".player-wrapper");
  const showExpandEl = $("#player .song-show-expand");
  const expandPlayer = $("#footer .expand-player");
  const closePlayerBtn = $("#player .song-close");

  const footerPlayerVideoFooter = $("#player-video");
  const footerExpandPlayerVideo = $("#footer .expand-video-player");

  //Đóng toàn bộ player
  closePlayerBtn.onclick = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem("data_song");
    sessionStorage.removeItem("current_song");
    footerPlayerWrapper.classList.add("hidden");
    document.querySelector("audio").src = "";
    document.querySelector("#main .song-detail-item.active")?.classList.remove("active");
  };

  //Lấy dữ liệu ra khi chuyển trang
  if (sessionStorage.getItem("data_song")) {
    expandPlayer.innerHTML = `${ExpandPlayer(dataSongs)}`;
    const audio = $("audio");
    const controlPlayerFooter = new ControlPlayer({ audio, dataSongs });
    controlPlayerFooter.start("#player", "#main");
    controlPlayerFooter.start(".expand-player-infor", ".expand-player");
    if(JSON.parse(sessionStorage.getItem("current_song"))) {
      controlPlayerFooter.updateUI(JSON.parse(sessionStorage.getItem("current_song")));
    }
    document.querySelectorAll("#main .song-detail-item").forEach(item => item.classList.remove("active"));
  }
  
  //Mở expand player
  const closeExpandPlayerIcon = $("#footer .expand-player .close-icon");
  showExpandEl.onclick = (e) => {
    e.stopPropagation();
    expandPlayer.classList.add("open");
  };

  //Đóng expand player
  if (closeExpandPlayerIcon) {
    closeExpandPlayerIcon.onclick = () => {
      expandPlayer.classList.remove("open");
    };
  }
};
