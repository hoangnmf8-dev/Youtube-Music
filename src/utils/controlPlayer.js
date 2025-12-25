import { calcSongTime } from "./calcListTime";
import escapeHTML from "./escapeHTML";
import showToast from "./showToast";
import toggleLoading from "./toggleLodaing";
import eventPlay from "../service/eventPlayApi";
export default class ControlPlayer {
  constructor({ audio, dataSongs }) {
    this.$ = document.querySelector.bind(document);
    this.audio = audio;
    this.dataSongs = dataSongs;
    this.index = 0;
    this._reqId = 0;
    this.debounceVolume = false;
    this.isSeeking = false;
    this.isSeekingVolume = false;
    this.isRandom = false;
    this.isRepeat = false;
    this.endDebounce = false;
    this.debounceRandomAndRepeat = false;
  }

  setCurrentSong(song) {
    sessionStorage.setItem("current_song", JSON.stringify(song));
  }

  scrollToItem(el, { behavior = "smooth", block = "center" } = {}) {
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior, block, inline: "nearest" });
    });
  }

  updateUI(song) {
    console.log(1)
    const $ = document.querySelector.bind(document);
    const mainInforThum = $(".main-song-infor img");
    const mainInforTitle = $(".main-song-infor .item-title");
    const mainInforDuration = $(".main-song-infor .item-duration");

    const playerThumb = $(`#player .thumb`);
    const expandPlayerThumb = $(`.expand-player .thumb`);
    const playerTitle = $("#player .title");
    const expandPlayerTitle = $(".expand-player .title");
    const playerDuration = $(`#player .duration`);
    const expandPlayerDuration = $(`.expand-player .duration`);
    if (mainInforThum && song.thumbnails) {
      mainInforThum.src = escapeHTML(song.thumbnails[0]);
    }
    playerThumb.src = escapeHTML(song.thumbnails[0]);
    expandPlayerThumb.src = escapeHTML(song.thumbnails[0]);

    if (mainInforTitle) {
      mainInforTitle.innerText = escapeHTML(song.title);
    }
    playerTitle.innerText = escapeHTML(song.title);
    expandPlayerTitle.innerText = escapeHTML(song.title);

    if (mainInforDuration) {
      mainInforDuration.innerText = `Thời lượng: ${escapeHTML(
        calcSongTime(song.duration)
      )}`;
    }
    playerDuration.innerText = `${escapeHTML(
      calcSongTime(this.audio.duration)
    )}`;
    expandPlayerDuration.innerText = `${escapeHTML(
      calcSongTime(this.audio.duration)
    )}`;

    //Xử lý UI cho song-item
    this.$("#main .song-detail-item.active")?.classList.remove("active");
    this.$(".expand-player .song-detail-item.active")?.classList.remove(
      "active"
    );
    const mainSongItem = Array.from(
      document.querySelectorAll("#main .song-detail-item")
    ).find((item) => +item.dataset.id === this.index);
    const expandSongItem = Array.from(
      document.querySelectorAll(".expand-player .song-detail-item")
    ).find((item) => +item.dataset.id === this.index);
    mainSongItem?.classList.add("active");
    expandSongItem?.classList.add("active");

    //Icon play
    if (!this.audio.paused) {
      this.$(".expand-player .btn-play").classList.add("hidden");
      this.$(".expand-player .btn-pause").classList.remove("hidden");
    } else {
      this.$(".expand-player .btn-play").classList.remove("hidden");
      this.$(".expand-player .btn-pause").classList.add("hidden");
    }

    //Tính vị trí cuộn đến phần tử đang active
    this.scrollToItem(mainSongItem, { block: "center" });

    const expandWrap = this.$("#footer .expand-player");
    if (expandWrap?.classList.contains("open")) {
      this.scrollToItem(expandSongItem, { block: "center" });
    }
  }

  async play(idSong) {
    const srcSong = this.dataSongs?.[idSong]?.audioUrl;
    if (!srcSong) throw new Error("Tài nguyên không có sẵn");

    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = srcSong;
    this.audio.load();
    this.$("#player .btn-play").classList.add("hidden");
    this.$("#player .btn-pause").classList.remove("hidden");
    return this.audio.play();
  }

  timeOutPlay(ms = 10000) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Tài nguyên không có sẵn")), ms);
    });
  }

  cancelAudio() {
    this.audio.pause();
    this.audio.removeAttribute("src");
    this.audio.load();
  }

  addSong(prefixItemSong) {
    this._reqId = this._reqId || 0;
    document
      .querySelectorAll(`${prefixItemSong} .song-detail-item`)
      .forEach((item) => {
        item.onclick = async (e) => {
          const player = this.$(".player-wrapper");
          const expandPlayer = this.$(".expand-player");
          if (!item) return;

          //Lấy ra id song và xử lý play, lỗi khi load chậm
          const idSong = +item.dataset.id;
          this.index = idSong;
          const reqId = ++this._reqId;

          try {
            toggleLoading(true);
            await Promise.race([this.play(idSong), this.timeOutPlay(10000)]);
            this.updateUI(this.dataSongs[this.index]);
            this.setCurrentSong(this.dataSongs[this.index]);
            player.classList.remove("hidden");
            if (localStorage.getItem("access_token")) {
              eventPlay({ songId: this.dataSongs[this.index].id });
            }
          } catch (error) {
            if (reqId !== this._reqId) return;
            if (error?.name === "AbortError") return; //Chỉ có tác dụng bỏ qua lỗi abort của trình duyệt để hiện error message không có sẵn tài nguyên
            this.cancelAudio();
            showToast(false, "Tài nguyên không có sẵn");
          } finally {
            if (reqId === this._reqId) toggleLoading(false);
          }
        };
      });
  }

  updateProgressAnDuration(prefix, prefixItemSong) {
    const progress = this.$(`${prefix} .progress`);
    const currentTimeSpan = this.$(`${prefix} .current`);
    const beginSeek = () => (this.isSeeking = true);
    progress.addEventListener("mousedown", beginSeek);
    progress.addEventListener("touchstart", beginSeek);
    const endSeek = () => (this.isSeeking = false);
    progress.addEventListener("mouseup", endSeek);
    progress.addEventListener("touchend", endSeek);

    this.audio.addEventListener("timeupdate", (e) => {
      if (this.isSeeking) return;
      const duration = this.audio.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      progress.value = (e.target.currentTime / duration) * 100;
      currentTimeSpan.innerText = calcSongTime(this.audio.currentTime);

      const percentListen = Math.floor(
        (this.audio.currentTime / this.audio.duration) * 100
      );
    });

    progress.addEventListener("change", (e) => {
      if (this.audio.duration) {
        this.audio.currentTime = (progress.value * this.audio.duration) / 100;
      }
    });
  }

  nextAndBackSong(prefix) {
    this._reqId = this._reqId || 0;
    document.addEventListener("click", async (e) => {
      let isValid = false;
      if (e.target.closest(`${prefix} .btn-next`)) {
        this.index === this.dataSongs.length - 1
          ? (this.index = 0)
          : ++this.index;
        isValid = true;
      }
      if (e.target.closest(`${prefix} .btn-prev`)) {
        this.index === 0
          ? (this.index = this.dataSongs.length - 1)
          : --this.index;
        isValid = true;
      }
      if (!isValid) return;
      const reqId = ++this._reqId;

      try {
        toggleLoading(true);
        await Promise.race([this.play(this.index), this.timeOutPlay(10000)]);
        this.updateUI(this.dataSongs[this.index]);
        this.setCurrentSong(this.dataSongs[this.index]);
      } catch (error) {
        if (reqId !== this._reqId) return;
        if (error?.name === "AbortError") return; //Chỉ có tác dụng bỏ qua lỗi abort của trình duyệt để hiện error message không có sẵn tài nguyên
        this.cancelAudio();
        showToast(false, "Tài nguyên không có sẵn");
      } finally {
        if (reqId === this._reqId) toggleLoading(false);
      }
    });
  }

  playAndPauseSong(prefix) {
    {
      document.addEventListener(
        "click",
        (e) => {
          if (
            e.target.closest(`#player .btn-play`) ||
            e.target.closest(`.expand-player .btn-play`)
          ) {
            this.audio.play();
            this.$(`#player .btn-play`).classList.add("hidden");
            this.$(`#player .btn-pause`).classList.remove("hidden");
            this.$(`.expand-player .btn-play`).classList.add("hidden");
            this.$(`.expand-player .btn-pause`).classList.remove("hidden");
          }
          if (
            e.target.closest(`#player .btn-pause`) ||
            e.target.closest(`.expand-player .btn-pause`)
          ) {
            this.audio.pause();
            this.$(`#player .btn-play`).classList.remove("hidden");
            this.$(`#player .btn-pause`).classList.add("hidden");
            this.$(`.expand-player .btn-play`).classList.remove("hidden");
            this.$(`.expand-player .btn-pause`).classList.add("hidden");
          }
        },
        { signal: this._signal }
      );
    }
  }

  controlVolume(prefix) {
    const volumeBtn = this.$(`${prefix} .song-volume`);
    const volumeHighBtn = this.$(`${prefix} .volume-high`);
    const volumeLowBtn = this.$(`${prefix} .volume-low`);
    const volumeMuteBtn = this.$(`${prefix} .volume-mute`);
    const volumeProgress = this.$(`${prefix} .progress-volume`);

    this.audio.addEventListener("volumechange", () => {
      volumeProgress.value = this.audio.volume * 100;
      if (+volumeProgress.value === 0) {
        volumeMuteBtn.classList.remove("hidden");
        volumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.add("hidden");
      }

      if (+volumeProgress.value > 0 && +volumeProgress.value <= 50) {
        volumeMuteBtn.classList.add("hidden");
        volumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.remove("hidden");
      }

      if (+volumeProgress.value > 50) {
        volumeMuteBtn.classList.add("hidden");
        volumeHighBtn.classList.remove("hidden");
        volumeLowBtn.classList.add("hidden");
      }
    });

    volumeProgress.addEventListener("input", (e) => {
      this.audio.volume = volumeProgress.value / 100;
      if (+volumeProgress.value === 0) {
        volumeMuteBtn.classList.remove("hidden");
        volumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.add("hidden");
      }

      if (+volumeProgress.value > 0 && +volumeProgress.value <= 50) {
        volumeMuteBtn.classList.add("hidden");
        volumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.remove("hidden");
      }

      if (+volumeProgress.value > 50) {
        volumeMuteBtn.classList.add("hidden");
        volumeHighBtn.classList.remove("hidden");
        volumeLowBtn.classList.add("hidden");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        e.target.closest(`${prefix} .volume-low`) ||
        e.target.closest(`${prefix} .volume-high`) ||
        e.target.closest(`${prefix} .volume-mute`)
      ) {
        if (volumeProgress.value > 0) {
          volumeProgress.value = 0;
          this.audio.volume = 0;
        } else {
          volumeProgress.value = 50;
          this.audio.volume = 0.5;
        }
      }
    });
  }

  handleEndSong() {
    this._reqId = this._reqId || 0;
    if (this.endDebounce) return; //Chặn lần 2 gọi hàm để tránh audio thực hiện sự kiện ended 2 lần
    this.endDebounce = true;
    this.audio.addEventListener("ended", async (e) => {
      if (this.isRepeat) {
        this.index = this.index;
      } else if (this.isRandom) {
        this.index = Math.floor(Math.random() * this.dataSongs.length);
      } else {
        this.index === this.dataSongs.length - 1
          ? (this.index = 0)
          : ++this.index;
      }
      const reqId = ++this._reqId;
      try {
        toggleLoading(true);
        await Promise.race([this.play(this.index), this.timeOutPlay(10000)]);
        this.updateUI(this.dataSongs[this.index]);
        this.setCurrentSong(this.dataSongs[this.index]);
      } catch (error) {
        if (reqId !== this._reqId) return;
        if (error?.name === "AbortError") return; //Chỉ có tác dụng bỏ qua lỗi abort của trình duyệt để hiện error message không có sẵn tài nguyên
        this.cancelAudio();
        showToast(false, "Tài nguyên không có sẵn");
      } finally {
        if (reqId === this._reqId) toggleLoading(false);
      }
    });
  }

  randomAndRepeatSong() {
    if (this.debounceRandomAndRepeat) return;
    this.debounceRandomAndRepeat = true;
    document.onclick = (e) => {
      if (
        e.target.closest(`#player .btn-random`) ||
        e.target.closest(`.expand-player .btn-random`)
      ) {
        this.isRandom = !this.isRandom;
        if (
          !this.$("#player .btn-random i").classList.contains("text-blue-400")
        ) {
          this.$("#player .btn-random i").classList.add("text-blue-400");
        } else {
          this.$("#player .btn-random i").classList.remove("text-blue-400");
        }
        if (
          !this.$(".expand-player .btn-random i").classList.contains(
            "text-blue-400"
          )
        ) {
          this.$(".expand-player .btn-random i").classList.add("text-blue-400");
        } else {
          this.$(".expand-player .btn-random i").classList.remove(
            "text-blue-400"
          );
        }
      }

      if (
        e.target.closest(`#player .btn-repeat`) ||
        e.target.closest(`.expand-player .btn-repeat`)
      ) {
        this.isRepeat = !this.isRepeat;
        if (
          !this.$("#player .btn-repeat i").classList.contains("text-blue-400")
        ) {
          this.$("#player .btn-repeat i").classList.add("text-blue-400");
        } else {
          this.$("#player .btn-repeat i").classList.remove("text-blue-400");
        }
        if (
          !this.$(".expand-player .btn-repeat i").classList.contains(
            "text-blue-400"
          )
        ) {
          this.$(".expand-player .btn-repeat i").classList.add("text-blue-400");
        } else {
          this.$(".expand-player .btn-repeat i").classList.remove(
            "text-blue-400"
          );
        }
      }
    };
  }

  start(prefix, prefixItemSong) {
    this.updateProgressAnDuration(prefix);
    this.addSong(prefixItemSong, prefix);
    this.nextAndBackSong(prefix);
    this.playAndPauseSong();
    this.controlVolume(prefix);
    this.handleEndSong(prefix);
    this.randomAndRepeatSong();
  }
}
