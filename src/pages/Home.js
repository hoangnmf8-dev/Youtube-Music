import Navigo from "navigo";
import { router } from "../route/router";
import TextSlide from "../components/TextSlide"
import QuickPickSlide from "../components/QuickPickSlide"
import SongSlide from "../components/SongSlide"

function Home() {
  return `
    <h1 class="text-4xl lg:text-5xl font-semibold text-white mb-20">
      👋 Chào mừng <span>Nguyễn Minh Hoàng</span>
    </h1>
    ${TextSlide()}
    ${QuickPickSlide("personalized")}
    ${QuickPickSlide("quickpick")}
    ${SongSlide("albums")}
    ${SongSlide("today-hits")}
    ${SongSlide("country")}
  `;
}

export default Home;
