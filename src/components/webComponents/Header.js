import "../../assets/style.css";
import "../../assets/quickpick_slide.css";
import { router } from "../../route/router";
import { getProfile } from "../../service/authApi";
import { logout } from "../../service/httpRequest";
import { getSearch } from "../../service/searchApi";
import escapeHTML from "../../utils/escapeHTML";
import showToast from "../../utils/showToast";
import toggleLoading from "../../utils/toggleLodaing";
function Header() {
  return `
    <header
      id="header"
      class="fixed top-0 left-0 right-0 bg-primary z-30 w-ful h-[72px] pl-2 lg:pr-8 sm:px-4"
    >
      <div class="wrapper h-full w-full mx-auto">
        <div class="row h-full flex justify-between items-center">
          <div class="header-nav flex items-center gap-5 mr-5 sm:mr-20">
            <button class="header-btn-nav p-3 flex items-center transition transition-colors duration-1.5 cursor-pointer rounded-full hover:bg-hover">
              <i class="fa-solid fa-bars text-white text-xl"></i>
            </button>

            <a class="logo flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="none"
                height="26"
                viewBox="0 0 77 26"
                width="77"
              >
                <clipPath id="a"><path d="m0 0h77v26h-77z" /></clipPath>
                <g clip-path="url(#a)">
                  <g fill="#fff">
                    <path
                      d="m30.112 21.8671h2.32v-7.29c0-2.04-.04-4.21-.2-7.10995h.26l.43 1.78 2.74 12.61995h2.36l2.69-12.61995.47-1.78h.24c-.12 2.56995-.19 4.88995-.19 7.10995v7.29h2.33v-16.79995h-3.96l-1.42 6.20995c-.6 2.58-1.03 5.78-1.28 7.41h-.19c-.18-1.66-.63-4.85-1.22-7.39l-1.46-6.22995h-3.92z"
                    />
                    <path
                      d="m48.202 22.0571c1.46 0 2.37-.61 3.12-1.71h.11l.11 1.52h1.99v-12.35995h-2.64v9.92995c-.28.49-.93.85-1.54.85-.77 0-1.01-.61-1.01-1.63v-9.14995h-2.63v9.26995c0 2.01.58 3.28 2.49 3.28z"
                    />
                    <path
                      d="m58.7536 22.1271c2.42 0 3.77-1.07 3.77-3.26 0-1.99-1-2.8-3.38-4.42-1.09-.72-1.68-1.17-1.68-2.23 0-.79.49-1.21 1.38-1.21.97 0 1.3.64 1.34 2.46l2.16-.12c.18-2.85-.84-4.06995-3.46-4.06995-2.48 0-3.67 1.06995-3.67 3.18995 0 1.96.93 2.85 2.68 4.07 1.55 1.07 2.4 1.74 2.4 2.63 0 .73-.51 1.26-1.4 1.26-1.02 0-1.6-.88-1.5-2.21l-2.19.04c-.34 2.56.86 3.87 3.55 3.87z"
                    />
                    <path
                      d="m65.387 7.93715c.9 0 1.32-.3 1.32-1.54 0-1.16-.45-1.52-1.32-1.52-.88 0-1.31.32-1.31 1.52 0 1.24.41 1.54 1.31 1.54zm-1.22 13.92995h2.53v-12.35995h-2.53z"
                    />
                    <path
                      d="m72.3428 22.0671c1.26 0 1.97-.1499 2.54-.69.85-.74 1.2-1.89 1.14-3.83l-2.31-.12c0 2.12-.34 2.92-1.33 2.92-1.09 0-1.27-1.19-1.27-3.35v-2.56c0-2.36.23-3.48 1.29-3.48.88 0 1.23.74 1.23 3.1l2.29-.16c.16-1.69-.01-3.07-.81-3.84-.6-.55995-1.49-.77995-2.67-.77995-3.03 0-3.97 1.91995-3.97 5.56995v1.69c0 3.65.71 5.53 3.87 5.53z"
                    />
                  </g>
                  <path
                    d="m13 26c7.176 0 13-5.824 13-13s-5.824-13-13-13-13 5.824-13 13 5.824 13 13 13z"
                    fill="#f03"
                  />
                  <path
                    d="m20.5 13c0 4.1439-3.3561 7.5-7.5 7.5-4.14386 0-7.5-3.3561-7.5-7.5 0-4.14386 3.35614-7.5 7.5-7.5 4.1439 0 7.5 3.35614 7.5 7.5z"
                    stroke="#fff"
                  />
                  <path d="m17.75 13-7.5-4.25v8.5z" fill="#fff" />
                </g>
              </svg>
            </a>
          </div>

          <div class="flex items-center gap-4 md:justify-between md:flex-1">
            <div
              class="search-wrapper hidden md:flex items-center gap-2 bg-[#292929] backdrop-blur-sm px-4 py-1.5 lg:py-2.5 rounded md:w-[290px] lg:w-[470px] md:static md:top-auto md:left-auto md:translate-x-0 md:translate-y-0  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[95%]"
            >
              <div class="search-glass hidden md:inline-block"><i class="fa-solid fa-magnifying-glass w-5 h-5 text-gray-300"></i></div>
              <div class="search-left inline-block md:hidden cursor-pointer hover:bg-gray-500 p-2 rounded-full relative top-[2px]"><i class="fa-solid fa-arrow-left-long w-5 h-5 text-gray-300"></i></div>
              <input
                id="navbar-search-input"
                placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ"
                autocomplete="off"
                class="bg-transparent outline-none flex-1 px-3 text-md text-white placeholder-gray-400"
              />

              <button
                id="search-clear"
                class="hidden text-gray-300 hover:text-white transition"
              >
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
              <div
                id="search-dropdown"
                class="absolute p-3 left-0 right-0 top-full bg-[#121212] text-white rounded-lg shadow-lg mt-1 hidden z-9999"
              >
                
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button class="search flex items-center md:hidden">
                <i class="fa-solid fa-magnifying-glass text-xl text-gray-300"></i>
              </button>
  
              <button
                class="hidden sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition"
              >
                <i class="fa-brands fa-chromecast text-2xl text-gray-300"></i>
              </button>
  
              <button
                class="hidden sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition"
              >
                <i class="fa-solid fa-ellipsis-vertical text-xl"></i>
              </button>
  
              <div class="header-user select-none">
               ${
                 localStorage.getItem("access_token")
                   ? `<button
                class="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer hover:bg-white/30 transition"
              >
                M 
              </button>

              <div
                class="drop-menu absolute right-2 mt-2 w-52 rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg border border-white/10 transition-all duration-150 z-50"
              >
                <a href="/auth/profile" data-navigo class="drop-menu-item px-4 py-3 text-white block hover:bg-white/10">Thông tin người dùng</a>
                <a href="/auth/password" data-navigo class="drop-menu-item px-4 py-3 text-white block hover:bg-white/10">Đổi mật khẩu</a>
                <a href="" data-navigo class="drop-menu-item logout px-4 py-3 text-red-500 block hover:bg-white/10">Đăng xuất</a>
              </div>`
                   : `<a href="/login" class="rounded-full bg-white text-sm font-semibold text-black px-5 py-3 cursor-pointer hover:bg-gray-300 transition-all duration-150">Đăng nhập</a>`
               }
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="loading-modal hidden">
        <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    </header>
  `;
}

