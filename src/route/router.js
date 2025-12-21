import Navigo from "navigo";
import Login, { afterRenderLogin } from "../pages/Login";
import AuthProfile, { afterRenderAuthProfile } from "../pages/AuthProfile";
import AuthPassword, { afterRenderAuthPassword } from "../pages/AuthPassword";
import Home, { afterRenderHome } from "../pages/Home";
import MoodsDetail, {afterRenderMoodsDetail} from "../pages/MoodsDetail";
import PlaylistDetail, {afterRenderPlaylistDetail} from "../pages/PlaylistDetail";
import SongDetail, { afterRenderSongDetail } from "../pages/SongDetail";
import Explore, { afterRenderExplore } from "../pages/Explore";
import Library from "../pages/Library";
import AlbumDetail from "../pages/AlbumDetail";
import { afterRenderHeader } from "../components/webComponents/Header";
import { afterRenderSidebar } from "../components/webComponents/Sidebar";
import { afterRenderSidebarSlide } from "../components/webComponents/SidebarSlide";
import { afterRenderFooter } from "../components/footer/Footer";
import showToast from "../utils/showToast";

export const router = new Navigo("/", {
  hash: false,
  linksSelector: "a",
});

const initRouter = async () => {
  const main = document.querySelector("#main");
  router
    .on("/", () => {
      main.innerHTML = Home();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderHome();
      afterRenderFooter();
    })
    .on("/moods/:slug", ({data}) => {
      main.innerHTML = MoodsDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderMoodsDetail(data.slug);
      afterRenderFooter();
    })
    .on("/playlists/details/:slug", ({data}) => {
      main.innerHTML = PlaylistDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderPlaylistDetail(data.slug);
      afterRenderFooter();
    })
    .on("/songs/details/:slug", ({data}) => {
      main.innerHTML = SongDetail(data.slug);
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderSongDetail(data.slug);
      afterRenderFooter();
    })
    .on("/explore", () => {
      main.innerHTML = Explore();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderExplore();
      afterRenderFooter();
    })
    .on("/library", () => {
      main.innerHTML = Library();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderFooter();
    })
    .on("/upgrade", () => {
      if (!localStorage.getItem("access_token")) {
        router.navigate("/login");
        showToast(false, "Vui lòng đăng nhập trước!");
      }
    })
    .on("/login", async () => {
      main.innerHTML = Login();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderLogin();
      afterRenderFooter();
    })
    .on("/auth/profile", () => {
      main.innerHTML = AuthProfile();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderAuthProfile();
      afterRenderFooter();
    })
    .on("/auth/password", () => {
      main.innerHTML = AuthPassword();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderAuthPassword();
      afterRenderFooter();
    })
    .on("/albums/details/:slug", () => {
      main.innerHTML = AlbumDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderFooter();
    })
    .resolve();
};

export default initRouter;
