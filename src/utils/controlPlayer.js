import toggleLoading from "./toggleLodaing";

export default class ControlPlayer {
  constructor({ audio, dataSongs }) {
    this.audio = audio;
    this.dataSongs = dataSongs;
    this.index = 0;
    this._isPlay = null;
  }

  attach(prefix, prefixItemSong) {
    const $ = document.querySelector.bind(document);
    const btnBack = $(`${prefix} .btn-prev`);
    const btnNext = $(`${prefix} .btn-next`);
    const btnPlay = $(`${prefix} .btn-play`);
    const btnPause = $(`${prefix} .btn-pause`);
    const currTime = $(`${prefix} .current`);
    const durationTime = $(`${prefix} .duration`);
    const thumb = $(`${prefix} .thumb`);
    const title = $(`${prefix} .title`);
    const artist = $(`${prefix} .artist`);

    const progressVolume = $(`${prefix} .progress-volume`);
    const volumeBtn = $(`${prefix} .song-volume`);
    const btnRepeat = $(`${prefix} .btn-repeat`);
    const btnRandom = $(`${prefix} .btn-random`);

    this.addSong(prefixItemSong);
  }

  addSong(prefixItemSong = "#main") {
    document.addEventListener("click", (e) => {
      if (e.target.closest(`${prefixItemSong} .song-detail-item`)) {
        const idSong = +e.target.closest(`${prefixItemSong} .song-detail-item`)
          .dataset.id;
        const srcSong = this.dataSongs[idSong].audioUrl;
        if (!srcSong) return;
        this.audio.pause();
        this.audio.src = srcSong;
        this.audio.load();
        this.audio.play().catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
      }
    });
  }
}
