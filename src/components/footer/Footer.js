import "../../assets/footer.css";
import Player from "./Player";
import PlayerVideo from "./PlayerVideo";
import ExpandPlayer from "../expandPlayer/ExpandPlayer";
import ExpandPlayerVideo from "../expandPlayer/ExpandPlayerVideo";
import ControlPlayer from "../../utils/controlPlayer";
import controlSlide from "../../utils/controlSlide";
import controlVideo, {
  zoomOutExpandVideo,
  zoomInExpandVideo,
} from "../../utils/controlVideo";
import showToast from "../../utils/showToast";
function Footer(data) {
  return `
    <footer id="footer" class=" fixed left-0 right-0 bottom-0 text-white z-30">
      <div class="row h-full">
        <div class="player-wrapper hidden">${Player()}</div>
        <div class="player-video-wrapper hidden">${PlayerVideo()}</div>
      </div>
      <div class="expand-player"></div>
      <div class="expand-video-player pt-18 hidden"></div>
    </footer>
    <audio class="hidden" preload="auto">
    </audio>`;
}

export default Footer;

const $ = document.querySelector.bind(document);
let playerVideo = null;

export const afterRenderFooter = (slug) => {
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("data_song");
    sessionStorage.removeItem("data_video");
    sessionStorage.removeItem("current_song");
    return ``;
  });
  const audio = $("audio");
  const dataSongs = JSON.parse(sessionStorage.getItem("data_song"));
  const dataVideos = JSON.parse(sessionStorage.getItem("data_video"));

  //Player element
  const footerPlayerWrapper = $(".player-wrapper");
  const showExpandEl = $("#player .song-show-expand");
  const expandPlayer = $("#footer .expand-player");
  const closePlayerBtn = $("#player .song-close");
  //Đóng toàn bộ player
  closePlayerBtn.onclick = (e) => {
    e.stopPropagation();
    let id = confirm("Bạn muốn đóng trình phát nhạc?");
    if (!id) return;
    sessionStorage.removeItem("data_song");
    sessionStorage.removeItem("current_song");
    footerPlayerWrapper.classList.add("hidden");
    document.querySelector("audio").src = "";
    document
      .querySelector("#main .song-detail-item.active")
      ?.classList.remove("active");
  };
  //Lấy dữ liệu ra khi chuyển trang
  if(sessionStorage.getItem("data_song") && slug === "songs") {
    expandPlayer.innerHTML = `${ExpandPlayer(dataSongs)}`;
  }
  if (sessionStorage.getItem("data_song")) {
    const controlPlayerFooter = new ControlPlayer({ audio, dataSongs });
    controlPlayerFooter.start("#player", "#main");
    controlPlayerFooter.start(".expand-player-infor", ".expand-player");
    if (JSON.parse(sessionStorage.getItem("current_song"))) {
      controlPlayerFooter.updateUI(
        JSON.parse(sessionStorage.getItem("current_song"))
      );
    }
    document
      .querySelectorAll("#main .song-detail-item")
      .forEach((item) => item.classList.remove("active"));
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

  //VIDEO
  //Video player element
  const footerPlayerVideoFooter = $("#footer .player-video-wrapper");
  const footerExpandPlayerVideo = $("#footer .expand-video-player");
  const showExpandVideoEl = $(".player-video-wrapper .video-show-expand");
  const closePlayerVideoBtn = $(".player-video-wrapper .video-close");

  //Lấy dữ liệu và render ra giao diện của video
  if (sessionStorage.getItem("data_video") && slug === "videos") {
    //Khi vào trang video detail mới render lại toàn bộ expand video
    const dataVideo = JSON.parse(sessionStorage.getItem("data_video"));
    footerExpandPlayerVideo.innerHTML = `${ExpandPlayerVideo(dataVideo)}`;
    zoomInExpandVideo();
    footerExpandPlayerVideo.classList.add("hidden");
    footerPlayerVideoFooter.classList.add("hidden");
  }

  if (sessionStorage.getItem("data_video")) {
    const dataVideo = JSON.parse(sessionStorage.getItem("data_video"));
    const closeExpandPlayerBtn = $(".expand-video-player .close-icon");
    //Mở expand video
    showExpandVideoEl.onclick = (e) => {
      if (footerExpandPlayerVideo.classList.contains("hidden")) {
        footerExpandPlayerVideo.classList.remove("hidden");
        return;
      }
      zoomInExpandVideo();
    };
    //Đóng expand video
    if (closeExpandPlayerBtn) {
      closeExpandPlayerBtn.onclick = (e) => {
        zoomOutExpandVideo();
      };
    }

    if (!playerVideo || slug === "videos") {
      playerVideo = new controlVideo("iframe-expand-video", dataVideo);
      playerVideo.start(".player-video-wrapper", ".video-detail");
      playerVideo.start(".expand-video-infor", ".expand-video-detail");
    }

    //Đóng toàn bộ expand video
    closePlayerVideoBtn.onclick = (e) => {
      let id = confirm("Bạn muốn tắt trình phát video?");
      if (!id) return;
      playerVideo.closePlayer();
    };
  }

  //Đóng toàn bộ player khi vào trong trang video
  if (slug === "videos") {
    if (sessionStorage.getItem("data_song")) {
      showToast(true, "Đã đóng trình phát nhạc");
    }
    sessionStorage.removeItem("data_song");
    sessionStorage.removeItem("current_song");
    footerPlayerWrapper.classList.add("hidden");
    expandPlayer.classList.remove("open");
    document.querySelector("audio").src = "";
    document
      .querySelector("#main .song-detail-item.active")
      ?.classList.remove("active");
  }

  //Đóng toàn bộ video khi vào trong trang song
  if (slug === "songs") {
    if (sessionStorage.getItem("data_video")) {
      showToast(true, "Đã đóng trình phát video");
    }
    playerVideo?.closePlayer();
  }
};
