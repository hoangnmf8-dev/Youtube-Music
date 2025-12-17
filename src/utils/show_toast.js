function showToast(state, text) {
  const toastEl = document.querySelector("#header .toast");
  toastEl.innerText = text;
  setTimeout(() => {
    if (state) {
      toastEl.classList.add("bg-green-500", "show");
    } else {
      toastEl.classList.add("bg-red-400", "show");
    }
  }, 100);

  setTimeout(() => {
    if (state) {
      toastEl.classList.remove("bg-green-500", "show");
    } else {
      toastEl.classList.remove("bg-red-400", "show");
    }
    toastEl.innerText = "";
  }, 2200);
}

export default showToast;
