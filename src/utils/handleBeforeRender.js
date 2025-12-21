import toggleLoading from "./toggleLodaing";

export default function handleBeforeRender(id) {
  const $ = document.querySelector.bind(document);
  toggleLoading(true);
  const sidebarSlide = $("#sidebar-slide");
  const sidebarBtn = $(`.sidebar-item.${id}`);
  const sidebarSlideBtn = $(`.sidebar-slide-nav-item.${id}`);

  if(!sidebarSlide.classList.contains("-translate-x-full")) {
    sidebarSlide.classList.add("-translate-x-full");
  }

  if(!id) {
    $(".sidebar-item.active")?.classList.remove("active");
    $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove("active");
    return;
  }
  if(sidebarBtn && sidebarSlideBtn) {
    $(".sidebar-item.active")?.classList.remove("active");
    $(".sidebar-item.sidebar-slide-nav-item.active")?.classList.remove("active");
    sidebarBtn.classList.add("active");
    sidebarSlideBtn.classList.add("active");
  }

  
}
