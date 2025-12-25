import { calcVideoTime } from "./calcListTime";
import escapeHTML from "./escapeHTML";

const $ = document.querySelector.bind(document);

export default class controlVideo {
  constructor(idIframe, dataVideo) {
    this.$$ = document.querySelectorAll.bind(document);
    this.$ = document.querySelector.bind(document);
    this.iframe = document.querySelector(`#${idIframe}`);
    this.dataVideo = dataVideo;
    this.player = null;
    this.idIframe = idIframe;
    this.isReady = false;
    this.initPlayer();
    this.index = 0;
    this.animationFrameId = null;
    this.isRandom = false;
    this.isRepeat = false;
    this.debounceRandom = false;
    this.debounceRepeat = false;
    this.isSeeking = false;
  }

  initPlayer() {
    if (this.iframe && !this.iframe.src.includes("enablejsapi=1")) {
      const separator = this.iframe.src.includes("?") ? "&" : "?";
      this.iframe.src += `${separator}enablejsapi=1`;
    }

    this.player = new YT.Player(this.idIframe, {
      events: {
        onReady: () => {
          this.isReady = true;
          console.log("YouTube Player is ready");
        },
        onStateChange: (event) => this.onPlayerStateChange(event),
        onError: (e) => console.error("YouTube API Error:", e.data),
      },
    });
  }

  playVideo(videoId) {
    if (
      this.isReady &&
      this.player &&
      typeof this.player.loadVideoById === "function"
    ) {
      this.player.loadVideoById(videoId);
      this.player.playVideo();
    }
  }

  pauseVideo() {
    if (this.isReady && this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }

  addVideo(prefixItem) {
    const items = this.$$(`${prefixItem} .video-detail-item`);
    if (items) {
      items.forEach((item) => {
        item.onclick = (e) => {
          const id = +item.dataset.id;
          const videoData = this.dataVideo[id];
          if (videoData && videoData.videoId) {
            this.playVideo(videoData.videoId);
            this.index = id;
            this.updateUI(this.index);
          }
          const footerPlayerVideoFooter = $("#footer .player-video-wrapper");
          const footerExpandPlayerVideo = $("#footer .expand-video-player");

          footerPlayerVideoFooter.classList.remove("hidden");
          footerExpandPlayerVideo.classList.remove("hidden");
        };
      });
    }
  }

  nextVideo(prefix) {
    this.$(`${prefix} .btn-next`).onclick = (e) => {
      if (this.isRandom) {
        this.index = Math.floor(Math.random() * this.dataVideo.length);
      }
      if (this.isRepeat) {
        this.index = this.index;
      }
      if (!this.isRandom && !this.isRepeat) {
        this.index === this.dataVideo.length - 1
          ? (this.index = 0)
          : ++this.index;
      }
      const videoId = this.dataVideo[this.index].videoId;
      this.updateUI(this.index);
      this.playVideo(videoId);
    };
  }

  prevVideo(prefix) {
    this.$(`${prefix} .btn-prev`).onclick = (e) => {
      if (this.isRandom) {
        this.index = Math.floor(Math.random() * this.dataVideo.length);
      }
      if (this.isRepeat) {
        this.index = this.index;
      }
      if (!this.isRandom && !this.isRepeat) {
        this.index === 0
          ? (this.index = this.dataVideo.length - 1)
          : --this.index;
      }
      const videoId = this.dataVideo[this.index].videoId;
      this.updateUI(this.index);
      this.playVideo(videoId);
    };
  }

  handlePlayPauseVideo(prefix) {
    const btnPlay = this.$(`${prefix} .btn-play`);
    const btnPause = this.$(`${prefix} .btn-pause`);
    btnPlay.onclick = (e) => {
      this.player.playVideo();
    };
    btnPause.onclick = (e) => {
      this.player.pauseVideo();
    };
  }

  scrollToItem(el, { behavior = "smooth", block = "center" } = {}) {
    if (!el) return;
    el.scrollIntoView({ behavior, block, inline: "nearest" });
    // requestAnimationFrame(() => {
    // });
  }

  updateUI(videoId) {
    const video = this.dataVideo[videoId];
    if(!video) return;
    
    const playerVideoThumb = this.$(".player-video-wrapper .thumb");
    const playerVideoTitle = this.$(".player-video-wrapper .title");
    playerVideoThumb.src = `${escapeHTML(video.thumbnails[0])}`;
    playerVideoTitle.innerHTML = `${escapeHTML(video.title)}`;

    const expandTittle = this.$(".expand-video-player .title");
    expandTittle.classList.add("text-xl", "font-semibold", "text-teal-400");
    expandTittle.innerHTML = `${escapeHTML(video.title)}`;

    const mainVideoItem = Array.from(
      document.querySelectorAll("#main .video-detail-item")
    ).find((item) => +item.dataset.id === this.index);
    const expandVideoItem = Array.from(
      document.querySelectorAll(".expand-video-player .video-detail-item")
    ).find((item) => +item.dataset.id === this.index);

    document.querySelectorAll("#main .video-detail-item").forEach(item => item.classList.remove('active'));
    document.querySelectorAll(".expand-video-player .video-detail-item").forEach(item => item.classList.remove('active'));
    mainVideoItem?.classList.add("active");
    expandVideoItem?.classList.add("active");

    this.scrollToItem(mainVideoItem, { block: "center" });
    this.scrollToItem(expandVideoItem, { block: "center" });
  }

  handleEndSong() {
    if (this.isRandom) {
      this.index = Math.floor(Math.random() * this.dataVideo.length);
    }
    if (this.isRepeat) {
      this.index = this.index;
    }
    if (!this.isRandom && !this.isRepeat) {
      this.index === this.dataVideo.length - 1
        ? (this.index = 0)
        : ++this.index;
    }
    const videoId = this.dataVideo[this.index].videoId;
    this.updateUI(this.index);
    this.playVideo(videoId);
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        this.startTimeUpdate();
        break;
      case YT.PlayerState.PAUSED:
        this.stopTimeUpdate();
        break;
      case YT.PlayerState.ENDED:
        this.stopTimeUpdate();
        this.handleEndSong();
        break;
      case YT.PlayerState.BUFFERING:
        this.stopTimeUpdate();
        break;
    }
  }

