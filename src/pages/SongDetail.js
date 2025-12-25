import Navigo from "navigo";
import "../assets/lyric.css";
import { router } from "../route/router";
import escapeHTML from "../utils/escapeHTML";
import toggleLoading from "../utils/toggleLodaing";
import handleBeforeRender from "../utils/handleBeforeRender";
import showToast from "../utils/showToast";
import controlSlide from "../utils/controlSlide";
import { getSongDetail } from "../service/playlistApi";
import { SongInforDetail, LineSong } from "../components/listDetail/ListDetail";
import ExpandPlayer from "../components/expandPlayer/ExpandPlayer";


export default function SongDetail() {
  return `
    <div class="p-2">
      <div class="wrapper lg:px-2">
        <div class="row flex flex-col flex-wrap justify-between lg:flex-row items-center lg:items-start">
          <div class="song-infor static lg:sticky lg:top-24 text-white flex flex-col md:basis-1/4 lg:basis-1/2 gap-5 items-center w-[400px] shrink-0 grow-0">
          </div>

          <div class="song-detail w-full lg:basis-1/2">
          </div>
        </div>
      </div>
    </div>
  `;
}

const $ = document.querySelector.bind(document);

const render = async (slug) => {
  const songInfor = $(".song-infor ");
  const songDetail = $(".song-detail");

  //Lấy dữ liệu
  const songDetailData = await getSongDetail(slug);
  
  let data;
  if(!songDetailData.album?.tracks.length && !songDetailData.playlists?.length) {
    data = songDetailData.related;
  }

  if(!data && !songDetailData.playlists?.length) {
    data = songDetailData.album.tracks;
  }

  if(songDetailData.playlists?.length) {
    data = songDetailData.playlists[0].tracks;
  }

  songInfor.innerHTML = `${SongInforDetail(
    data[0] || data.tracks[0]
  )}`;
  songDetail.innerHTML = `${LineSong(data)}`;
  await handleEvent(data);
  router.updatePageLinks();
};

const handleEvent = async (dataSongs) => {
  //Lấy ra dữ liệu của dataSongs
  const lengthSongs = dataSongs.length;
  dataSongs.forEach((data, index) => {data._id = index});
  dataSongs.push({
    type: "song",
    id: "691cb4ffdd97648f597579c2",
    title: "Như một người dưng",
    audioUrl: "/Như Một Người Dưng (Remix).mp3",
    audioType: "audio/mpeg",
    thumbnails: [
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/9/d/7/4/9d7421f9053acfdb26fc9b1a100b9724.jpg"
    ],
    duration: 227,
    _id: lengthSongs 
})
  sessionStorage.setItem("data_song", JSON.stringify(dataSongs));
};

