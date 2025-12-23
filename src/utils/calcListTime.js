export default function calcListTime(time) {
  let hour, minute, result;
  hour = Math.floor(time / 3600);
  if(time > 3600 && time % 3600 !== 0) {
    minute = Math.floor((time - hour * 3600) / 60);
  } else if(time % 3600 === 0 && time !== 0) {
    minute = 0;
  } else {
    minute = Math.floor(time / 60);
  }
  
  if(minute === 0) {
    result = `${hour} giờ`;
  } else {
    result = `${hour} giờ ${minute} phút`;
  }
  return result;
}

export const calcSongTime = (time) => {
  let minute, second, result;
  minute = Math.floor(time / 60);
  if(time > 60 && time % 60 !== 0) {
    second = Math.floor((time - minute * 60));
  } else if(time % 60 === 0 && time !== 0) {
    second = 0;
  } else {
    second = Math.floor(time);
  }
  
  if(minute === 0) {
    minute = "00";
  }
  if(second === 0) {
    second = "00";
  } else if(second < 10) {
    second = `0${Math.floor(second)}`
  }
  result = `${minute}:${second}`;
  return result;
}

export const formatDateDDMMYYYY = (isoString) => {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const vn = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const dd = String(vn.getDate()).padStart(2, "0");
  const mm = String(vn.getMonth() + 1).padStart(2, "0");
  const yyyy = vn.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}