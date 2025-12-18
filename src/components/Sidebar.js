function Sidebar() {
  return `
    <aside id="sidebar"
      class="pt-8 hidden lg:flex flex-col w-22 h-full bg-[#030303] backdrop-blur-xl text-white fixed top-16 left-0 z-20"
    >
      <div class="sidebar-wrapper row flex flex-col items-center">
        
      </div>
    </aside>
  `;
}

export default Sidebar;

const $ = document.querySelector.bind(document);

const renderBeforeLogin = () => {
  const sidebarWrapper = $("#sidebar .sidebar-wrapper");
  sidebarWrapper.innerHTML = `
    <a href="/" class="sidebar-item group active flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-house text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Trang chủ</p>
    </a>
    <a href="/explore" class="sidebar-item group flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-compass text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Khám phá</p>
    </a>
    <a href="/library" class="sidebar-item group flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-bookmark text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</p>
    </a>
    <div id="sidebar-login">
      <hr class="my-3 w-full border-white/20 ">
      <a href="/login" data-navigo="" class="flex flex-col items-center justify-center gap-1 p-3
              hover:bg-white/10 rounded-xl transition group">
        <i class="fa-regular fa-user text-2xl"></i>
        <span class="text-[11px] text-gray-300 group-hover:text-white">
            Đăng nhập
        </span>
      </a>
    </div>
  `;
};

const renderAfterLogin = () => {
  const sidebarWrapper = $("#sidebar .sidebar-wrapper");
  sidebarWrapper.innerHTML = `
    <a href="/" class="sidebar-item group active flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-house text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Trang chủ</p>
    </a>
    <a href="/explore" class="sidebar-item group flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-compass text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Khám phá</p>
    </a>
    <a href="/library" class="sidebar-item group flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-regular fa-bookmark text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</p>
    </a>
    <a href="/upgrade" class="sidebar-item group flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl">
      <i class="fa-solid fa-crown text-2xl"></i>
      <p class="text-[11px] text-gray-300 group-hover:text-white">Nâng cấp</p>
    </a>
  `;
};

export const afterRenderSidebar = () => {
  if (localStorage.getItem("access_token")) {
    renderAfterLogin();
  } else {
    renderBeforeLogin();
  }
};
