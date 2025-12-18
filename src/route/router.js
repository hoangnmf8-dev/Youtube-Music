import Navigo from "navigo";
import Login, { afterRenderLogin } from "../pages/Login";
import AuthProfile, { afterRenderAuthProfile } from "../pages/AuthProfile";
import AuthPassword, { afterRenderAuthPassword } from "../pages/AuthPassword";
import Home, { afterRenderHome } from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import AlbumDetail from "../pages/AlbumDetail";
import { afterRenderHeader } from "../components/Header";
import { afterRenderSidebar } from "../components/Sidebar";
import { afterRenderSidebarSlide } from "../components/SidebarSlide";
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
    })
    .on("/login", async () => {
      main.innerHTML = Login();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderLogin();
    })
    .on("/auth/profile", () => {
      main.innerHTML = AuthProfile();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderAuthProfile();
    })
    .on("/auth/password", () => {
      main.innerHTML = AuthPassword();
      afterRenderHeader();
      afterRenderSidebar();
      afterRenderSidebarSlide();
      afterRenderAuthPassword();
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
