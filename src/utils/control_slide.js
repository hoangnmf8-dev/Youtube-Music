function controlSlide(slide, btn, stepScroll) {
  btn.addEventListener("click", e => {
    slide.scrollBy({
      left: stepScroll,
      behavior: "smooth"
    })
  })
}

export default controlSlide;