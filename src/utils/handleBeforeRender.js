import toggleLoading from "./toggleLodaing";

export default function handleBeforeRender(id) {
  const $ = document.querySelector.bind(document);
  const dropMenu = $("#search-dropdown");
  dropMenu.classList.add("hidden");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  toggleLoading(true);
  const sidebarSlide = $("#sidebar-slide");
  const sidebarBtn = $(`.sidebar-item.${id}`);
  const sidebarSlideBtn = $(`.sidebar-slide-nav-item.${id}`);
  const sidebarSlideOVerlay = $(".sidebar-slide-overlay");

  if (
    sidebarSlideOVerlay.classList.contains("backdrop-blur-sm") &&
    !sidebarSlideOVerlay.classList.contains("opacity-0") &&
    !sidebarSlideOVerlay.classList.contains("pointer-events-none")
  ) {
    sidebarSlideOVerlay.classList.add("opacity-0", "pointer-events-none");
    sidebarSlideOVerlay.classList.remove("backdrop-blur-sm");
  }

  if (!sidebarSlide.classList.contains("-translate-x-full")) {
    sidebarSlide.classList.add("-translate-x-full");
  }

  if (!id) {
    $(".sidebar-item.active")?.classList.remove("active");
    $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove(
      "active"
    );
    return;
  }
  if (sidebarBtn && sidebarSlideBtn) {
    $(".sidebar-item.active")?.classList.remove("active");
    $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove(
      "active"
    );
    sidebarBtn.classList.add("active");
    sidebarSlideBtn.classList.add("active");
  }
}
