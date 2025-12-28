export default function dragAndDrop() {
  let cachedWinSize = { width: 400, height: 0 };

  const init = () => {
    const chatbotBtn = document.querySelector("#chatbase-bubble-button");
    const chatbotWindow = document.querySelector("#chatbase-bubble-window");
    if (!chatbotBtn || !chatbotWindow) return false;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    
    chatbotWindow.style.height = `${vh / 2.5}px`;
    chatbotWindow.style.overflow = "auto";
    
    cachedWinSize.height = vh / 2.5;
    cachedWinSize.width = chatbotWindow.offsetWidth || 400;

    const btnTop = vh - chatbotBtn.clientHeight - 100;
    const btnLeft = vw - chatbotBtn.clientWidth - 60;

    chatbotBtn.style.top = `${btnTop}px`;
    chatbotBtn.style.left = `${btnLeft}px`;

    const initWinTop = btnTop - cachedWinSize.height - 20;
    const initWinLeft = btnLeft - cachedWinSize.width + chatbotBtn.clientWidth;

    chatbotWindow.style.top = `${initWinTop}px`;
    chatbotWindow.style.left = `${initWinLeft}px`;

    let isDown = false;
    let dragged = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    chatbotBtn.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const rect = chatbotBtn.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      startX = e.clientX;
      startY = e.clientY;
      isDown = true;
      dragged = false;
      chatbotBtn.setPointerCapture(e.pointerId);
      chatbotBtn.style.transition = "none";
      chatbotWindow.style.transition = "none";
    });

    chatbotBtn.addEventListener("pointermove", (e) => {
      if (!isDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!dragged && Math.hypot(dx, dy) > 5) dragged = true;
      if (!dragged) return;

      let bTop = e.clientY - offsetY;
      let bLeft = e.clientX - offsetX;

      const maxT = window.innerHeight - chatbotBtn.clientHeight - 20;
      const maxL = window.innerWidth - chatbotBtn.clientWidth - 20;

      bTop = Math.max(20, Math.min(bTop, maxT));
      bLeft = Math.max(20, Math.min(bLeft, maxL));

      chatbotBtn.style.top = `${bTop}px`;
      chatbotBtn.style.left = `${bLeft}px`;

      let wH = chatbotWindow.offsetHeight || cachedWinSize.height;
      let wW = chatbotWindow.offsetWidth || cachedWinSize.width;

      if (chatbotWindow.offsetHeight !== 0) {
        cachedWinSize.height = wH;
        cachedWinSize.width = wW;
      }

      let wTop, wLeft;

      if (bTop <= wH + 20) {
        wTop = bTop + chatbotBtn.clientHeight + 10;
      } else {
        wTop = bTop - wH - 10;
      }

      if (bLeft + wW > window.innerWidth) {
        wLeft = bLeft - wW + chatbotBtn.clientWidth;
      } else {
        wLeft = bLeft;
      }

      chatbotWindow.style.top = `${wTop}px`;
      chatbotWindow.style.left = `${wLeft}px`;
    });

    chatbotBtn.addEventListener("pointerup", () => {
      isDown = false;
    });

    chatbotBtn.addEventListener("click", (e) => {
      if (dragged) {
        e.stopImmediatePropagation();
        dragged = false;
      }
    }, true);

    return true;
  };

  if (init()) return;

  const obs = new MutationObserver(() => {
    if (init()) obs.disconnect();
  });

  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 10000);
}