  startTimeUpdate() {
    //Hiển thị nút pause, ẩn nút play
    const btnPlayPlayer = this.$(`.player-video-wrapper .btn-play`);
    const btnPausePlayer = this.$(`.player-video-wrapper .btn-pause`);
    const btnPlayExpand = this.$(`.expand-video-infor .btn-play`);
    const btnPauseExpand = this.$(`.expand-video-infor .btn-pause`);
    btnPausePlayer.classList.remove("hidden");
    btnPlayPlayer.classList.add("hidden");
    btnPauseExpand.classList.remove("hidden");
    btnPlayExpand.classList.add("hidden");

    const update = () => {
      if (this.player && this.player.getCurrentTime) {
        const currentTime = this.player.getCurrentTime();
        const duration = this.player.getDuration();
        this.renderTimeupdate(currentTime, duration);
        this.animationFrameId = requestAnimationFrame(update);
      }
    };
    this.animationFrameId = requestAnimationFrame(update);
  }

  renderTimeupdate(currentTime, duration) {
    const currenTimePlayer = $(".player-video-wrapper .current");
    const durationPlayer = $(".player-video-wrapper .duration");
    const currenTimeExpand = $(".expand-video-infor .current");
    const durationExpand = $(".expand-video-infor .duration");

    //Hiển thị thời gian
    currenTimePlayer.innerHTML = `${escapeHTML(
      calcVideoTime(currentTime) || "00:00:00"
    )}`;
    durationPlayer.innerHTML = `${escapeHTML(
      calcVideoTime(duration) || "00:00:00"
    )}`;
    currenTimeExpand.innerHTML = `${escapeHTML(
      calcVideoTime(currentTime) || "00:00:00"
    )}`;
    durationExpand.innerHTML = `${escapeHTML(
      calcVideoTime(duration) || "00:00:00"
    )}`;

    if (this.isSeeking) return;
    //Kéo thanh input
    const progressPlayer = this.$(
      ".player-video-wrapper .footer-video-bar.progress"
    );
    const progressExpand = this.$(".expand-video-infor .progress");
    if (!Number.isFinite(duration)) {
      progressPlayer.value = 0;
      progressExpand.value = 0;
    } else {
      progressPlayer.value = (currentTime / duration) * 100;
      progressExpand.value = (currentTime / duration) * 100;
    }
  }

  handleDragProgress(prefix) {
    const progress = this.$(`${prefix} .progress`);

    const beginSeek = () => (this.isSeeking = true);
    progress.addEventListener("mousedown", beginSeek);
    progress.addEventListener("touchstart", beginSeek);
    const endSeek = () => (this.isSeeking = false);
    progress.addEventListener("mouseup", endSeek);
    progress.addEventListener("touchend", endSeek);

    progress.oninput = (e) => {
      const time = (progress.value / 100) * this.player.getDuration();
      this.player.seekTo(time, true);
    };
  }

