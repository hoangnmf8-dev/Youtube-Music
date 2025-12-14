import Player from "./Player"
function Footer() {
  return `
    <footer id="footer" class="fixed left-0 right-0 bottom-0 text-white z-30">
      <div class="row h-full">
        ${Player()}
      </div>
    </footer>`;
}

export default Footer;
