import handleBeforeRender from "../utils/handleBeforeRender";
import toggleLoading from "../utils/toggleLodaing";

function Upgrade() {
  return `
    <h1 class="text-4xl lg:text-5xl font-semibold text-white mb-10">Upgrade</h1>
    <p class="text-2xl lg:text-2xl font-semibold text-white/40">Comming soon...</p>
  `
}

export default Upgrade;

export const afterRenderUpgrade = () => {
  handleBeforeRender("upgrade");
  toggleLoading(false);
}