const handleLyric = () => {
  const songStatic = $(".song-detail-item.song-static");
  const lyricsData = [
  {
    words: [
      {
        startTime: 5730,
        endTime: 6130,
        data: "Từng",
      },
      {
        startTime: 6130,
        endTime: 6130,
        data: "ngày",
      },
      {
        startTime: 6130,
        endTime: 6530,
        data: "em",
      },
      {
        startTime: 6530,
        endTime: 6920,
        data: "vẫn",
      },
      {
        startTime: 6920,
        endTime: 6920,
        data: "bên",
      },
      {
        startTime: 6920,
        endTime: 7340,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 7340,
        endTime: 7740,
        data: "Thế",
      },
      {
        startTime: 7740,
        endTime: 8140,
        data: "nhưng",
      },
      {
        startTime: 8140,
        endTime: 8140,
        data: "anh",
      },
      {
        startTime: 8140,
        endTime: 8530,
        data: "vương",
      },
      {
        startTime: 8530,
        endTime: 8930,
        data: "vấn",
      },
      {
        startTime: 8930,
        endTime: 8930,
        data: "điều",
      },
      {
        startTime: 8930,
        endTime: 9320,
        data: "gì",
      },
    ],
  },
  {
    words: [
      {
        startTime: 9320,
        endTime: 9720,
        data: "Tình",
      },
      {
        startTime: 9720,
        endTime: 10120,
        data: "yêu",
      },
      {
        startTime: 10120,
        endTime: 10120,
        data: "bấy",
      },
      {
        startTime: 10120,
        endTime: 10510,
        data: "lâu",
      },
      {
        startTime: 10510,
        endTime: 10930,
        data: "nay",
      },
    ],
  },
  {
    words: [
      {
        startTime: 10930,
        endTime: 10930,
        data: "Có",
      },
      {
        startTime: 10930,
        endTime: 11350,
        data: "khiến",
      },
      {
        startTime: 11350,
        endTime: 11350,
        data: "anh",
      },
      {
        startTime: 11350,
        endTime: 11740,
        data: "thôi",
      },
      {
        startTime: 11740,
        endTime: 11740,
        data: "ngừng",
      },
      {
        startTime: 11740,
        endTime: 12130,
        data: "nghĩ",
      },
      {
        startTime: 12130,
        endTime: 12940,
        data: "suy",
      },
    ],
  },
  {
    words: [
      {
        startTime: 12940,
        endTime: 13330,
        data: "Mỗi",
      },
      {
        startTime: 13330,
        endTime: 13730,
        data: "đêm",
      },
      {
        startTime: 13730,
        endTime: 13730,
        data: "mình",
      },
      {
        startTime: 13730,
        endTime: 14130,
        data: "em",
      },
      {
        startTime: 14130,
        endTime: 14130,
        data: "u",
      },
      {
        startTime: 14130,
        endTime: 14520,
        data: "hoài",
      },
    ],
  },
  {
    words: [
      {
        startTime: 14520,
        endTime: 14920,
        data: "Nên",
      },
      {
        startTime: 14920,
        endTime: 15320,
        data: "dừng",
      },
      {
        startTime: 15320,
        endTime: 15320,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 15320,
        endTime: 15720,
        data: "Hay",
      },
      {
        startTime: 15720,
        endTime: 16130,
        data: "yêu",
      },
      {
        startTime: 16130,
        endTime: 16130,
        data: "chẳng",
      },
      {
        startTime: 16130,
        endTime: 16510,
        data: "ngần",
      },
      {
        startTime: 16510,
        endTime: 17310,
        data: "ngại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 17310,
        endTime: 17310,
        data: "Và",
      },
      {
        startTime: 17310,
        endTime: 17710,
        data: "em",
      },
      {
        startTime: 17710,
        endTime: 18100,
        data: "cũng",
      },
      {
        startTime: 18100,
        endTime: 18100,
        data: "biết",
      },
      {
        startTime: 18100,
        endTime: 18500,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 18500,
        endTime: 18910,
        data: "Khi",
      },
      {
        startTime: 18910,
        endTime: 18910,
        data: "anh",
      },
      {
        startTime: 18910,
        endTime: 19310,
        data: "nhạt",
      },
      {
        startTime: 19310,
        endTime: 19710,
        data: "phai",
      },
    ],
  },
  {
    words: [
      {
        startTime: 19710,
        endTime: 20110,
        data: "Chờ",
      },
      {
        startTime: 20110,
        endTime: 20490,
        data: "bao",
      },
      {
        startTime: 20490,
        endTime: 20900,
        data: "tháng",
      },
      {
        startTime: 20900,
        endTime: 21290,
        data: "năm",
      },
      {
        startTime: 21290,
        endTime: 21290,
        data: "qua",
      },
    ],
  },
  {
    words: [
      {
        startTime: 21290,
        endTime: 21690,
        data: "Vẫn",
      },
      {
        startTime: 21690,
        endTime: 22110,
        data: "mong",
      },
      {
        startTime: 22110,
        endTime: 22510,
        data: "bao",
      },
      {
        startTime: 22510,
        endTime: 22510,
        data: "yêu",
      },
      {
        startTime: 22510,
        endTime: 22890,
        data: "dấu",
      },
      {
        startTime: 22890,
        endTime: 22890,
        data: "quay",
      },
      {
        startTime: 22890,
        endTime: 23310,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 23310,
        endTime: 23720,
        data: "Đành",
      },
      {
        startTime: 23720,
        endTime: 24110,
        data: "buông",
      },
      {
        startTime: 24110,
        endTime: 24110,
        data: "cánh",
      },
      {
        startTime: 24110,
        endTime: 24500,
        data: "tay",
      },
      {
        startTime: 24500,
        endTime: 24910,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 24910,
        endTime: 25310,
        data: "Khi",
      },
      {
        startTime: 25310,
        endTime: 25310,
        data: "trái",
      },
      {
        startTime: 25310,
        endTime: 25700,
        data: "tim",
      },
      {
        startTime: 25700,
        endTime: 26100,
        data: "anh",
      },
      {
        startTime: 26100,
        endTime: 26100,
        data: "chẳng",
      },
      {
        startTime: 26100,
        endTime: 26490,
        data: "có",
      },
      {
        startTime: 26490,
        endTime: 27310,
        data: "em",
      },
    ],
  },
  {
    words: [
      {
        startTime: 27310,
        endTime: 27310,
        data: "Biết",
      },
      {
        startTime: 27310,
        endTime: 27690,
        data: "đâu",
      },
      {
        startTime: 27690,
        endTime: 28100,
        data: "anh",
      },
      {
        startTime: 28100,
        endTime: 28100,
        data: "cũng",
      },
      {
        startTime: 28100,
        endTime: 28490,
        data: "chấp",
      },
      {
        startTime: 28490,
        endTime: 28890,
        data: "nhận",
      },
    ],
  },
  {
    words: [
      {
        startTime: 28890,
        endTime: 29290,
        data: "Không",
      },
      {
        startTime: 29290,
        endTime: 29290,
        data: "ân",
      },
      {
        startTime: 29290,
        endTime: 29690,
        data: "hận",
      },
      {
        startTime: 29690,
        endTime: 30080,
        data: "một",
      },
      {
        startTime: 30080,
        endTime: 30080,
        data: "lần",
      },
      {
        startTime: 30080,
        endTime: 30500,
        data: "khóc",
      },
      {
        startTime: 30500,
        endTime: 30500,
        data: "cho",
      },
      {
        startTime: 30500,
        endTime: 31290,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 31290,
        endTime: 31680,
        data: "Và",
      },
      {
        startTime: 31680,
        endTime: 32080,
        data: "quên",
      },
      {
        startTime: 32080,
        endTime: 32080,
        data: "đi",
      },
      {
        startTime: 32080,
        endTime: 32480,
        data: "tháng",
      },
      {
        startTime: 32480,
        endTime: 32870,
        data: "năm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 32870,
        endTime: 32870,
        data: "Ta",
      },
      {
        startTime: 32870,
        endTime: 33270,
        data: "từng",
      },
      {
        startTime: 33270,
        endTime: 33670,
        data: "đậm",
      },
      {
        startTime: 33670,
        endTime: 35350,
        data: "sâu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 35350,
        endTime: 35350,
        data: "Có",
      },
      {
        startTime: 35350,
        endTime: 35750,
        data: "lẽ",
      },
      {
        startTime: 35750,
        endTime: 36150,
        data: "xa",
      },
      {
        startTime: 36150,
        endTime: 36150,
        data: "một",
      },
      {
        startTime: 36150,
        endTime: 36550,
        data: "người",
      },
    ],
  },
  {
    words: [
      {
        startTime: 36550,
        endTime: 36950,
        data: "Trong",
      },
      {
        startTime: 36950,
        endTime: 37370,
        data: "lòng",
      },
      {
        startTime: 37370,
        endTime: 37370,
        data: "còn",
      },
      {
        startTime: 37370,
        endTime: 38560,
        data: "thương",
      },
    ],
  },
  {
    words: [
      {
        startTime: 38560,
        endTime: 38950,
        data: "Chẳng",
      },
      {
        startTime: 38950,
        endTime: 39350,
        data: "khác",
      },
      {
        startTime: 39350,
        endTime: 39350,
        data: "như",
      },
      {
        startTime: 39350,
        endTime: 39750,
        data: "cuộc",
      },
      {
        startTime: 39750,
        endTime: 40170,
        data: "đời",
      },
    ],
  },
  {
    words: [
      {
        startTime: 40170,
        endTime: 40550,
        data: "Mọi",
      },
      {
        startTime: 40550,
        endTime: 40960,
        data: "điều",
      },
      {
        startTime: 40960,
        endTime: 40960,
        data: "vô",
      },
      {
        startTime: 40960,
        endTime: 42140,
        data: "hướng",
      },
    ],
  },
  {
    words: [
      {
        startTime: 42140,
        endTime: 42540,
        data: "Đứng",
      },
      {
        startTime: 42540,
        endTime: 42540,
        data: "giữa",
      },
      {
        startTime: 42540,
        endTime: 42940,
        data: "yêu",
      },
      {
        startTime: 42940,
        endTime: 43330,
        data: "và",
      },
      {
        startTime: 43330,
        endTime: 43330,
        data: "dừng",
      },
      {
        startTime: 43330,
        endTime: 43730,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 43730,
        endTime: 44130,
        data: "Em",
      },
      {
        startTime: 44130,
        endTime: 44540,
        data: "thật",
      },
      {
        startTime: 44540,
        endTime: 44540,
        data: "không",
      },
      {
        startTime: 44540,
        endTime: 45740,
        data: "biết",
      },
    ],
  },
  {
    words: [
      {
        startTime: 45740,
        endTime: 45740,
        data: "Phải",
      },
      {
        startTime: 45740,
        endTime: 46120,
        data: "làm",
      },
      {
        startTime: 46120,
        endTime: 46530,
        data: "sao",
      },
    ],
  },
  {
    words: [
      {
        startTime: 46530,
        endTime: 46530,
        data: "Để",
      },
      {
        startTime: 46530,
        endTime: 46920,
        data: "anh",
      },
      {
        startTime: 46920,
        endTime: 46920,
        data: "sẽ",
      },
      {
        startTime: 46920,
        endTime: 47320,
        data: "thấy",
      },
      {
        startTime: 47320,
        endTime: 47740,
        data: "được",
      },
      {
        startTime: 47740,
        endTime: 48920,
        data: "vui",
      },
    ],
  },
  {
    words: [
      {
        startTime: 48920,
        endTime: 49320,
        data: "Biết",
      },
      {
        startTime: 49320,
        endTime: 49320,
        data: "anh",
      },
      {
        startTime: 49320,
        endTime: 49710,
        data: "vẫn",
      },
      {
        startTime: 49710,
        endTime: 50110,
        data: "cứ",
      },
      {
        startTime: 50110,
        endTime: 50500,
        data: "vô",
      },
      {
        startTime: 50500,
        endTime: 50920,
        data: "tâm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 50920,
        endTime: 50920,
        data: "Nhưng",
      },
      {
        startTime: 50920,
        endTime: 51300,
        data: "sao",
      },
      {
        startTime: 51300,
        endTime: 51300,
        data: "lòng",
      },
      {
        startTime: 51300,
        endTime: 51700,
        data: "còn",
      },
      {
        startTime: 51700,
        endTime: 52500,
        data: "thương",
      },
    ],
  },
  {
    words: [
      {
        startTime: 52500,
        endTime: 52500,
        data: "Phải",
      },
      {
        startTime: 52500,
        endTime: 52900,
        data: "chăng",
      },
      {
        startTime: 52900,
        endTime: 52900,
        data: "là",
      },
      {
        startTime: 52900,
        endTime: 53300,
        data: "quá",
      },
      {
        startTime: 53300,
        endTime: 53690,
        data: "yêu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 53690,
        endTime: 54110,
        data: "Nên",
      },
      {
        startTime: 54110,
        endTime: 54500,
        data: "em",
      },
      {
        startTime: 54500,
        endTime: 54500,
        data: "ngại",
      },
      {
        startTime: 54500,
        endTime: 54900,
        data: "không",
      },
      {
        startTime: 54900,
        endTime: 55290,
        data: "dám",
      },
      {
        startTime: 55290,
        endTime: 55690,
        data: "nói",
      },
    ],
  },
  {
    words: [
      {
        startTime: 55690,
        endTime: 56080,
        data: "Có",
      },
      {
        startTime: 56080,
        endTime: 56480,
        data: "ai",
      },
      {
        startTime: 56480,
        endTime: 56480,
        data: "tự",
      },
      {
        startTime: 56480,
        endTime: 56900,
        data: "nhiên",
      },
      {
        startTime: 56900,
        endTime: 57290,
        data: "muốn",
      },
      {
        startTime: 57290,
        endTime: 57290,
        data: "xa",
      },
      {
        startTime: 57290,
        endTime: 57680,
        data: "nhau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 57680,
        endTime: 58090,
        data: "Và",
      },
      {
        startTime: 58090,
        endTime: 58090,
        data: "làm",
      },
      {
        startTime: 58090,
        endTime: 58480,
        data: "cho",
      },
      {
        startTime: 58480,
        endTime: 58880,
        data: "trái",
      },
      {
        startTime: 58880,
        endTime: 58880,
        data: "tim",
      },
      {
        startTime: 58880,
        endTime: 59280,
        data: "mình",
      },
      {
        startTime: 59280,
        endTime: 59280,
        data: "nhói",
      },
      {
        startTime: 59280,
        endTime: 60070,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 60070,
        endTime: 60070,
        data: "Nên",
      },
      {
        startTime: 60070,
        endTime: 60470,
        data: "cố",
      },
      {
        startTime: 60470,
        endTime: 60880,
        data: "níu",
      },
      {
        startTime: 60880,
        endTime: 60880,
        data: "xem",
      },
      {
        startTime: 60880,
        endTime: 61280,
        data: "ta",
      },
      {
        startTime: 61280,
        endTime: 61680,
        data: "sẽ",
      },
      {
        startTime: 61680,
        endTime: 61680,
        data: "đi",
      },
      {
        startTime: 61680,
        endTime: 62060,
        data: "về",
      },
      {
        startTime: 62060,
        endTime: 64440,
        data: "đâu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 64440,
        endTime: 64830,
        data: "Từng",
      },
      {
        startTime: 64830,
        endTime: 65230,
        data: "ngày",
      },
      {
        startTime: 65230,
        endTime: 65230,
        data: "em",
      },
      {
        startTime: 65230,
        endTime: 65620,
        data: "vẫn",
      },
      {
        startTime: 65620,
        endTime: 65620,
        data: "bên",
      },
      {
        startTime: 65620,
        endTime: 66040,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 66040,
        endTime: 66440,
        data: "Thế",
      },
      {
        startTime: 66440,
        endTime: 66830,
        data: "nhưng",
      },
      {
        startTime: 66830,
        endTime: 66830,
        data: "anh",
      },
      {
        startTime: 66830,
        endTime: 67230,
        data: "vương",
      },
      {
        startTime: 67230,
        endTime: 67230,
        data: "vấn",
      },
      {
        startTime: 67230,
        endTime: 67620,
        data: "điều",
      },
      {
        startTime: 67620,
        endTime: 68020,
        data: "gì",
      },
    ],
  },
  {
    words: [
      {
        startTime: 68020,
        endTime: 68410,
        data: "Tình",
      },
      {
        startTime: 68410,
        endTime: 68410,
        data: "yêu",
      },
      {
        startTime: 68410,
        endTime: 68810,
        data: "bấy",
      },
      {
        startTime: 68810,
        endTime: 68810,
        data: "lâu",
      },
      {
        startTime: 68810,
        endTime: 69220,
        data: "nay",
      },
    ],
  },
  {
    words: [
      {
        startTime: 69220,
        endTime: 69610,
        data: "Có",
      },
      {
        startTime: 69610,
        endTime: 70020,
        data: "khiến",
      },
      {
        startTime: 70020,
        endTime: 70020,
        data: "anh",
      },
      {
        startTime: 70020,
        endTime: 70420,
        data: "thôi",
      },
      {
        startTime: 70420,
        endTime: 70420,
        data: "ngừng",
      },
      {
        startTime: 70420,
        endTime: 70820,
        data: "nghĩ",
      },
      {
        startTime: 70820,
        endTime: 71600,
        data: "suy",
      },
    ],
  },
  {
    words: [
      {
        startTime: 71600,
        endTime: 71990,
        data: "Mỗi",
      },
      {
        startTime: 71990,
        endTime: 71990,
        data: "đêm",
      },
      {
        startTime: 71990,
        endTime: 72420,
        data: "mình",
      },
      {
        startTime: 72420,
        endTime: 72420,
        data: "em",
      },
      {
        startTime: 72420,
        endTime: 72810,
        data: "u",
      },
      {
        startTime: 72810,
        endTime: 73210,
        data: "hoài",
      },
    ],
  },
  {
    words: [
      {
        startTime: 73210,
        endTime: 73610,
        data: "Nên",
      },
      {
        startTime: 73610,
        endTime: 73610,
        data: "dừng",
      },
      {
        startTime: 73610,
        endTime: 73990,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 73990,
        endTime: 74400,
        data: "Hay",
      },
      {
        startTime: 74400,
        endTime: 74790,
        data: "yêu",
      },
      {
        startTime: 74790,
        endTime: 74790,
        data: "chẳng",
      },
      {
        startTime: 74790,
        endTime: 75190,
        data: "ngần",
      },
      {
        startTime: 75190,
        endTime: 75590,
        data: "ngại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 75590,
        endTime: 75980,
        data: "Và",
      },
      {
        startTime: 75980,
        endTime: 76400,
        data: "em",
      },
      {
        startTime: 76400,
        endTime: 76800,
        data: "cũng",
      },
      {
        startTime: 76800,
        endTime: 76800,
        data: "biết",
      },
      {
        startTime: 76800,
        endTime: 77190,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 77190,
        endTime: 77590,
        data: "Khi",
      },
      {
        startTime: 77590,
        endTime: 77590,
        data: "anh",
      },
      {
        startTime: 77590,
        endTime: 77990,
        data: "nhạt",
      },
      {
        startTime: 77990,
        endTime: 78390,
        data: "phai",
      },
    ],
  },
  {
    words: [
      {
        startTime: 78390,
        endTime: 78780,
        data: "Chờ",
      },
      {
        startTime: 78780,
        endTime: 79180,
        data: "bao",
      },
      {
        startTime: 79180,
        endTime: 79180,
        data: "tháng",
      },
      {
        startTime: 79180,
        endTime: 79560,
        data: "năm",
      },
      {
        startTime: 79560,
        endTime: 79970,
        data: "qua",
      },
    ],
  },
  {
    words: [
      {
        startTime: 79970,
        endTime: 80370,
        data: "Vẫn",
      },
      {
        startTime: 80370,
        endTime: 80760,
        data: "mong",
      },
      {
        startTime: 80760,
        endTime: 80760,
        data: "bao",
      },
      {
        startTime: 80760,
        endTime: 81180,
        data: "yêu",
      },
      {
        startTime: 81180,
        endTime: 81580,
        data: "dấu",
      },
      {
        startTime: 81580,
        endTime: 81580,
        data: "quay",
      },
      {
        startTime: 81580,
        endTime: 81970,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 81970,
        endTime: 82370,
        data: "Đành",
      },
      {
        startTime: 82370,
        endTime: 82760,
        data: "buông",
      },
      {
        startTime: 82760,
        endTime: 82760,
        data: "cánh",
      },
      {
        startTime: 82760,
        endTime: 83160,
        data: "tay",
      },
      {
        startTime: 83160,
        endTime: 83560,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 83560,
        endTime: 83950,
        data: "Khi",
      },
      {
        startTime: 83950,
        endTime: 83950,
        data: "trái",
      },
      {
        startTime: 83950,
        endTime: 84350,
        data: "tim",
      },
      {
        startTime: 84350,
        endTime: 84350,
        data: "anh",
      },
      {
        startTime: 84350,
        endTime: 84750,
        data: "chẳng",
      },
      {
        startTime: 84750,
        endTime: 85170,
        data: "có",
      },
      {
        startTime: 85170,
        endTime: 85960,
        data: "em",
      },
    ],
  },
  {
    words: [
      {
        startTime: 85960,
        endTime: 85960,
        data: "Biết",
      },
      {
        startTime: 85960,
        endTime: 86350,
        data: "đâu",
      },
      {
        startTime: 86350,
        endTime: 86750,
        data: "anh",
      },
      {
        startTime: 86750,
        endTime: 86750,
        data: "cũng",
      },
      {
        startTime: 86750,
        endTime: 87150,
        data: "chấp",
      },
      {
        startTime: 87150,
        endTime: 87540,
        data: "nhận",
      },
    ],
  },
  {
    words: [
      {
        startTime: 87540,
        endTime: 87940,
        data: "Không",
      },
      {
        startTime: 87940,
        endTime: 87940,
        data: "ân",
      },
      {
        startTime: 87940,
        endTime: 88330,
        data: "hận",
      },
      {
        startTime: 88330,
        endTime: 88750,
        data: "một",
      },
      {
        startTime: 88750,
        endTime: 89150,
        data: "lần",
      },
      {
        startTime: 89150,
        endTime: 89150,
        data: "khóc",
      },
      {
        startTime: 89150,
        endTime: 89540,
        data: "cho",
      },
      {
        startTime: 89540,
        endTime: 89940,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 89940,
        endTime: 90340,
        data: "Và",
      },
      {
        startTime: 90340,
        endTime: 90730,
        data: "quên",
      },
      {
        startTime: 90730,
        endTime: 90730,
        data: "đi",
      },
      {
        startTime: 90730,
        endTime: 91130,
        data: "tháng",
      },
      {
        startTime: 91130,
        endTime: 91520,
        data: "năm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 91520,
        endTime: 91520,
        data: "Ta",
      },
      {
        startTime: 91520,
        endTime: 91920,
        data: "từng",
      },
      {
        startTime: 91920,
        endTime: 92340,
        data: "đậm",
      },
      {
        startTime: 92340,
        endTime: 93020,
        data: "sâu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 93020,
        endTime: 93420,
        data: "Từng",
      },
      {
        startTime: 93420,
        endTime: 93420,
        data: "ngày",
      },
      {
        startTime: 93420,
        endTime: 93820,
        data: "em",
      },
      {
        startTime: 93820,
        endTime: 93820,
        data: "vẫn",
      },
      {
        startTime: 93820,
        endTime: 94210,
        data: "bên",
      },
      {
        startTime: 94210,
        endTime: 97210,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 122090,
        endTime: 122090,
        data: "Biết",
      },
      {
        startTime: 122090,
        endTime: 122490,
        data: "anh",
      },
      {
        startTime: 122490,
        endTime: 122880,
        data: "vẫn",
      },
      {
        startTime: 122880,
        endTime: 123280,
        data: "cứ",
      },
      {
        startTime: 123280,
        endTime: 123700,
        data: "vô",
      },
      {
        startTime: 123700,
        endTime: 123700,
        data: "tâm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 123700,
        endTime: 124120,
        data: "Nhưng",
      },
      {
        startTime: 124120,
        endTime: 124120,
        data: "sao",
      },
      {
        startTime: 124120,
        endTime: 124520,
        data: "lòng",
      },
      {
        startTime: 124520,
        endTime: 124920,
        data: "còn",
      },
      {
        startTime: 124920,
        endTime: 125310,
        data: "thương",
      },
    ],
  },
  {
    words: [
      {
        startTime: 125310,
        endTime: 125310,
        data: "Phải",
      },
      {
        startTime: 125310,
        endTime: 125700,
        data: "chăng",
      },
      {
        startTime: 125700,
        endTime: 125700,
        data: "là",
      },
      {
        startTime: 125700,
        endTime: 126100,
        data: "quá",
      },
      {
        startTime: 126100,
        endTime: 126890,
        data: "yêu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 126890,
        endTime: 126890,
        data: "Nên",
      },
      {
        startTime: 126890,
        endTime: 127330,
        data: "em",
      },
      {
        startTime: 127330,
        endTime: 127730,
        data: "ngại",
      },
      {
        startTime: 127730,
        endTime: 127730,
        data: "không",
      },
      {
        startTime: 127730,
        endTime: 128120,
        data: "dám",
      },
      {
        startTime: 128120,
        endTime: 128520,
        data: "nói",
      },
    ],
  },
  {
    words: [
      {
        startTime: 128520,
        endTime: 128920,
        data: "Có",
      },
      {
        startTime: 128920,
        endTime: 129310,
        data: "ai",
      },
      {
        startTime: 129310,
        endTime: 129310,
        data: "tự",
      },
      {
        startTime: 129310,
        endTime: 129710,
        data: "nhiên",
      },
      {
        startTime: 129710,
        endTime: 129710,
        data: "muốn",
      },
      {
        startTime: 129710,
        endTime: 130100,
        data: "xa",
      },
      {
        startTime: 130100,
        endTime: 130500,
        data: "nhau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 130500,
        endTime: 130920,
        data: "Và",
      },
      {
        startTime: 130920,
        endTime: 130920,
        data: "làm",
      },
      {
        startTime: 130920,
        endTime: 131320,
        data: "cho",
      },
      {
        startTime: 131320,
        endTime: 131320,
        data: "trái",
      },
      {
        startTime: 131320,
        endTime: 131710,
        data: "tim",
      },
      {
        startTime: 131710,
        endTime: 132110,
        data: "mình",
      },
      {
        startTime: 132110,
        endTime: 132110,
        data: "nhói",
      },
      {
        startTime: 132110,
        endTime: 132490,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 132490,
        endTime: 132900,
        data: "Nên",
      },
      {
        startTime: 132900,
        endTime: 133290,
        data: "cố",
      },
      {
        startTime: 133290,
        endTime: 133290,
        data: "níu",
      },
      {
        startTime: 133290,
        endTime: 133690,
        data: "xem",
      },
    ],
  },
  {
    words: [
      {
        startTime: 133690,
        endTime: 134090,
        data: "Ta",
      },
      {
        startTime: 134090,
        endTime: 134090,
        data: "sẽ",
      },
      {
        startTime: 134090,
        endTime: 134490,
        data: "đi",
      },
      {
        startTime: 134490,
        endTime: 134900,
        data: "về",
      },
      {
        startTime: 134900,
        endTime: 137150,
        data: "đâu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 137150,
        endTime: 137550,
        data: "Từng",
      },
      {
        startTime: 137550,
        endTime: 137550,
        data: "ngày",
      },
      {
        startTime: 137550,
        endTime: 137940,
        data: "em",
      },
      {
        startTime: 137940,
        endTime: 138340,
        data: "vẫn",
      },
      {
        startTime: 138340,
        endTime: 138340,
        data: "bên",
      },
      {
        startTime: 138340,
        endTime: 138760,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 138760,
        endTime: 139180,
        data: "Thế",
      },
      {
        startTime: 139180,
        endTime: 139580,
        data: "nhưng",
      },
      {
        startTime: 139580,
        endTime: 139580,
        data: "anh",
      },
      {
        startTime: 139580,
        endTime: 139960,
        data: "vương",
      },
      {
        startTime: 139960,
        endTime: 139960,
        data: "vấn",
      },
      {
        startTime: 139960,
        endTime: 140360,
        data: "điều",
      },
      {
        startTime: 140360,
        endTime: 140760,
        data: "gì",
      },
    ],
  },
  {
    words: [
      {
        startTime: 140760,
        endTime: 141160,
        data: "Tình",
      },
      {
        startTime: 141160,
        endTime: 141160,
        data: "yêu",
      },
      {
        startTime: 141160,
        endTime: 141560,
        data: "bấy",
      },
      {
        startTime: 141560,
        endTime: 141950,
        data: "lâu",
      },
      {
        startTime: 141950,
        endTime: 142350,
        data: "nay",
      },
    ],
  },
  {
    words: [
      {
        startTime: 142350,
        endTime: 142350,
        data: "Có",
      },
      {
        startTime: 142350,
        endTime: 142770,
        data: "khiến",
      },
      {
        startTime: 142770,
        endTime: 142770,
        data: "anh",
      },
      {
        startTime: 142770,
        endTime: 143170,
        data: "thôi",
      },
      {
        startTime: 143170,
        endTime: 143580,
        data: "ngừng",
      },
      {
        startTime: 143580,
        endTime: 143980,
        data: "nghĩ",
      },
      {
        startTime: 143980,
        endTime: 144380,
        data: "suy",
      },
    ],
  },
  {
    words: [
      {
        startTime: 144380,
        endTime: 144770,
        data: "Mỗi",
      },
      {
        startTime: 144770,
        endTime: 144770,
        data: "đêm",
      },
      {
        startTime: 144770,
        endTime: 145160,
        data: "mình",
      },
      {
        startTime: 145160,
        endTime: 145570,
        data: "em",
      },
      {
        startTime: 145570,
        endTime: 145570,
        data: "u",
      },
      {
        startTime: 145570,
        endTime: 145960,
        data: "hoài",
      },
    ],
  },
  {
    words: [
      {
        startTime: 145960,
        endTime: 146370,
        data: "Nên",
      },
      {
        startTime: 146370,
        endTime: 146370,
        data: "dừng",
      },
      {
        startTime: 146370,
        endTime: 146760,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 146760,
        endTime: 147160,
        data: "Hay",
      },
      {
        startTime: 147160,
        endTime: 147560,
        data: "yêu",
      },
      {
        startTime: 147560,
        endTime: 147560,
        data: "chẳng",
      },
      {
        startTime: 147560,
        endTime: 147950,
        data: "ngần",
      },
      {
        startTime: 147950,
        endTime: 147950,
        data: "ngại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 147950,
        endTime: 148360,
        data: "Và",
      },
      {
        startTime: 148360,
        endTime: 148760,
        data: "em",
      },
      {
        startTime: 148760,
        endTime: 149160,
        data: "cũng",
      },
      {
        startTime: 149160,
        endTime: 149560,
        data: "biết",
      },
      {
        startTime: 149560,
        endTime: 149960,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 149960,
        endTime: 150350,
        data: "Khi",
      },
      {
        startTime: 150350,
        endTime: 150350,
        data: "anh",
      },
      {
        startTime: 150350,
        endTime: 150740,
        data: "nhạt",
      },
      {
        startTime: 150740,
        endTime: 151540,
        data: "phai",
      },
    ],
  },
  {
    words: [
      {
        startTime: 151540,
        endTime: 151540,
        data: "Chờ",
      },
      {
        startTime: 151540,
        endTime: 151940,
        data: "bao",
      },
      {
        startTime: 151940,
        endTime: 152330,
        data: "tháng",
      },
      {
        startTime: 152330,
        endTime: 152330,
        data: "năm",
      },
      {
        startTime: 152330,
        endTime: 152730,
        data: "qua",
      },
    ],
  },
  {
    words: [
      {
        startTime: 152730,
        endTime: 153150,
        data: "Vẫn",
      },
      {
        startTime: 153150,
        endTime: 153540,
        data: "mong",
      },
      {
        startTime: 153540,
        endTime: 153940,
        data: "bao",
      },
      {
        startTime: 153940,
        endTime: 154340,
        data: "yêu",
      },
      {
        startTime: 154340,
        endTime: 154340,
        data: "dấu",
      },
      {
        startTime: 154340,
        endTime: 154730,
        data: "quay",
      },
      {
        startTime: 154730,
        endTime: 155120,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 155120,
        endTime: 155120,
        data: "Đành",
      },
      {
        startTime: 155120,
        endTime: 155520,
        data: "buông",
      },
      {
        startTime: 155520,
        endTime: 155940,
        data: "cánh",
      },
      {
        startTime: 155940,
        endTime: 155940,
        data: "tay",
      },
      {
        startTime: 155940,
        endTime: 156360,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 156360,
        endTime: 156760,
        data: "Khi",
      },
      {
        startTime: 156760,
        endTime: 156760,
        data: "trái",
      },
      {
        startTime: 156760,
        endTime: 157140,
        data: "tim",
      },
      {
        startTime: 157140,
        endTime: 157550,
        data: "anh",
      },
      {
        startTime: 157550,
        endTime: 157550,
        data: "chẳng",
      },
      {
        startTime: 157550,
        endTime: 157950,
        data: "có",
      },
      {
        startTime: 157950,
        endTime: 158340,
        data: "em",
      },
    ],
  },
  {
    words: [
      {
        startTime: 158340,
        endTime: 158730,
        data: "Biết",
      },
      {
        startTime: 158730,
        endTime: 159140,
        data: "đâu",
      },
      {
        startTime: 159140,
        endTime: 159530,
        data: "anh",
      },
      {
        startTime: 159530,
        endTime: 159530,
        data: "cũng",
      },
      {
        startTime: 159530,
        endTime: 159930,
        data: "chấp",
      },
      {
        startTime: 159930,
        endTime: 160330,
        data: "nhận",
      },
    ],
  },
  {
    words: [
      {
        startTime: 160330,
        endTime: 160730,
        data: "Không",
      },
      {
        startTime: 160730,
        endTime: 160730,
        data: "ân",
      },
      {
        startTime: 160730,
        endTime: 161130,
        data: "hận",
      },
      {
        startTime: 161130,
        endTime: 161540,
        data: "một",
      },
      {
        startTime: 161540,
        endTime: 161540,
        data: "lần",
      },
      {
        startTime: 161540,
        endTime: 161930,
        data: "khóc",
      },
      {
        startTime: 161930,
        endTime: 162330,
        data: "cho",
      },
      {
        startTime: 162330,
        endTime: 163490,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 163490,
        endTime: 163490,
        data: "Và",
      },
      {
        startTime: 163490,
        endTime: 163880,
        data: "quên",
      },
      {
        startTime: 163880,
        endTime: 163880,
        data: "đi",
      },
      {
        startTime: 163880,
        endTime: 164290,
        data: "tháng",
      },
      {
        startTime: 164290,
        endTime: 164670,
        data: "năm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 164670,
        endTime: 164670,
        data: "Ta",
      },
      {
        startTime: 164670,
        endTime: 165090,
        data: "từng",
      },
      {
        startTime: 165090,
        endTime: 165090,
        data: "đậm",
      },
      {
        startTime: 165090,
        endTime: 168090,
        data: "sâu",
      },
    ],
  },
  {
    words: [
      {
        startTime: 169350,
        endTime: 169750,
        data: "Từng",
      },
      {
        startTime: 169750,
        endTime: 169750,
        data: "ngày",
      },
      {
        startTime: 169750,
        endTime: 170140,
        data: "anh",
      },
      {
        startTime: 170140,
        endTime: 170550,
        data: "vẫn",
      },
      {
        startTime: 170550,
        endTime: 170550,
        data: "bên",
      },
      {
        startTime: 170550,
        endTime: 170950,
        data: "em",
      },
    ],
  },
  {
    words: [
      {
        startTime: 170950,
        endTime: 171340,
        data: "Thế",
      },
      {
        startTime: 171340,
        endTime: 171340,
        data: "nhưng",
      },
      {
        startTime: 171340,
        endTime: 171740,
        data: "anh",
      },
      {
        startTime: 171740,
        endTime: 172140,
        data: "vương",
      },
      {
        startTime: 172140,
        endTime: 172140,
        data: "vấn",
      },
      {
        startTime: 172140,
        endTime: 172530,
        data: "điều",
      },
      {
        startTime: 172530,
        endTime: 172930,
        data: "gì",
      },
    ],
  },
  {
    words: [
      {
        startTime: 172930,
        endTime: 172930,
        data: "Tình",
      },
      {
        startTime: 172930,
        endTime: 173320,
        data: "yêu",
      },
      {
        startTime: 173320,
        endTime: 173320,
        data: "bấy",
      },
      {
        startTime: 173320,
        endTime: 173740,
        data: "lâu",
      },
      {
        startTime: 173740,
        endTime: 174120,
        data: "nay",
      },
    ],
  },
  {
    words: [
      {
        startTime: 174120,
        endTime: 174530,
        data: "Có",
      },
      {
        startTime: 174530,
        endTime: 174530,
        data: "khiến",
      },
      {
        startTime: 174530,
        endTime: 174920,
        data: "anh",
      },
      {
        startTime: 174920,
        endTime: 175330,
        data: "thôi",
      },
      {
        startTime: 175330,
        endTime: 175330,
        data: "ngừng",
      },
      {
        startTime: 175330,
        endTime: 175720,
        data: "nghĩ",
      },
      {
        startTime: 175720,
        endTime: 176510,
        data: "suy",
      },
    ],
  },
  {
    words: [
      {
        startTime: 176510,
        endTime: 176510,
        data: "Mỗi",
      },
      {
        startTime: 176510,
        endTime: 176930,
        data: "đêm",
      },
      {
        startTime: 176930,
        endTime: 177320,
        data: "mình",
      },
      {
        startTime: 177320,
        endTime: 177320,
        data: "em",
      },
      {
        startTime: 177320,
        endTime: 177710,
        data: "u",
      },
      {
        startTime: 177710,
        endTime: 178110,
        data: "hoài",
      },
    ],
  },
  {
    words: [
      {
        startTime: 178110,
        endTime: 178110,
        data: "Nên",
      },
      {
        startTime: 178110,
        endTime: 178500,
        data: "dừng",
      },
      {
        startTime: 178500,
        endTime: 178900,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 178900,
        endTime: 179320,
        data: "Hay",
      },
      {
        startTime: 179320,
        endTime: 179320,
        data: "yêu",
      },
      {
        startTime: 179320,
        endTime: 179710,
        data: "chẳng",
      },
      {
        startTime: 179710,
        endTime: 179710,
        data: "ngần",
      },
      {
        startTime: 179710,
        endTime: 180130,
        data: "ngại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 180130,
        endTime: 180520,
        data: "Và",
      },
      {
        startTime: 180520,
        endTime: 180930,
        data: "em",
      },
      {
        startTime: 180930,
        endTime: 181320,
        data: "cũng",
      },
      {
        startTime: 181320,
        endTime: 181710,
        data: "biết",
      },
      {
        startTime: 181710,
        endTime: 182110,
        data: "đau",
      },
    ],
  },
  {
    words: [
      {
        startTime: 182110,
        endTime: 182110,
        data: "Khi",
      },
      {
        startTime: 182110,
        endTime: 182530,
        data: "anh",
      },
      {
        startTime: 182530,
        endTime: 182530,
        data: "nhạt",
      },
      {
        startTime: 182530,
        endTime: 183320,
        data: "phai",
      },
    ],
  },
  {
    words: [
      {
        startTime: 183320,
        endTime: 183720,
        data: "Chờ",
      },
      {
        startTime: 183720,
        endTime: 183720,
        data: "bao",
      },
      {
        startTime: 183720,
        endTime: 184120,
        data: "tháng",
      },
      {
        startTime: 184120,
        endTime: 184510,
        data: "năm",
      },
      {
        startTime: 184510,
        endTime: 184900,
        data: "qua",
      },
    ],
  },
  {
    words: [
      {
        startTime: 184900,
        endTime: 185290,
        data: "Vẫn",
      },
      {
        startTime: 185290,
        endTime: 185290,
        data: "mong",
      },
      {
        startTime: 185290,
        endTime: 185720,
        data: "bao",
      },
      {
        startTime: 185720,
        endTime: 186130,
        data: "yêu",
      },
      {
        startTime: 186130,
        endTime: 186130,
        data: "dấu",
      },
      {
        startTime: 186130,
        endTime: 186520,
        data: "quay",
      },
      {
        startTime: 186520,
        endTime: 186920,
        data: "lại",
      },
    ],
  },
  {
    words: [
      {
        startTime: 186920,
        endTime: 187320,
        data: "Đành",
      },
      {
        startTime: 187320,
        endTime: 187320,
        data: "buông",
      },
      {
        startTime: 187320,
        endTime: 187710,
        data: "cánh",
      },
      {
        startTime: 187710,
        endTime: 188130,
        data: "tay",
      },
      {
        startTime: 188130,
        endTime: 188130,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 188130,
        endTime: 188530,
        data: "Khi",
      },
      {
        startTime: 188530,
        endTime: 188910,
        data: "trái",
      },
      {
        startTime: 188910,
        endTime: 188910,
        data: "tim",
      },
      {
        startTime: 188910,
        endTime: 189310,
        data: "anh",
      },
      {
        startTime: 189310,
        endTime: 189710,
        data: "chẳng",
      },
      {
        startTime: 189710,
        endTime: 189710,
        data: "có",
      },
      {
        startTime: 189710,
        endTime: 190500,
        data: "em",
      },
    ],
  },
  {
    words: [
      {
        startTime: 190500,
        endTime: 190900,
        data: "Biết",
      },
      {
        startTime: 190900,
        endTime: 191310,
        data: "đâu",
      },
      {
        startTime: 191310,
        endTime: 191710,
        data: "anh",
      },
      {
        startTime: 191710,
        endTime: 191710,
        data: "cũng",
      },
      {
        startTime: 191710,
        endTime: 192110,
        data: "chấp",
      },
      {
        startTime: 192110,
        endTime: 192510,
        data: "nhận",
      },
    ],
  },
  {
    words: [
      {
        startTime: 192510,
        endTime: 192510,
        data: "Không",
      },
      {
        startTime: 192510,
        endTime: 192900,
        data: "ân",
      },
      {
        startTime: 192900,
        endTime: 193300,
        data: "hận",
      },
      {
        startTime: 193300,
        endTime: 193700,
        data: "một",
      },
      {
        startTime: 193700,
        endTime: 193700,
        data: "lần",
      },
      {
        startTime: 193700,
        endTime: 194090,
        data: "khóc",
      },
      {
        startTime: 194090,
        endTime: 194490,
        data: "cho",
      },
      {
        startTime: 194490,
        endTime: 194900,
        data: "anh",
      },
    ],
  },
  {
    words: [
      {
        startTime: 194900,
        endTime: 195300,
        data: "Và",
      },
      {
        startTime: 195300,
        endTime: 195700,
        data: "quên",
      },
      {
        startTime: 195700,
        endTime: 195700,
        data: "đi",
      },
      {
        startTime: 195700,
        endTime: 196090,
        data: "tháng",
      },
      {
        startTime: 196090,
        endTime: 196490,
        data: "năm",
      },
    ],
  },
  {
    words: [
      {
        startTime: 196490,
        endTime: 196490,
        data: "Ta",
      },
      {
        startTime: 196490,
        endTime: 196880,
        data: "từng",
      },
      {
        startTime: 196880,
        endTime: 197280,
        data: "đậm",
      },
      {
        startTime: 197280,
        endTime: 198280,
        data: "sâu",
      },
    ],
  },
];

const line = lyricsData.map((lyric) =>
  lyric.words.reduce((acc, word) => {
    if (acc !== "") {
      acc += " " + word.data;
    } else {
      acc += word.data;
    }
    return acc;
  }, "")
);
const timeStart = lyricsData.map((lyric) => lyric.words[0].startTime);
const sentences = [];
for (let i = 0; i < line.length; i++) {
  sentences.push({
    time: timeStart[i],
    lineSong: line[i],
  });
}
//Hiển thị dòng
const audio = document.querySelector("audio");
const firstLine = document.querySelector(".first-line");
const lastLine = document.querySelector(".last-line");
let currentIndex = 0;
let disPlayWordIndex = 1;
let currentWordIndex = -1;

function displayWords() {
  let shadowLine = "";
  lyricsData[currentIndex + 1]?.words.forEach((word, index) => {
    index !== lyricsData[currentIndex + 1].words.length - 1
      ? (shadowLine += `
        <span class="span">${word.data}&nbsp; 
          <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}&nbsp;</span>
        </span>`)
      : (shadowLine += `
        <span class="span">${word.data} 
          <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}</span>
        </span>`);
  });
  const div = document.createElement("div");
  div.classList.add("line");
  if (
    currentIndex % 2 === 0 &&
    lastLine.querySelector("div")?.innerHTML !== shadowLine
  ) {
    div.innerHTML = shadowLine;
    lastLine.innerHTML = "";
    lastLine.append(div);
    disPlayWordIndex = currentIndex + 1;
    requestAnimationFrame(() => {
      div.classList.add("show");
    });
  } else if (
    currentIndex % 2 !== 0 &&
    firstLine.querySelector("div")?.innerHTML !== shadowLine
  ) {
    div.innerHTML = shadowLine;
    firstLine.innerHTML = "";
    firstLine.append(div);
    disPlayWordIndex = currentIndex + 1;
    requestAnimationFrame(() => {
      div.classList.add("show");
    });
  }
}
const wait = document.querySelector(".song-lyric .wait");

function updateLyrics() {
  const currentTime = audio.currentTime * 1000;

  //Hiện 2 dòng đầu
  const beforeStartSong =
    ((sentences[0].time - currentTime) / sentences[0].time) * 100;
    if (Math.floor(beforeStartSong) === 25 && !firstLine.innerHTML) {
      wait.classList.add("hidden");
    let shadowFirstLine = "";
    lyricsData[0].words.forEach((word, index) => {
      index !== lyricsData[0].words.length - 1
        ? (shadowFirstLine += `
          <span class="span">${word.data}&nbsp; 
            <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}&nbsp;</span>
          </span>`)
        : (shadowFirstLine += `<span class="span">${word.data} 
          <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}</span>
        </span>`);
    });

    let shadowSecondLine = "";
    lyricsData[1].words.forEach((word, index) => {
      index !== lyricsData[1].words.length - 1
        ? (shadowSecondLine += `
          <span class="span">${word.data}&nbsp; 
            <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}&nbsp;</span>
          </span>`)
        : (shadowSecondLine += `<span class="span">${word.data} 
          <span class="shadow" data-start="${word.startTime}" data-end="${word.endTime}">${word.data}</span>
        </span>`);
    });

    const divFirst = document.createElement("div");
    divFirst.className = "line show";
    divFirst.innerHTML = shadowFirstLine;

    const divSecond = document.createElement("div");
    divSecond.className = "line show";
    divSecond.innerHTML = shadowSecondLine;

    firstLine.append(divFirst);
    lastLine.append(divSecond);
  }

  for (let i = sentences.length - 1; i >= 0; i--) {
    if (currentTime >= sentences[i].time) {
      currentIndex = i;
      //Khi qua thời gian bắt đầu của dòng mới thì mới tính percent, nếu tính ở ngoài sẽ lấy currentIndex cũ, do vậy percent > 50
      let activeLine = currentIndex % 2 === 0 ? firstLine : lastLine;
      const shadowNodes = activeLine.querySelectorAll(".shadow");

      for (let i = 0; i < shadowNodes.length; i++) {
        const start = +shadowNodes[i].dataset.start;
        const end = +shadowNodes[i].dataset.end;

        if (currentTime >= start && currentTime <= end) {
          const percent = ((currentTime - start) / (end - start)) * 100;
          shadowNodes[i].style.width = `${percent}%`;
          currentWordIndex = i;
          // if(end === start) shadowNodes[i].style.width = "100%";
        } else if (currentTime > end) {
          shadowNodes[i].style.width = "100%";
        }
      }

      const start = sentences[currentIndex].time;
      const end =
        sentences[currentIndex + 1]?.time ??
        lyricsData[lyricsData.length - 1].words[
          lyricsData[lyricsData.length - 1].words.length - 1
        ].endTime;
      const percentCurrentLine = ((currentTime - start) / (end - start)) * 100;

      if (percentCurrentLine > 20 && disPlayWordIndex !== currentIndex + 1) {
        displayWords();
      }
      break; //đảm bảo trong 1 lần gọi hàm khi tìm được dòng đang phát thì sau khi thực hiện logic sẽ thoát hàm ngay
    }
  }

  requestAnimationFrame(updateLyrics);
}

audio.addEventListener("play", () => {
  requestAnimationFrame(updateLyrics);
});

const toggleLyricBtn = $(".toggle-lyric-btn");
const songLyric = $(".song-lyric");
const songInforEl = $("#song-infor");
toggleLyricBtn.onclick = e => {
  if(songLyric.classList.contains("hidden")) {
    songLyric.classList.replace('hidden', "flex");
    songInforEl.classList.add("hidden");
  } else {
    songLyric.classList.replace("flex", 'hidden');
    songInforEl.classList.remove("hidden");
  }
}
}

export const afterRenderSongDetail = async (slug) => {
  try {
    handleBeforeRender();
    await render(slug);
    handleLyric();
  } catch (error) {
    if (error.message === "Network Error") {
      showToast(false, "Mạng không ổn định. Hãy kiểm tra lại kết nối mạng!");
    }
  } finally {
    toggleLoading(false);
  }
};
