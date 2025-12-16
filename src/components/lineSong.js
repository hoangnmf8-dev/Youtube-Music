function lineSong() {
  return `
    <a href="" class="flex w-full items-center px-3 py-4 gap-4 hover:bg-[#25384a] cursor-pointer transition-all duration-150 text-white group">
      <div class="w-6 text-center">1</div>
      <div class="relative w-12 aspect-square overflow-hidden rounded-sm">
        <img class="block w-full aspect-square transition-all duration-150 group-hover:brightness-50 " src="https://thichtrangtri.com/wp-content/uploads/2025/05/anh-phong-canh-chill-29.jpg" alt="">
        <i class="fa-solid fa-play absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"></i>
      </div>
      <div class="flex flex-col justify-between flex-1">
        <div class="font-semibold">Nhạc Điện Tử Album 5 - Bài 2</div>
        <div class="text-sm text-white/60"></div>
      </div>
      <div class="text-sm text-white/50">5:43</div>
    </a>
  `
}

export default lineSong;