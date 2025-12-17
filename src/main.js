import "./assets/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./app";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SidebarSlide from "./components/SidebarSlide";
import Footer from "./components/Footer";
import initRouter from "./route/router";

const root = document.querySelector("#root");

const init = () => {
  root.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${SidebarSlide()}
    ${App()}
  `;
};
init();
initRouter();
