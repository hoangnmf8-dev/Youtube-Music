import handleBeforeRender from "../utils/handleBeforeRender";
import toggleLoading from "../utils/toggleLodaing";

function Upgrade() {
  return `
    <h1>Upgrade</h1>
  `
}

export default Upgrade;

export const afterRenderUpgrade = () => {
  handleBeforeRender("upgrade");
  toggleLoading(false);
}