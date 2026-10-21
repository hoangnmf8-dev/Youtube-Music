export default function handleShowPassword(prefix) {
  const iconShow = document.querySelector(`${prefix} .show-password`);
  const iconHide = document.querySelector(`${prefix} .hide-password`);

  iconShow.onclick = e => {
    iconShow.closest(`${prefix}`).querySelector("input").type = "text";
    iconShow.classList.add("hidden");
    iconHide.classList.remove("hidden");
  }

  iconHide.onclick = e => {
    iconHide.closest(`${prefix}`).querySelector("input").type = "password";
    iconHide.classList.add("hidden");
    iconShow.classList.remove("hidden");
  }
}