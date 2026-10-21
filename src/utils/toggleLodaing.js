function toggleLoading(isShow) {
  const loadingModal = document.querySelector("#header .loading-modal");
  isShow
    ? loadingModal.classList.remove("hidden")
    : loadingModal.classList.add("hidden");
}

export default toggleLoading;
