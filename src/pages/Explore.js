import Header from "../components/Header";
import Footer from "../components/Footer";
import SongSlide from "../components/SongSlide/SongSlide";
import QuickPickSlide from "../components/quickpickSlide/QuickPickSlide";
function Explore() {
  return `
    <div class="p-2">
      <section class="flex flex-col md:flex-row gap-4">
        <a href="/" data-navigo="" class="flex items-center gap-3 px-6 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-solid fa-compact-disc text-2xl"></i>
          <span>Bản phát hành mới</span>
        </a>
  
        <a href="/" data-navigo="" class="flex items-center gap-3 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-solid fa-chart-line text-2xl"></i>
          <span>Bảng xếp hạng</span>
        </a>
  
        <a href="/" data-navigo="" class="flex items-center gap-3 px-6 md:px-3 xl:px-6 py-4 bg-[#212c39] text-white rounded-xl text-md lg:text-lg xl:text-xl font-bold hover:bg-white/20 transition cursor-pointer w-full md:w-1/3">
          <i class="fa-regular fa-face-smile text-2xl"></i>
          <span>Tâm trạng và thể loại</span>
        </a>
      </section>
    </div>
    
  `;
}

export default Explore;
