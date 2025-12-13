import Navigo from 'navigo';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Library from '../pages/Library';

export const router = new Navigo("/", {
  hash: false,
  linksSelector: "a"
});

const initRouter = async () => {
  const main = document.querySelector("#main");
  router
    .on("/", () => {
      main.innerHTML = Home();
    })
    .on("/explore", () => {
      main.innerHTML = Explore();
    })
    .on("/library", () => {
      main.innerHTML = Library();
    })
    .resolve();
}

export default initRouter;