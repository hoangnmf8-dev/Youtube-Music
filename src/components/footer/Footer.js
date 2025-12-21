import "../../assets/footer.css";
import Player from "./Player"
import ExpandPlayer from "../expandPlayer/ExpandPlayer"
function Footer(data) {
  return `
    <footer id="footer" class="fixed left-0 right-0 bottom-0 text-white z-30">
      <div class="row h-full">
        ${Player()}
        </div>
      <div class="expand-player"></div>
    </footer>
    <audio class="hidden">
    </audio>`;
}

export default Footer;

const $ = document.querySelector.bind(document);

export const afterRenderFooter = () => {
  const dataSongs = JSON.parse(localStorage.getItem("data_song"));
  const footerPlayer = $("#player");
  const expandPlayer = $("#footer .expand-player");
  const closePlayerBtn = $("#player .song-close");

  closePlayerBtn.onclick = (e) => {
    e.stopPropagation();
    localStorage.removeItem("data_song");
    footerPlayer.classList.add("hidden");
  }
  if(dataSongs) {
    expandPlayer.innerHTML = `${ExpandPlayer(dataSongs)}`;
  }
  const closeExpandPlayerIcon = $("#footer .expand-player .close-icon");
  if(closeExpandPlayerIcon) {
    footerPlayer.classList.remove("hidden");
    footerPlayer.onclick = () => {
      expandPlayer.classList.add("open");
    }
    closeExpandPlayerIcon.onclick = () => {
      expandPlayer.classList.remove("open");
    }
  }


}