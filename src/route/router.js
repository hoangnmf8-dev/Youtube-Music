import Navigo from "navigo";
import Login, { afterRenderLogin } from "../pages/Login";
import AuthProfile, { afterRenderAuthProfile } from "../pages/AuthProfile";
import AuthPassword, { afterRenderAuthPassword } from "../pages/AuthPassword";
import Home, { afterRenderHome } from "../pages/Home";
import MoodsDetail, {afterRenderMoodsDetail} from "../pages/MoodsDetail";
import PlaylistDetail, {afterRenderPlaylistDetail} from "../pages/PlaylistDetail";
import SongDetail, { afterRenderSongDetail } from "../pages/SongDetail";
import Explore, { afterRenderExplore } from "../pages/Explore";
import NewReleases, { afterRenderNewReleases } from "../pages/NewReleases";
import Chart, { afterRenderChart } from "../pages/Chart";
import MoodAndGenres, {afterRenderMoodAndGenres} from "../pages/MoodAndGenres";
import CategoriesDetail, {afterRenderCategoriesDetail} from "../pages/CategoriesDetail";
import Library, {afterRenderLibrary} from "../pages/Library";
import Upgrade, {afterRenderUpgrade} from "../pages/Upgrade";
import AlbumDetail, { afterRenderAlbumDetail } from "../pages/AlbumDetail";
import VideoDetail, {afterRenderVideoDetail} from "../pages/VideoDetail";
import LineDetail, {afterRenderLineDetail} from "../pages/LineDetail";
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
    .on("/", async () => {
      main.innerHTML = Home();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderHome();
      afterRenderFooter();
    })
    .on("/moods/:slug", async ({data}) => {
      main.innerHTML = MoodsDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderMoodsDetail(data.slug);
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
    .on("/songs/details/:slug", async ({data}) => {
      main.innerHTML = SongDetail(data.slug);
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderSongDetail(data.slug);
      afterRenderFooter("songs");
    })
    .on("/explore", async () => {
      main.innerHTML = Explore();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderExplore();
      afterRenderFooter();
    })
    .on("/new-releases", async () => {
      main.innerHTML = NewReleases();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderNewReleases();
      afterRenderFooter();
    })
    .on("/charts", async () => {
      main.innerHTML = Chart();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderChart();
      afterRenderFooter();
    })
    .on("/moods-and-genres", async () => {
      main.innerHTML = MoodAndGenres();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderMoodAndGenres();
      afterRenderFooter();
    })
    .on("/categories/:slug", async ({data}) => {
      main.innerHTML = CategoriesDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderCategoriesDetail(data.slug);
      afterRenderFooter();
    })
    .on("/library", async () => {
      main.innerHTML = Library();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderLibrary();
      afterRenderFooter();
    })
    .on("/upgrade", () => {
      if (!localStorage.getItem("access_token")) {
        router.navigate("/login");
        showToast(false, "Vui lòng đăng nhập trước!");
        return;
      } 
      main.innerHTML = Upgrade();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderUpgrade();
      afterRenderFooter();
    })
    .on("/login", async () => {
      main.innerHTML = Login();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderLogin();
      afterRenderFooter();
    })
    .on("/auth/profile", async () => {
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
    .on("/albums/details/:slug", async ({data}) => {
      main.innerHTML = AlbumDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderAlbumDetail(data.slug);
      afterRenderFooter();
    })
    .on("/videos/details/:slug", async ({data}) => {
      main.innerHTML = VideoDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderVideoDetail(data.slug);
      afterRenderFooter("videos");
    })
    .on("/lines/:slug", async ({data}) => {
      main.innerHTML = LineDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      await afterRenderLineDetail(data.slug);
      afterRenderFooter();
    })
    .resolve();
};

export default initRouter;
