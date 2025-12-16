import Navigo from "navigo";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Library from "../pages/Library";
import controlSlide from "../utils/control_slide";
import AlbumDetail from "../pages/AlbumDetail";
export const router = new Navigo("/", {
  hash: false,
  linksSelector: "a",
});

const initRouter = async () => {
  const main = document.querySelector("#main");
  router
    .on("/", () => {
      main.innerHTML = Home();
      // const btnNext = document.querySelector(".personalized .section-controls-btn.next");
      // const btnBack = document.querySelector(".section-controls-btn.back");
      // const sectionBody = document.querySelector(".personalized .section-body");
      // controlSlide(sectionBody, btnNext, 100);
      // controlSlide(sectionBody, btnBack, -100);
    })
    .on("/explore", () => {
      main.innerHTML = Explore();
    })
    .on("/library", () => {
      main.innerHTML = Library();
    })
    .on("/login", () => {
      main.innerHTML = Login();
    })
    .on("/albums/details/", () => {
      main.innerHTML = AlbumDetail();
    })
    .resolve();
};

export default initRouter;