export default Header;

const $ = document.querySelector.bind(document);

const renderBeforeLogin = () => {
  const headerUserBtn = $("#header .header-user");
  headerUserBtn.innerHTML = `
    <a href="/login" class="max-w-30 rounded-full bg-white text-sm font-semibold text-black px-5 py-3 cursor-pointer hover:bg-gray-300 transition-all duration-150 text-nowrap">Đăng nhập</a>
  `;
};

const renderAfterLogin = async () => {
  let data;
  if (localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") {
    data = JSON.parse(localStorage.getItem("user"));
  } else {
    data = await getProfile();
    localStorage.setItem("user", JSON.stringify(data));
  }
  const headerUserBtn = $("#header .header-user");
  headerUserBtn.innerHTML = `
      <button
        id="header-profile"
        class="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer hover:bg-white/30 transition"
      >
        ${data.name.slice(0, 1).toUpperCase()}
      </button>
  
      <div
        class="drop-menu absolute right-2 mt-2 w-52 rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg border border-white/10 transition-all duration-150 z-50"
      >
        <a href="/auth/profile" data-navigo class="drop-menu-item px-4 py-3 text-white block hover:bg-white/10">Thông tin người dùng</a>
        <a href="/auth/password" data-navigo class="drop-menu-item px-4 py-3 text-white block hover:bg-white/10">Đổi mật khẩu</a>
        <a href="" data-navigo class="drop-menu-item logout px-4 py-3 text-red-500 block hover:bg-white/10">Đăng xuất</a>
      </div>
    `;
  const dropMenu = $("#header .header-user .drop-menu");
  headerUserBtn.addEventListener("click", (e) => {
    dropMenu.classList.toggle("show");
  });
  router.updatePageLinks();
};

const showSidebarSlide = () => {
  const headerNavBtn = $("#header .header-btn-nav");
  const sidebarSlideOVerlay = $(".sidebar-slide-overlay");
  headerNavBtn.addEventListener("click", (e) => {
    $("#sidebar-slide").classList.remove("-translate-x-full");
    sidebarSlideOVerlay.classList.remove("opacity-0", "pointer-events-none");
    sidebarSlideOVerlay.classList.add("backdrop-blur-sm");
  });
};

const handleLogout = () => {
  const logoutBtn = $("#header .logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      toggleLoading(true);
      showToast(true, "Đăng xuất thành công");
      logout();
      logoutBtn.closest(".drop-menu").classList.remove("show");
    });
  }
};

