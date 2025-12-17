import Navigo from "navigo";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import AlbumDetail from "../pages/AlbumDetail";
import { afterRenderHeader } from "../components/Header";
import { afterRenderSidebarSlide } from "../components/SidebarSlide";
import { afterRenderHome } from "../pages/Home";
import { afterRenderLogin } from "../pages/Login";
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
      afterRenderSidebarSlide();
    })
    .on("/explore", () => {
      main.innerHTML = Explore();
      afterRenderHeader();
      afterRenderSidebarSlide();
    })
    .on("/library", () => {
      main.innerHTML = Library();
      afterRenderHeader();
      afterRenderSidebarSlide();
    })
    .on("/upgrade", () => {
      if (!localStorage.getItem("access_token")) {
        router.navigate("/login");
        showToast(false, "Vui lòng đăng nhập trước!");
      }
      afterRenderHeader();
      afterRenderSidebarSlide();
    })
    .on("/login", async () => {
      main.innerHTML = Login();
      afterRenderLogin();
      afterRenderHeader();
      afterRenderSidebarSlide();
    })
    .on("/albums/details/:slug", () => {
      main.innerHTML = AlbumDetail();
      afterRenderHeader();
      afterRenderSidebarSlide();
    })
    .resolve();
};

export default initRouter;