  stopTimeUpdate() {
    //Hiển thị play, ẩn pause
    const btnPlayPlayer = this.$(`.player-video-wrapper .btn-play`);
    const btnPausePlayer = this.$(`.player-video-wrapper .btn-pause`);
    const btnPlayExpand = this.$(`.expand-video-infor .btn-play`);
    const btnPauseExpand = this.$(`.expand-video-infor .btn-pause`);
    btnPausePlayer.classList.add("hidden");
    btnPlayPlayer.classList.remove("hidden");
    btnPauseExpand.classList.add("hidden");
    btnPlayExpand.classList.remove("hidden");

    //Hủy req animation cũ khi video dừng, kết thúc hoặc tạm dừng vì load chậm tránh memory leak
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  handleRandom() {
    if (this.debounceRandom) return;
    this.debounceRandom = true;
    const btnRandomPlayer = this.$(`.player-video-wrapper .btn-random`);
    const btnRandomExpand = this.$(`.expand-video-infor .btn-random`);
    const btnRepeatPlayer = this.$(`.player-video-wrapper .btn-repeat`);
    const btnRepeatExpand = this.$(`.expand-video-infor .btn-repeat`);
    btnRandomPlayer.onclick = (e) => {
      this.isRandom = !this.isRandom;
      if (this.isRandom) {
        btnRandomPlayer.classList.add("text-blue-500");
        btnRandomExpand.classList.add("text-blue-500");
        btnRepeatPlayer.classList.remove("text-blue-500");
        btnRepeatExpand.classList.remove("text-blue-500");
        this.isRepeat = false;
      } else {
        btnRandomPlayer.classList.remove("text-blue-500");
        btnRandomExpand.classList.remove("text-blue-500");
      }
    };
    btnRandomExpand.onclick = (e) => {
      this.isRandom = !this.isRandom;
      if (this.isRandom) {
        btnRandomExpand.classList.add("text-blue-500");
        btnRandomPlayer.classList.add("text-blue-500");
        btnRepeatPlayer.classList.remove("text-blue-500");
        btnRepeatExpand.classList.remove("text-blue-500");
        this.isRepeat = false;
      } else {
        btnRandomExpand.classList.remove("text-blue-500");
        btnRandomPlayer.classList.remove("text-blue-500");
      }
    };
  }

  handleRepeat() {
    if (this.debounceRepeat) return;
    this.debounceRepeat = true;
    const btnRepeatPlayer = this.$(`.player-video-wrapper .btn-repeat`);
    const btnRepeatExpand = this.$(`.expand-video-infor .btn-repeat`);
    const btnRandomPlayer = this.$(`.player-video-wrapper .btn-random`);
    const btnRandomExpand = this.$(`.expand-video-infor .btn-random`);
    btnRepeatPlayer.onclick = (e) => {
      this.isRepeat = !this.isRepeat;
      if (this.isRepeat) {
        btnRepeatPlayer.classList.add("text-blue-500");
        btnRepeatExpand.classList.add("text-blue-500");
        btnRandomPlayer.classList.remove("text-blue-500");
        btnRandomExpand.classList.remove("text-blue-500");
        this.isRandom = false;
      } else {
        btnRepeatPlayer.classList.remove("text-blue-500");
        btnRepeatExpand.classList.remove("text-blue-500");
      }
    };
    btnRepeatExpand.onclick = (e) => {
      this.isRepeat = !this.isRepeat;
      if (this.isRepeat) {
        btnRepeatExpand.classList.add("text-blue-500");
        btnRepeatPlayer.classList.add("text-blue-500");
        btnRandomPlayer.classList.remove("text-blue-500");
        btnRandomExpand.classList.remove("text-blue-500");
        this.isRandom = false;
      } else {
        btnRepeatExpand.classList.remove("text-blue-500");
        btnRepeatPlayer.classList.remove("text-blue-500");
      }
    };
  }

  handleVolume(prefix) {
    const volumeBtn = this.$(`${prefix} .video-volume`);
    const volumeHighBtn = this.$(`${prefix} .volume-high`);
    const volumeLowBtn = this.$(`${prefix} .volume-low`);
    const volumeMuteBtn = this.$(`${prefix} .volume-mute`);
    const volumeProgress = this.$(`${prefix} .progress-volume`);

    volumeProgress.addEventListener("input", (e) => {
      const otherVolumeProgress =
        prefix === ".player-video-wrapper"
          ? this.$(`.expand-video-infor .progress-volume`)
          : this.$(`.player-video-wrapper .progress-volume`);
      const otherVolumeBtn =
        prefix === ".player-video-wrapper"
          ? this.$(`.expand-video-infor .video-volume`)
          : this.$(`.player-video-wrapper .video-volume`);
      const otherVolumeHighBtn =
        prefix === ".player-video-wrapper"
          ? this.$(`.expand-video-infor .volume-high`)
          : this.$(`.player-video-wrapper .volume-high`);
      const otherVolumeLowBtn =
        prefix === ".player-video-wrapper"
          ? this.$(`.expand-video-infor .volume-low`)
          : this.$(`.player-video-wrapper .volume-low`);
      const otherVolumeMuteBtn =
        prefix === ".player-video-wrapper"
          ? this.$(`.expand-video-infor .volume-mute`)
          : this.$(`.player-video-wrapper .volume-mute`);

      const volumeValue = +volumeProgress.value;
      this.player.setVolume(volumeValue);
      otherVolumeProgress.value = this.player.getVolume();

      if (volumeValue > 50) {
        volumeHighBtn.classList.remove("hidden");
        otherVolumeHighBtn.classList.remove("hidden");
        volumeLowBtn.classList.add("hidden");
        otherVolumeLowBtn.classList.add("hidden");
        volumeMuteBtn.classList.add("hidden");
        otherVolumeMuteBtn.classList.add("hidden");
      }
      if (volumeValue <= 50 && volumeValue > 0) {
        volumeHighBtn.classList.add("hidden");
        otherVolumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.remove("hidden");
        otherVolumeLowBtn.classList.remove("hidden");
        volumeMuteBtn.classList.add("hidden");
        otherVolumeMuteBtn.classList.add("hidden");
      }
      if (volumeValue === 0) {
        volumeHighBtn.classList.add("hidden");
        otherVolumeHighBtn.classList.add("hidden");
        volumeLowBtn.classList.add("hidden");
        otherVolumeLowBtn.classList.add("hidden");
        volumeMuteBtn.classList.remove("hidden");
        otherVolumeMuteBtn.classList.remove("hidden");
      }
    });
  }

  closePlayer() {
    const footerPlayerVideoFooter = $("#footer .player-video-wrapper");
    const footerExpandPlayerVideo = $("#footer .expand-video-player");
    footerExpandPlayerVideo.classList.add("hidden");
    footerPlayerVideoFooter.classList.add("hidden");
    sessionStorage.removeItem("data_video");
    this.player.pauseVideo();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  start(prefix, prefixItem) {
    this.addVideo(prefixItem);
    this.nextVideo(prefix);
    this.prevVideo(prefix);
    this.handlePlayPauseVideo(prefix);
    this.handleRandom();
    this.handleRepeat();
    this.handleDragProgress(prefix);
    this.handleVolume(prefix);
    this.updateUI(prefix);
  }
}

export const zoomOutExpandVideo = () => {
  const expandVideoInfoAndDetail = $(".expand-video-info-detail");
  const iframe = $("iframe");
  const controlExpandVideoWrapper = $(".expand-control-video-wrapper");
  const expandVideoDetail = $(".expand-video-detail");
  const expandVideoInfor = $(".expand-video-infor");
  const footerExpandPlayerVideo = $("#footer .expand-video-player");
  const closeExpandPlayerBtn = $(".expand-video-player .close-icon");

  controlExpandVideoWrapper.classList.add("hidden");
  expandVideoDetail.classList.add("hidden");

  footerExpandPlayerVideo.classList.remove("pt-18");
  expandVideoInfoAndDetail.classList.remove("px-5");
  iframe.classList.replace("h-2/3", "h-full");
  footerExpandPlayerVideo.classList.add("mini");
  expandVideoInfor.classList.replace("md:h-[600px]", "h-full");
  closeExpandPlayerBtn.classList.add("hidden");
};

export const zoomInExpandVideo = () => {
  const expandVideoInfoAndDetail = $(".expand-video-info-detail");
  const iframe = $("iframe");
  const controlExpandVideoWrapper = $(".expand-control-video-wrapper");
  const expandVideoDetail = $(".expand-video-detail");
  const expandVideoInfor = $(".expand-video-infor");
  const footerExpandPlayerVideo = $("#footer .expand-video-player");
  const closeExpandPlayerBtn = $(".expand-video-player .close-icon");

  controlExpandVideoWrapper.classList.remove("hidden");
  expandVideoDetail.classList.remove("hidden");

  footerExpandPlayerVideo.classList.add("pt-18");
  expandVideoInfoAndDetail.classList.add("px-5");
  iframe.classList.replace("h-full", "h-2/3");
  footerExpandPlayerVideo.classList.remove("mini");
  expandVideoInfor.classList.replace("h-full", "md:h-[600px]");
  closeExpandPlayerBtn.classList.remove("hidden");
};
