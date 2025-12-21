export default function calcViews(value) {
  if(value < 1000) {
    return value;
  }
  if(value >= 1000 && value < 1000000) {
    return `${Math.floor(value / 1000)} N`;
  }
  if(value >= 1000000 && value < 1000000000) {
    return `${Math.floor(value / 1000000)} Tr`
  }
}