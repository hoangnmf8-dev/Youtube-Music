function ExpandPlayerDetail() {
  return `
    <div class="flex-1 overflow-y-auto max-h-screen pr-2">
      <h3
        class="text-2xl font-semibold mb-4 border-b border-teal-600/40 pb-2"
      >
        Danh sách phát liên quan
      </h3>
      <div
        id="exp-related-list"
        class="flex flex-col overflow-y-auto overscroll-y-contain"
      >
        <div
          class="track-item flex items-center gap-4 p-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition group"
          data-track-id="691cb501dd97648f597579f8"
        >
          <div class="relative">
            <img
              src="https://picsum.photos/seed/album-nhc-in-t-album-9-8/400/400"
              class="w-12 h-12 rounded-lg object-cover"
            />

            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200"
            ></div>

            <!-- Play icon -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200"
            >
              <i class="fa-solid fa-play text-white text-sm"></i>
            </div>
          </div>
          <div class="flex flex-col flex-1">
            <div class="font-semibold">Nhạc Điện Tử Album 9 - Bài 2</div>
            <div class="text-sm text-white/60">Không rõ nghệ sĩ</div>
          </div>

          <div class="text-sm text-white/50">2:36</div>
        </div>
      </div>
    </div>
  `
}

export default ExpandPlayerDetail;