const handleSearch = () => {
  let id;
  return function (e) {
    console.log(1)
    clearTimeout(id);
    id = setTimeout(async () => {
      const dropMenu = $("#search-dropdown");
      const clearInput = $("#search-clear");
      let valueInput = e.target.value.trim();
      if (!valueInput) {
        clearInput.classList.add("hidden");
        dropMenu.classList.add("hidden");
        return;
      }
      clearInput.classList.remove("hidden");

      clearInput.onclick = (e) => {
        $("#header input").value = "";
        dropMenu.classList.add("hidden");
        clearInput.classList.add("hidden");
      };

      const valueSearch = await getSearch(valueInput);
      dropMenu.classList.remove("hidden");
      if (!valueSearch.suggestions.length && !valueSearch.completed.length) {
        dropMenu.innerHTML = `<p class="p-3 text-sm text-gray-300">Không tìm thấy kết quả</p>`;
        return;
      }
      let path;
      if (valueSearch.completed[0].type === "song") {
        path = "/songs/details";
      } else if (valueSearch.completed[0].type === "playlist") {
        path = "/playlists/details";
      } else {
        path = "/albums/details";
      }

      dropMenu.innerHTML = `
        <p class="text-sm text-gray-300 mb-2">Gợi ý</p>
        <div class="max-h-[200px] scrollbar-search overflow-y-auto">
          ${valueSearch.suggestions
            .map(
              (item) => `
            <div class="suggest-result px-3 py-2 hover:bg-white/10 cursor-pointer rounded text-sm" data-action="suggest" data-value="${item}">
              ${escapeHTML(item)}
            </div>  
          `
            )
            .join("")}
        </div>
        <hr class="h-0.5 text-gray-600 w-full">
        <p class="text-sm text-gray-300 mt-3 mb-2">Kết quả</p>
        <div class="max-h-80 scrollbar-search overflow-y-auto">
            ${valueSearch.completed
              .map(
                (item) => `
               <div data-url="${path}/${item.slug}" class="completed-result flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer rounded">
                <img src="${item.thumbnails[0]}" class="w-12 h-12 rounded object-cover">
                <div>
                  <p class="font-medium">${item.title}</p>
                  <p class="text-xs text-gray-400">${item.subtitle}</p>
                </div>
              </div>  
            `
              )
              .join("")}
        </div>
      `;
      document.querySelectorAll(".completed-result").forEach((item) => {
        item.onclick = (e) => {
          const url = item.dataset.url;
          if (!url) return;
          router.navigate(url);
          clearInput.classList.add("hidden");
          $("#header input").value = "";
          dropMenu.classList.add("hidden");
        };
      });

      document.querySelectorAll(".suggest-result").forEach((item) => {
        item.onclick = (e) => {
          const inputSearchValue = item.innerText;
          $("#header input").value = inputSearchValue;
          const valueSuggest = valueSearch.suggestions.filter(
            (item) => item === inputSearchValue
          );
          const valueCompleted = valueSearch.completed.filter(
            (item) => item.title === inputSearchValue
          );
          dropMenu.innerHTML = `
            <p class="text-sm text-gray-300 mb-2">Gợi ý</p>
            <div class="max-h-80 overflow-y-auto">
              ${valueSuggest
                .map(
                  (item) => `
                <div class="suggest-result px-3 py-2 hover:bg-white/10 cursor-pointer rounded text-sm" data-action="suggest" data-value="${item}">
                  ${escapeHTML(item)}
                </div>  
              `
                )
                .join("")}
            </div>
            <hr class="h-0.5 text-gray-600 w-full">
            <p class="text-sm text-gray-300 mt-3 mb-2">Kết quả</p>
            <div class="max-h-80 overflow-y-auto">
                ${valueCompleted
                  .map(
                    (item) => `
                  <div data-url="${path}/${item.slug}" class="completed-result flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer rounded">
                    <img src="${item.thumbnails[0]}" class="w-12 h-12 rounded object-cover">
                    <div>
                      <p class="font-medium">${item.title}</p>
                      <p class="text-xs text-gray-400">${item.subtitle}</p>
                    </div>
                  </div>  
                `
                  )
                  .join("")}
            </div>
          `;
        };
      });
      router.updatePageLinks();
    }, 300);
  };
};

const showInputInMobile = () => {
  const searchIcon = $("#header .search");
  const searchLeft = $(".search-left");
  const headerSearchWrapper = $("#header .search-wrapper");
  
  searchIcon.onclick = e => {
    headerSearchWrapper.classList.remove("hidden");
    headerSearchWrapper.classList.add("flex");
  }

  searchLeft.onclick = e => {
    headerSearchWrapper.classList.remove("flex");
    headerSearchWrapper.classList.add("hidden");
  }
};
export const afterRenderHeader = async () => {
  if (localStorage.getItem("access_token")) {
    await renderAfterLogin();
    showInputInMobile();
    handleLogout();
  } else {
    renderBeforeLogin();
  }
  $("#header input").oninput = handleSearch();
  showSidebarSlide();
  router.updatePageLinks();
};
