import Navigo from "navigo";
import Login, {afterRenderLogin} from "../pages/Login";
import AuthProfile, {afterRenderAuthProfile} from "../pages/AuthProfile";
import AuthPassword, {afterRenderAuthPassword} from "../pages/AuthPassword";
import Home, {afterRenderHome} from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import AlbumDetail from "../pages/AlbumDetail";
import { afterRenderHeader } from "../components/Header";
import { afterRenderSidebar } from "../components/Sidebar";
import { afterRenderSidebarSlide } from "../components/SidebarSlide";
import showToast from "../utils/show_toast";
export const router = new Navigo("/", {
  hash: false,
  linksSelector: "a",
});

const initRouter = async () => {
  const main = document.querySelector("#main");
  router
    .on("/", () => {
      main.innerHTML = Home();
      afterRenderHome();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/explore", () => {
      main.innerHTML = Explore();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/library", () => {
      main.innerHTML = Library();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/upgrade", () => {
      if (!localStorage.getItem("access_token")) {
        router.navigate("/login");
        showToast(false, "Vui lòng đăng nhập trước!");
      }
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/login", async () => {
      main.innerHTML = Login();
      afterRenderLogin();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/auth/profile", () => {
      main.innerHTML = AuthProfile();
      afterRenderAuthProfile();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/auth/password", () => {
      main.innerHTML = AuthPassword();
      afterRenderAuthPassword();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .on("/albums/details/:slug", () => {
      main.innerHTML = AlbumDetail();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
    })
    .resolve();
};

export default initRouter;
