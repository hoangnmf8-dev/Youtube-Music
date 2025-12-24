import "./assets/style.css";
import App from "./app";
import Header from "./components/webComponents/Header";
import Sidebar from "./components/webComponents/Sidebar";
import SidebarSlide from "./components/webComponents/SidebarSlide";
import Footer from "./components/footer/Footer";
import initRouter from "./route/router";

const root = document.querySelector("#root");

const init = () => {
  root.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${SidebarSlide()}
    ${App()}
    ${Footer()}
  `;
};
init();
initRouter();
