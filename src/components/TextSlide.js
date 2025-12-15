import "../assets/text_slide.css";
function TextSlide() {
  return `
    <section class="mt-10 lg:mt-20">
      <div class="section-heading relative">
        <h2
          class="section-title text-[22px] md:text-[32px] lg:text-[45px] text-white font-bold"
        >
        </h2>
        <div
          class="section-controls absolute -top-[10px] -translate-y-full right-0 flex gap-2"
        >
          <button class="section-controls-btn active back">
            <i class="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button class="section-controls-btn next">
            <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      <div class="section-body flex overflow-x-auto gap-4 scrollbar-pill pb-10">
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
        <a
          href=""
          class="section-body-item flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20"
          >Năng lượng</a
        >
      </div>
    </section>
  `
}

export default TextSlide;